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
export const actionsData = {
    onPopulate: action('instrumentation'),
    onArchiveTask: action('onArchiveTask'),
};

const selectorTemplate = `<measurementSelector 
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { MeasurementSelector },
    template: selectorTemplate,
    props: {
    },
    methods: actionsData,
});

toStorybook.story = {
    name: 'Default Measurement Selector State',
}