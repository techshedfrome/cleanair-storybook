// .storybook/main.js
module.exports = {
  stories: ['../stories/*.stories.js'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
    // '@storybook/addon-knobs',
    // '@storybook/addon-viewport/register',
  ]
};
