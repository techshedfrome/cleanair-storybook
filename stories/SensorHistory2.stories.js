/*
https://codesandbox.io/s/vue-chartjs-demo-forked-93web?file=/src/components/LineChart.vue:0-2411
*/

import SensorHistory2 from '../src/components/SensorHistory2';
export default { title: 'SensorHistory2' };

const historyTemplate = `<sensorHistory2 
                                :useHourlyMean=useHourlyMean
                                :device_id=device_id
                                :periodInHours=periodInHours
                            />`;
var init = () => {
    var def = (args) => ({
        components: { SensorHistory2 },
        template: historyTemplate,
        props: { 
            useHourlyMean: null, 
            device_id: null,
            periodInHours: null
        },
    });
    def.argTypes = {
        useHourlyMean: { control: 'boolean' },
        device_id: { control: 'text'  },
        periodInHours: { control: 'number'}
    };
    return def;
};

export const DefaultSensorHistory = init();
DefaultSensorHistory.args = {
    useHourlyMean: false,
    device_id: '5ee60cf3dc1438001b1036ea',
    periodInHours: 24
};