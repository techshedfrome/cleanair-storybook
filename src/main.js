import Vue from "vue";
import App from "./App.vue";
import store from './store';


import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// @import "../css/main.css";
// @import "../css/overrides.css";
import "@../css/main.css"
import "@../css/overrides.css"

Vue.config.productionTip = false;

new Vue({
  store: store,
  render: h => h(App)
}).$mount("#app");
