import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import SensorViewSelector from '../src/components/SensorViewSelector';
export default {
    title: 'SensorViewSelector',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const viewSelectorTemplate = `<sensorViewSelector 
                                :pm2_5_value=pm2_5_value
                                :pm10_value=pm10_value
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { SensorViewSelector },
    template: viewSelectorTemplate,
    props: {
        pm2_5_value: {
            type: Number,
            required: false,
            default: () => number('PM2.5 value', 60.23)
        },
        pm10_value: {
            type: Number,
            required: false,
            default: () => number('PM10 value', 45.97)
        },
    },
});

toStorybook.story = {
    name: 'Default sensor view selector',
}