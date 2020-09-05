import SensorCard from '../src/components/SensorCard';
export default { title: 'SensorCard' };
const cardTemplate = `<SensorCard 
                                :device_id="device_id" 
                                :last_seen="last_seen" 
                                :readingdate="readingdate" 
                                :pm2_5_value="pm2_5_value" 
                                :pm10_value="pm10_value" 
                                :daqi_value="daqi_value" 
                                :daqi_band="daqi_band" 
                                :show="show" 
                                :isDev="isDev" 
                                />`;

var init = () => {
    var def = (args) => ({
        components: { SensorCard },
        template: cardTemplate,
        props: {
            device_id: null,
            last_seen: null,
            readingdate: null,
            pm2_5_value: null,
            pm10_value: null,
            daqi_value: null,
            daqi_band: null,
            show: null,
            isDev: null,
        },
    });
    def.argTypes = {
        device_id: { control: 'text' },
        last_seen: { control: 'date' },
        readingdate: { control: 'date' },
        pm2_5_value: { control: 'text' },
        pm10_value: { control: 'text' },
        daqi_value: { control: 'text' },
        daqi_band: { control: 'daqi_band' },
        show: { control: 'boolean' },
        isDev: { control: 'boolean' }
    };
    return def;
};

export const ExampleCard = init();
ExampleCard.args = {
    device_id: '1',
    last_seen: new Date(),
    readingdate: new Date(),
    pm2_5_value: '23.06',
    pm10_value: '60.32',
    daqi_value: '5',
    daqi_band: "moderate",
    show: true,
    isDev: true
};
