import { action } from '@storybook/addon-actions';
import { number, boolean } from '@storybook/addon-knobs';
import DidYouKnow from '../src/components/DidYouKnow';
export default {
    title: 'DidYouKnow',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const didYouKnowTemplate = `<didYouKnow 
                            />`;

export const toStorybook = () => ({
    components: { DidYouKnow },
    template: didYouKnowTemplate,
    props: {
    },
});

toStorybook.storyName = 'Default "DidYouKnow"';