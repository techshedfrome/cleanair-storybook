import SensorHistory from '../src/components/SensorHistory';
export default { title: 'SensorHistory' };

import { fetchBoxData } from "../src/components/sensor-data.js";
import seedrandom from 'seedrandom';

const historyTemplate = `<sensorHistory 
                                :useHourlyMean=useHourlyMean
                                :device_id=device_id
                                :periodInHours=periodInHours
                                :fetchBoxData=fetchBoxData
                            />`;
var init = () => {
    var def = (args) => ({
        components: { SensorHistory },
        template: historyTemplate,
        props: { 
            useHourlyMean: null, 
            device_id: null,
            periodInHours: null,
            fetchBoxData: null
        },
    });
    def.argTypes = {
        useHourlyMean: { control: 'boolean' },
        device_id: { control: 'text'  },
        periodInHours: { control: 'number'},
    };
    return def;
};

export const DefaultFakeData = init();
DefaultFakeData.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24,
    fetchBoxData: fakeData,
};
export const DefaultFakeDataWeek = init();
DefaultFakeDataWeek.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24 * 7,
    fetchBoxData: fakeData,
};
export const DefaultFakeDataMonth = init();
DefaultFakeDataMonth.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24 * 30,
    fetchBoxData: fakeData,
};

export const ShortFakeData = init();
ShortFakeData.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24,
    fetchBoxData: shortFakeData(),
};

export const TallFakeData = init();
TallFakeData.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24,
    fetchBoxData: tallFakeData(),
};

export const SlowFakeData = init();
SlowFakeData.args = {
    useHourlyMean: false,
    device_id: 'SLOWFAKE',
    periodInHours: 24,
    fetchBoxData: slowFakeData(),
};

export const Loading = init();
Loading.args = {
    useHourlyMean: false,
    device_id: 'none',
    periodInHours: 24,
    fetchBoxData: fetchBoxData,
};

export const LiveData = init();
LiveData.args = {
    useHourlyMean: false,
    device_id: '5ee60cf3dc1438001b1036ea',
    periodInHours: 24,
    fetchBoxData: fetchBoxData,
};

function slowFakeData() {
    return (boxid, phenomenon, sampleHours, useHourlyMean, dataCallback) =>
        fakeData(boxid, phenomenon, sampleHours, useHourlyMean, 
                 data => setTimeout(()=> dataCallback(data), 2000) )
}
function tallFakeData() {
    return (boxid, phenomenon, sampleHours, useHourlyMean, dataCallback) =>
        fakeData(boxid,
            phenomenon,
            sampleHours,
            useHourlyMean,
            data => {
                console.log(data[0].y);
                data = data.map(d => ({ x: d.x, y: d.y / 2.5 + 90 }));
                dataCallback(data);
            }
        )
}
function shortFakeData() {
    return (boxid, phenomenon, sampleHours, useHourlyMean, dataCallback) =>
        fakeData(boxid,
            phenomenon,
            sampleHours,
            useHourlyMean,
            data => {
                console.log(data[0].y);
                data = data.map(d => ({ x: d.x, y: d.y / 12.5 }));
                dataCallback(data);
            }
        )
}

function generateDataPoints(randomSeed, count, max, fromDate, toDate){
    var totalMilliSeconds = Math.abs(toDate - fromDate);
    var timeStep = totalMilliSeconds / count;

    var rand = seedrandom(randomSeed);
    var data = [];
    for(var i = 0; i<count; i++) 
        data.push({ x: fromDate + i * timeStep, y: rand() * max });

    return data;
}

function fakeData(boxid, phenomenon, sampleHours, useHourlyMean, dataCallback) {
    var pm2_5 = generateDataPoints(1, sampleHours, 25, Date.now() - 1000 * 60 * 60 * 24, Date.now());
    var pm10 = generateDataPoints(2, sampleHours, 25, Date.now() - 1000 * 60 * 60 * 24, Date.now());
    
    if (phenomenon == 'PM2.5') dataCallback(pm2_5);
    if (phenomenon == 'PM10') dataCallback(pm10);
}