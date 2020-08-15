import { action } from '@storybook/addon-actions';
import { text, number, boolean } from '@storybook/addon-knobs';
import Instrumentation from '../src/components/Instrumentation';
export default {
    title: 'Instrumentation',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};
export const actionsData = {
    onPopulate: action('instrumentation'),
    onArchiveTask: action('onArchiveTask'),
};

export const instrumentationData = {
};

const instrumentationTemplate = `<instrumentation 
                            :device_id="device_id" 
                            :last_seen="last_seen" 
                            :measure="measure" 
                            :value="value" 
                            :show="show" 
                            :isDev="isDev" 
                            />`;

// default state
export const Default = () => ({
    components: { Instrumentation },
    template: instrumentationTemplate,
    props: {
        device_id: {
            default: () => '1'
        },
        last_seen: {
            default: () => boolean('old data', false) ? new Date('2020-01-01') : new Date()
        },
        measure: {
            default: () => text('PM Type', "PM2.5")
        },
        value: {
            default: () => number('main value', 60.32)
        },
        show: {
            default: () => boolean('show', true)
        },
        isDev: {
            default: () => true
        }
    },
    methods: actionsData,
});