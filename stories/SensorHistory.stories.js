import { action } from '@storybook/addon-actions';
import {  number, boolean } from '@storybook/addon-knobs';
import SensorHistory from '../src/components/SensorHistory';
export default {
    title: 'SensorHistory',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const historyTemplate = `<sensorHistory 
                            />`;

export const toStorybook = () => ({
    components: { SensorHistory },
    template: historyTemplate,
    props: {
    },
});

toStorybook.storyName = 'Default sensor history';