# Cleanair

[Storybook](https://storybook.js.org/) build for Clean Air Frome component library.

Enables testing of components, both visually and functionally.
Changes reviewable via Chromatic visual diff tool at: 
* [Chromatic review tools](https://www.chromatic.com/build?appId=5f0e1aa3488d900022d5eb7a&number=11)

Storybook v6 now includes automatic(ish) variable data for stories via [Controls](https://storybook.js.org/docs/react/essentials/controls).


## StoryBook

Running Storybook locally:
`yarn storybook`

Possible alternative (not the same, but has a "community compnent library" type feature - https://bit.dev/

### Push to Chromatic (hosted storybook + visual diff)

THe Github action set up should automatically push changes to chromatic for review.

If needed, the manual command (uses [chromatic cli tools](https://www.chromatic.com/docs/setup)) is:
`npx chromatic --project-token=<project token>`

## Publishing vue component libraries
https://medium.com/justfrontendthings/how-to-create-and-publish-your-own-vuejs-component-library-on-npm-using-vue-cli-28e60943eed3

* `vue-cli-service build --target wc --name device 'src/components/*.vue'`
* https://cli.vuejs.org/guide/build-targets.html#web-component



----------

## Vuejs

* Bulma + Vue https://buefy.org/documentation/select
* 
### Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
