import StandardFooter from '../src/components/StandardFooter';
export default { title: 'StandardFooter' };

export const Footer = (args) => ({
    components: { StandardFooter },
    template: `<standardFooter 
                    :council_email=council_email
                    :clean_air_email=clean_air_email
                    :techshed_email=techshed_email
                />`,
    props: {
        council_email: '',
        clean_air_email: '',
        techshed_email: ''
    },
})

// export const Footer = (args) => <StandardFooter {...args} />;

Footer.storyName = 'Default Footer';
Footer.args = {
    council_email: 'council@example.com',
    clean_air_email: 'cleanair@example.com',
    techshed_email: 'techshed@example.com',
};
Footer.argTypes = {
    council_email: { control: 'text' },
    clean_air_email: { control: 'text' },
    techshed_email: { control: 'text' },
};
