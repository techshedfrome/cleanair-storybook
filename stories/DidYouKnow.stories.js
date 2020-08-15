import DidYouKnow from '../src/components/DidYouKnow';
export default { title: 'DidYouKnow' };

const didYouKnowTemplate = `<didYouKnow 
                            />`;

var init = () => {
    var def = (args) => ({
        components: { DidYouKnow },
        template: didYouKnowTemplate,
        props: {},
    });
    def.argTypes = {
    };
    return def;
};

export const DidYouKnowView = init();
DidYouKnowView.args = {
};