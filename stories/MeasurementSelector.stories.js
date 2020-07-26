// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import MeasurementSelector from '../src/components/MeasurementSelector';
export default {
    title: 'MeasurementSelector',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const selectorTemplate = `<measurementSelector 
                                :pm2_5_value=pm2_5_value
                                :pm10_value=pm10_value
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { MeasurementSelector },
    template: selectorTemplate,
    props: {
        pm2_5_value: {
            type: Number,
            required: false,
            default: () => 60.23
        },
        pm10_value: {
            type: Number,
            required: false,
            default: () => 45.97
        },
    },
});

toStorybook.story = {
    name: 'Default Measurement Selector State',
}