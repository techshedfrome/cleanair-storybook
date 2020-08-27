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

export const DefaultFakeData = init();
DefaultFakeData.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24
};

export const DefaultFakeDataWeek = init();
DefaultFakeDataWeek.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24 * 7
};
export const DefaultFakeDataMonth = init();
DefaultFakeDataMonth.args = {
    useHourlyMean: false,
    device_id: 'FAKE',
    periodInHours: 24 * 30
};

export const SlowFakeData = init();
SlowFakeData.args = {
    useHourlyMean: false,
    device_id: 'SLOWFAKE',
    periodInHours: 24
};

export const Loading = init();
Loading.args = {
    useHourlyMean: false,
    device_id: 'none',
    periodInHours: 24
};

export const LiveData = init();
LiveData.args = {
    useHourlyMean: false,
    device_id: '5ee60cf3dc1438001b1036ea',
    periodInHours: 24
};