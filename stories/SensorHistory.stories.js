import SensorHistory from '../src/components/SensorHistory';
export default { title: 'SensorHistory' };

const historyTemplate = `<sensorHistory 
                                :useHourlyMean=useHourlyMean
                                :device_id=device_id
                                :periodInHours=periodInHours
                            />`;
var init = () => {
    var def = (args) => ({
        components: { SensorHistory },
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