// src/components/Task.stories.js
import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import StandardFooter from '../src/components/StandardFooter';
export default {
    title: 'StandardFooter',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const footerTemplate = `<standardFooter 
                                :council_email=council_email
                                :clean_air_email=clean_air_email
                                :techshed_email=techshed_email
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { StandardFooter },
    template: footerTemplate,
    props: {
        council_email: {
            type: String,
            required: false,
            default: () => text('council_email', 'council@example.com')
        },
        clean_air_email: {
            type: String,
            required: false,
            default: () => text('clean_air_email', 'cleanair@example.com')
        },
        techshed_email: {
            type: String,
            required: false,
            default: () => text('techshed_email', 'techshed@example.com')
        },
    },
});

toStorybook.storyName = 'Default Measurement Selector State';