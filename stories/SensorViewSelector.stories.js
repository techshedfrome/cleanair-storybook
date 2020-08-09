import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, number, text } from '@storybook/addon-knobs';
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

// addDecorator(withKnobs)

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
Default.story = {
    name: 'valid data'
}


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
Missingpm10.story = {
    name: 'Missing PM10 data'
}

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
Missingpm25.story = {
    name: 'Missing PM 2.5 data'
}

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
Missingdata.story = {
    name: 'Missing all data'
}

// export const WithMissingData = () => ({
//     components: { SensorViewSelector },
//     template: viewSelectorTemplate,
//     props: {
//         pm2_5_value: {
//             type: Number,
//             required: false,
//             default: () => number('PM2.5 value', 60.23)
//         },
//         pm10_value: {
//             type: Number,
//             required: false,
//             default: () => number('PM10 value', 45.97)
//         },
//         name: {
//             type: String,
//             required: false,
//             default: () => text('Name', 'Sensor Name 1')
//         },
//     },
// })
// WithMissingData.story = {
//     name: 'missing data sensor view selector'
// }
// Default.story = {
//     name: 'Example data'
// }


// DefaultData.story = {
//     parameters: {
//         props: {
//             pm2_5_value: {
//                 type: Number,
//                 required: false,
//                 default: () => number('PM2.5 value', 60.23)
//             },
//             pm10_value: {
//                 type: Number,
//                 required: false,
//                 default: () => number('PM10 value', 45.97)
//             },
//             name: {
//                 type: String,
//                 required: false,
//                 default: () => text('Name', 'Sensor Name 1')
//             },
//         },
//     },
// };


// toStorybook.story = {
//     name: 'Default sensor view selector',
// }