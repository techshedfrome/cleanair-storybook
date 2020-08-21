import SensorViewSelector from '../src/components/SensorViewSelector';
export default { title: 'SensorViewSelector' };

const viewSelectorTemplate = `<sensor-view-selector  
                                :device_id=device_id
                                :pm2_5_value=pm2_5_value
                                :pm10_value=pm10_value
                                :name=name
                            />`;
const defaultName = 'Sensor Name 1';
const defaultDeviceId = '5ee60cf3dc1438001b1036ea';
var init = () => {
    var def = (args) => ({
        components: { SensorViewSelector },
        template: viewSelectorTemplate,
        props: { pm2_5_value: '', pm10_value: '', name: '', device_id: '' },
    });
    def.argTypes = {
        pm2_5_value: { control: 'number' },
        pm10_value: { control: 'number' },
        name: { control: 'text' },
        device_id: { control: 'text' },
    };
    return def;
};

export const ValidData = init();
ValidData.args = {
    pm2_5_value: 60.23,
    pm10_value: 45.97,
    name: defaultName,
    device_id: defaultDeviceId,
};
export const MissingPm10Data = init();
MissingPm10Data.args = {
    pm2_5_value: 13,
    pm10_value: -Infinity,
    name: defaultName,
    device_id: defaultDeviceId,
};
export const MissingPm25Data = init();
MissingPm25Data.args = {
    pm2_5_value: -Infinity,
    pm10_value: 13,
    name: defaultName,
    device_id: defaultDeviceId,
};
export const MissingData = init();
MissingData.args = {
    pm2_5_value: -Infinity,
    pm10_value: -Infinity,
    name: defaultName,
    device_id: defaultDeviceId,
};
