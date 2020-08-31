import SensorHistory from '../src/components/SensorHistory';
export default { title: 'SensorHistory' };

import { fetchBoxData } from "../src/components/sensor-data.js";

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

function fakeData(boxid, phenomenon, sampleHours, useHourlyMean, dataCallback) {
    if (phenomenon == 'PM2.5')
        dataCallback([
            { x: '2020-01-01 00:00Z', y:  6.5 },
            { x: '2020-01-01 01:00Z', y:  4.5 },
            { x: '2020-01-01 02:00Z', y: 19.5 },
            { x: '2020-01-01 03:00Z', y: 15.5 },
            { x: '2020-01-01 04:00Z', y:  9.5 },
            { x: '2020-01-01 05:00Z', y: 17.5 },
            { x: '2020-01-01 06:00Z', y: 10.5 },
            { x: '2020-01-01 07:00Z', y: 18.5 },
            { x: '2020-01-01 08:00Z', y:  8.5 },
            { x: '2020-01-01 09:00Z', y:  5.5 },
            { x: '2020-01-01 10:00Z', y: 14.5 },
            { x: '2020-01-01 11:00Z', y: 16.5 },
            { x: '2020-01-01 12:00Z', y: 20.5 },
            { x: '2020-01-01 13:00Z', y:  3.5 },
            { x: '2020-01-01 14:00Z', y:  1.5 },
            { x: '2020-01-01 15:00Z', y:  7.5 },
            { x: '2020-01-01 16:00Z', y:  2.5 },
            { x: '2020-01-01 17:00Z', y: 12.5 },
            { x: '2020-01-01 18:00Z', y: 11.5 },
            { x: '2020-01-01 19:00Z', y: 13.5 },
            { x: '2020-01-01 20:00Z', y:  7.5 },
            { x: '2020-01-01 21:00Z', y:  2.5 },
            { x: '2020-01-01 22:00Z', y: 12.5 },
            { x: '2020-01-01 23:00Z', y:  9.5 },
        ]);

    if (phenomenon == 'PM10')
        dataCallback([
            { x: '2020-01-01 00:00Z', y: 10.5 },
            { x: '2020-01-01 01:00Z', y: 17.5 },
            { x: '2020-01-01 02:00Z', y:  1.5 },
            { x: '2020-01-01 03:00Z', y: 18.5 },
            { x: '2020-01-01 04:00Z', y: 14.5 },
            { x: '2020-01-01 05:00Z', y:  7.5 },
            { x: '2020-01-01 06:00Z', y: 14.5 },
            { x: '2020-01-01 07:00Z', y: 21.5 },
            { x: '2020-01-01 08:00Z', y: 13.5 },
            { x: '2020-01-01 09:00Z', y:  8.5 },
            { x: '2020-01-01 10:00Z', y: 20.5 },
            { x: '2020-01-01 11:00Z', y: 16.5 },
            { x: '2020-01-01 12:00Z', y: 15.5 },
            { x: '2020-01-01 13:00Z', y: 19.5 },
            { x: '2020-01-01 14:00Z', y: 22.5 },
            { x: '2020-01-01 15:00Z', y: 23.5 },
            { x: '2020-01-01 16:00Z', y:  5.5 },
            { x: '2020-01-01 17:00Z', y: 19.5 },
            { x: '2020-01-01 18:00Z', y: 16.5 },
            { x: '2020-01-01 19:00Z', y:  2.5 },
            { x: '2020-01-01 20:00Z', y: 16.5 },
            { x: '2020-01-01 21:00Z', y:  4.5 },
            { x: '2020-01-01 22:00Z', y: 12.5 },
            { x: '2020-01-01 23:00Z', y: 15.5 },
        ]);
}