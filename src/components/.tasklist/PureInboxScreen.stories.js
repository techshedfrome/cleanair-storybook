//src/components/PureInboxScreen.stories.js
import Vue from 'vue';
import Vuex from 'vuex';
import PureInboxScreen from './PureInboxScreen.vue';
import { action } from '@storybook/addon-actions';
import { defaultTasksData } from './PureTaskList.stories';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        tasks: defaultTasksData,
    },
    actions: {
        pinTask(context, id) {
            action('pinTask')(id);
        },
        archiveTask(context, id) {
            action('archiveTask')(id);
        },
    },
});
/*
haven't been able to check out mocking for passing data down the hierarchy (github down)
See:
    https://www.learnstorybook.com/intro-to-storybook/vue/en/screen/
    "Similar approaches exist to provide mocked context for other data libraries, such as Apollo, Relay and others."
*/


export default {
    title: 'PureInboxScreen',
    excludeStories: /.*store$/,
};
export const Default = () => ({
    components: { PureInboxScreen },
    template: `<pure-inbox-screen/>`,
    store,
});
// tasklist with pinned tasks
export const error = () => ({
    components: { PureInboxScreen },
    template: `<pure-inbox-screen :error="true"/>`,
});