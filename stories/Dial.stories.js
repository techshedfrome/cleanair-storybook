// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Dial from '../src/components/Dial';
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
                            :device_id="device_id" 
                            :last_seen="last_seen" 
                            :main_value="main_value" 
                            :sub_value="sub_value" 
                            :show="show" 
                            :isDev="isDev" 
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
            default: () => boolean('old data', false) ? new Date('2020-01-01') : new Date()
        },
        main_value: {
            default: () => text('main value', '3')
        },
        sub_value: {
            default: () => text('sub value', 14.32)
        },
        show: {
            default: () => boolean('show', true)
        },
        isDev: {
            default: () => true
        },
    },
    methods: actionsData,
});

toStorybook.storyName = 'Default Dial State';