// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
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

// default state
export const Default = () => ({
    components: { Dial },
    template: dialTemplate,
    props: {
        values: {
            default: () => ({
                show: true
            })
        },
        device_id: {
            default: () => '1'
        },
        last_seen: {
            default: () => new Date()
        },
        main_value: {
            default: () => 3
        },
        sub_value: {
            default: () => 14.32
        },
        is_large: {
            default: () => true
        },
        show: {
            default: () => true
        },
    },
    methods: actionsData,
});