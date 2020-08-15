import Dial from '../src/components/Dial';
export default { title: 'Dial' };
const dialTemplate = `<dial 
                            :device_id="device_id" 
                            :last_seen="last_seen" 
                            :main_value="main_value" 
                            :sub_value="sub_value" 
                            :show="show" 
                            :isDev="isDev" 
                            />`;

var init = () => {
    var def = (args) => ({
        components: { Dial },
        template: dialTemplate,
        props: {
            device_id: null, last_seen: null, 
            main_value: null, sub_value: null, 
            show: null, isDev: null
        },
    });
    def.argTypes = {
        device_id: { control: 'text' },
        last_seen: { control: 'date' },
        main_value: { control: 'text' },
        sub_value: { control: 'number' },
        show: { control: 'boolean' },
        isDev: { control: 'boolean' }
    };
    return def;
};

export const ExampleDialState = init();
ExampleDialState.args = {
    device_id: '1',
    last_seen: new Date(),
    main_value: '3',
    sub_value: 14.32,
    show: true,
    isDev: true
};