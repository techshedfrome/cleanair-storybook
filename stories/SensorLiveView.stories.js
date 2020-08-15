// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import SensorLiveView from '../src/components/SensorLiveView';
export default {
    title: 'SensorLiveView',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const selectorTemplate = `<sensorLiveView 
                                :pm2_5_value=pm2_5_value
                                :pm10_value=pm10_value
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { SensorLiveView },
    template: selectorTemplate,
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

toStorybook.storyName = 'Default Live View State';