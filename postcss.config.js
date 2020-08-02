const purgecss = require("@fullhuman/postcss-purgecss");

const plugins = [];

if (process.env.NODE_ENV === "production") {
    plugins.push(
        purgecss({
            content: [
                "./src/layouts/**/*.vue",
                "./src/components/**/*.vue",
                "./src/pages/**/*.vue",
                "./src/pages/**/*.js"
            ],
            whitelist: [
                "html", 
                "body",
                "aqi-band-low",
                "aqi-band-moderate",
                "aqi-band-high",
                "aqi-band-very-high", "aqi-1",
                "aqi-2",
                "aqi-3",
                "aqi-4",
                "aqi-5",
                "aqi-6",
                "aqi-7",
                "aqi-8",
                "aqi-9",
                "aqi-10",
                "value-badge", 
                "value-badge.large",
                "large",
                "is-size-6", "has-text-weight-bold", 
                "shift-up", 
                "shift-down",
                "has-text-black", 
                "has-text-right", "mr-5", 
                "fa","fa-question-circle",
                 "ml-1",
                "is-medium",
                "container","readings",
                "pt-1",
                "tabs",
                "is-toggle",
                "is-toggle-rounded",
                "is-centered",
                "has-text-weight-medium",
                "is-12-mobile",
                "is-8-desktop",
                "mb-5",
                "pt-1",
                "tabs",
                "is-toggle",
                "is-toggle-rounded ",
                "is-centered",
                "is-active",
                "dial",
                "band",

            ],
            whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
        })
    );
}

module.exports = { plugins };