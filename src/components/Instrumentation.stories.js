// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
import Instrumentation from './Instrumentation';
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
    id: '1',
    title: 'Test instrumentation',
    state: 'instrumentation_CONTAINER',
    updated_at: new Date(2019, 0, 1, 9, 0),
};

const instrumentationTemplate = `<instrumentation :instrumentation="{}" />`;

// default state
export const Default = () => ({
    components: { Instrumentation },
    template: instrumentationTemplate,
    props: {
        instrumentation: {
            default: () => instrumentationData,
        },
    },
    methods: actionsData,
});