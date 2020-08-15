import { action } from '@storybook/addon-actions';
import { number, text } from '@storybook/addon-knobs';
import SensorViewSelector from '../src/components/SensorViewSelector';
export default {
    title: 'SensorViewSelector',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const viewSelectorTemplate = `<sensor-view-selector  
                                :pm2_5_value=pm2_5_value
                                :pm10_value=pm10_value
                                :name=name
                            />`;

export const Default = () => ({
    components: { SensorViewSelector },
    template: viewSelectorTemplate,
    props: {
        pm2_5_value: {
            type: Number,
            required: false,
            default: () => number('PM2.5 value', 60.23)
        },
        pm10_value: {
            type: Number,
            required: false,
            default: () => number('PM10 value', 45.97)
        },
        name: {
            type: String,
            required: false,
            default: () => text('Name', 'Sensor Name 1')
        },
    },
})
Default.storyName = 'valid data';

export const Missingpm10 = () => ({
    components: { SensorViewSelector },
    template: viewSelectorTemplate,
    props: {
        pm2_5_value: {
            type: Number,
            required: false,
            default: () => 13
        },
        pm10_value: {
            type: Number,
            required: false,
            default: () => -Infinity
        },
        name: {
            type: String,
            required: false,
            default: () => text('Name', 'Sensor Name 1')
        },
    },
})
Missingpm10.storyName = 'Missing PM10 data';

export const Missingpm25 = () => ({
    components: { SensorViewSelector },
    template: viewSelectorTemplate,
    props: {
        pm2_5_value: {
            type: Number,
            required: false,
            default: () => -Infinity
        },
        pm10_value: {
            type: Number,
            required: false,
            default: () => 6
        },
        name: {
            type: String,
            required: false,
            default: () => text('Name', 'Sensor Name 1')
        },
    },
})
Missingpm25.storyName = 'Missing PM 2.5 data';

export const Missingdata = () => ({
    components: { SensorViewSelector },
    template: viewSelectorTemplate,
    props: {
        pm2_5_value: {
            type: Number,
            required: false,
            default: () => -Infinity
        },
        pm10_value: {
            type: Number,
            required: false,
            default: () => -Infinity
        },
        name: {
            type: String,
            required: false,
            default: () => text('Name', 'Sensor Name 1')
        },
    },
})
Missingdata.storyName = 'Missing all data';
