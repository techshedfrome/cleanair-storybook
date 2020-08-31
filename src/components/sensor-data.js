

/*
NOTE: still using D3 for csv fetch and rolling up data by hour
  TODO: implement caching to reduce API hits & improve UX

  https://docs.opensensemap.org/#api-Measurements
*/
import { csv } from "d3-fetch";
import * as d3 from "d3";
import moment from "moment";

export function fetchBoxData(boxid, phenomenon, sampleHours, useHourlyMean, dataCallback) {
    var toDate = moment();
    var fromDate = moment().subtract(sampleHours, "hours");
    var url = `https://api.opensensemap.org/boxes/data?boxId=${boxid}&from-date=${fromDate.toISOString()}&to-date=${toDate.toISOString()}&phenomenon=${phenomenon}&columns=createdAt,value,phenomenon`;

    console.log("fetching csv");
    console.log(url);
    csv(url)
        .then(data => {
            data = (useHourlyMean ? formatDateByHourInData(data) : data)
            data = data.reverse()
                       .map(x => ({ x: x.createdAt, y: parseFloat(x.value).toFixed(2) }));

            dataCallback(data);
        })
        .catch(request => {
            if (!request.ok) {
                console.error(request.Error);
                throw Error(request.status);
            }
            return request;
        });
}


function formatDateByHourInData(data) {
    return d3
        .nest()
        .key(d =>
            moment(d.createdAt)
                .minute(0)
                .second(0)
                .millisecond(0)
                .toISOString()
        )
        .rollup(
            d => d3.mean(d, g => g.value),
            d => d.date
        )
        .entries(data)
        .sort((a, b) => b.key - a.key)
        .reverse()
        .map(x => ({ createdAt: x.key, value: x.value }));
}