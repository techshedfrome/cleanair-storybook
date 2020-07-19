// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import Dial from './Dial';
export default {
    title: 'Dial',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};
export const actionsData = {
    onPopulate: action('instrumentation'),
    onArchiveTask: action('onArchiveTask'),
};

const dialTemplate = `<dial 
                            :values="values" 
                            :device_id="device_id" 
                            :last_seen="last_seen" 
                            :main_value="main_value" 
                            :sub_value="sub_value" 
                            :is_large="is_large" 
                            :show="show" 
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { Dial },
    template: dialTemplate,
    props: {
        device_id: {
            default: () => '1'
        },
        last_seen: {
            default: () => new Date()
        },
        main_value: {
            default: () => number('main_value', 3)
        },
        sub_value: {
            default: () => number('sub_value', 14.32)
        },
        is_large: {
            default: () => true
        },
        show: {
            default: () => boolean('show', true)
        },
    },
    methods: actionsData,
});

toStorybook.story = {
    name: 'Default Dial State',
}