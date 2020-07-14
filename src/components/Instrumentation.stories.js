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

export const taskData = {
    id: '1',
    title: 'Test Task',
    state: 'Task_INBOX',
    updated_at: new Date(2019, 0, 1, 9, 0),
};

const instrumentationTemplate = `<instrumentation :instrumentation="instrumentation" @archiveTask="onArchiveTask" @pinTask="instrumentation"/>`;

// default task state
export const Default = () => ({
    components: { Instrumentation },
    template: instrumentationTemplate,
    props: {
        task: {
            default: () => taskData,
        },
    },
    methods: actionsData,
});