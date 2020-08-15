import SensorLiveView from '../src/components/SensorLiveView';
export default {    title: 'SensorLiveView',};

const selectorTemplate = `<sensorLiveView 
                                :pm2_5_value=pm2_5_value
                                :pm10_value=pm10_value
                            />`;
var init = () => {
    var def = (args) => ({
        components: { SensorLiveView },
        template: selectorTemplate,
        props: { pm2_5_value: '', pm10_value: '' },
    });
    def.argTypes = {
        pm2_5_value: { control: 'number' },
        pm10_value: { control: 'number' },
    };
    return def;
};

export const DefaultLiveView = init();
DefaultLiveView.args = {
    pm2_5_value: 60.23,
    pm10_value: 45.97,
};