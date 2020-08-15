import Instrumentation from '../src/components/Instrumentation';
export default { title: 'Instrumentation' };
const instrumentationTemplate = `<instrumentation 
                                :device_id="device_id" 
                                :last_seen="last_seen" 
                                :measure="measure" 
                                :value="value" 
                                :show="show" 
                                :isDev="isDev" 
                                />`;

var init = () => {
    var def = (args) => ({
        components: { Instrumentation },
        template: instrumentationTemplate,
        props: {
            device_id: null, last_seen: null, measure: null,
            value: null, show: null, isDev: null
        },
    });
    def.argTypes = {
        device_id: { control: 'text' },
        last_seen: { control: 'date' },
        measure: { control: 'text' },
        value: { control: 'number' },
        show: { control: 'boolean' },
        isDev: { control: 'boolean' }
    };
    return def;
};

export const DefaultInstrumentation = init();
DefaultInstrumentation.args = {
    device_id: '1',
    last_seen: new Date(),
    measure: 'PM2.5',
    value: 60.32,
    show: true,
    isDev: true
};
