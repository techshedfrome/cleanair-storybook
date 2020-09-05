import SensorCardList from '../src/components/SensorCardList';
export default { title: 'SensorCardList' };
const template = `<SensorCardList 
                       :getSensors="getSensors" 
                  />`;

var init = () => {
    var def = (args) => ({
        components: { SensorCardList },
        template: template,
        props: {
            getSensors: null,
        },
    });
    def.argTypes = {
    };
    return def;
};

export const ExampleSensorList = init();
ExampleSensorList.args = {
    // getSensors: fakeData,
    getSensors: fakeData(),
    // getSensors: ()=> [1,2,3,4] ,
};

function fakeData() {
    return ()=>
        [
            {
                key: "1",
                device_id: "item.device_id",
                last_seen: "item.last_seen",
                readingdate: "item.readingdate",
                pm2_5_value: "item.pm2_5_value",
                pm10_value: "item.pm10_value",
                daqi_value: "1",
                daqi_band: "Low",
                show: "item.show",
                isDev: "item.isDev",
            },
            {
                key: "2",
                device_id: "item.device_id",
                last_seen: "item.last_seen",
                readingdate: "item.readingdate",
                pm2_5_value: "item.pm2_5_value",
                pm10_value: "item.pm10_value",
                daqi_value: "2",
                daqi_band: "Low",
                show: "item.show",
                isDev: "item.isDev",
            },
            {
                key: "3",
                device_id: "item.device_id",
                last_seen: "item.last_seen",
                readingdate: "item.readingdate",
                pm2_5_value: "item.pm2_5_value",
                pm10_value: "item.pm10_value",
                daqi_value: "3",
                daqi_band: "Moderate",
                show: "item.show",
                isDev: "item.isDev",
            }
     ]
}