import { action } from '@storybook/addon-actions';
import { addDecorator } from '@storybook/vue'
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import DidYouKnow from '../src/components/DidYouKnow';
export default {
    title: 'DidYouKnow',
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

const didYouKnowTemplate = `<didYouKnow 
                            />`;

addDecorator(withKnobs)

export const toStorybook = () => ({
    components: { DidYouKnow },
    template: didYouKnowTemplate,
    props: {
    },
});

toStorybook.story = {
    name: 'Default "DidYouKnow"',
}