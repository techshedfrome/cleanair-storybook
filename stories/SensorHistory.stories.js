import SensorHistory from '../src/components/SensorHistory';
export default { title: 'SensorHistory' };

const historyTemplate = `<sensorHistory 
                            />`;
var init = () => {
    var def = (args) => ({
        components: { SensorHistory },
        template: historyTemplate,
        props: { },
    });
    def.argTypes = {
    };
    return def;
};

export const DefaultSensorHistory = init();
DefaultSensorHistory.args = {
};