import SensorHistory from '../src/components/SensorHistory';
export default { title: 'SensorHistory' };

const historyTemplate = `<sensorHistory 
                            />`;
var init = () => {
    var def = (args) => ({
        components: { SensorHistory },
        template: historyTemplate,
        props: { useHourlyMean : null},
    });
    def.argTypes = {
        useHourlyMean: { control: 'boolean' },
    };
    return def;
};

export const DefaultSensorHistory = init();
DefaultSensorHistory.args = {
    useHourlyMean:false,
};