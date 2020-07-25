// src/store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        devices: [
            //compute api..?
            //should health message be computed?
            //bind to store properly... ?
            { device_id: '1', measurement_selected: "PM10"  , pm10: 55.2 , pm2_5: 26.8 , aqi: 2 , pollution_band_index: 0 },
            { device_id: '2', measurement_selected: "PM10"  , pm10: 55.2 , pm2_5: 26.8 , aqi: 2 , pollution_band_index: 0 },
            { device_id: '3', measurement_selected: "PM10"  , pm10: 55.2 , pm2_5: 26.8 , aqi: 2 , pollution_band_index: 0 },
            { device_id: '4', measurement_selected: "PM10"  , pm10: 55.2 , pm2_5: 26.8 , aqi: 2 , pollution_band_index: 0 },
        ],
        isDev: true,
    },
    mutations: {
        SELECT_MEASUREMENT(state, id, measurement) {
            state.tasks.find(task => task.id === id).measurement_selected = measurement;
        },
    },
    actions: {
        switchMeasurement({ commit }, id, measurement) {
            commit('SELECT_MEASUREMENT', id, measurement);
        },
    },
});