// .storybook/main.js
module.exports = {
  stories: ['../src/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions', 
    '@storybook/addon-links', 
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
  ]
};