<template>
  <div id="subjectTabs" class="container">
    <div class="columns is-centered">
      <div class="column is-12-mobile is-8-desktop">
        <div :class="`title has-text-centered detail-${device_id}-title`">{{name}}</div>
        <div
          class="pt-1 tabs is-toggle is-toggle-rounded is-centered has-text-black has-text-weight-medium"
          id="subjectTabs"
        >
          <ul class="has-text-weight-medium">
            <li
              class="has-text-black has-text-weight-medium tab"
              v-on:click="activeTab = 'now'"
              v-bind:class="{ 'is-active': activeTab == 'now' }"
            >
              <a>
                <font-awesome-icon :icon="clockIcon" class="icon is-small has-text-black" />
                <span class="has-text-black has-text-weight-bold">Last hour</span>
              </a>
            </li>
            <li
              class="has-text-black has-text-weight-medium tab"
              v-on:click="activeTab = 'history'"
              v-bind:class="{ 'is-active': activeTab == 'history' }"
            >
              <a>
                <font-awesome-icon :icon="calendarIcon" class="icon is-small has-text-black" />
                <span class="has-text-black has-text-weight-bold">Over time</span>
              </a>
            </li>
          </ul>
        </div>

        <section id="subjectTabsContent">
          <SensorLiveView
            :device_id="device_id"
            :last_seen_string="last_seen_string"
            :pm2_5_value="pm2_5_value"
            :pm10_value="pm10_value"
            :show="true"
            :isDev="isDev"
            v-if="activeTab == 'now'"
          />
          <SensorHistory
            v-if="activeTab == 'history'" 
            :device_id="device_id" 
            :useHourlyMean=false
            :periodInHours=24
            :fetchBoxData="fetchData"
          />

        </section>
        
        <DidYouKnow />
      </div>
    </div>
  </div>
</template>


<script>
/*
 component containing different sensor views, with a view selector tab bar/toggle at the top
*/
import SensorLiveView from "./SensorLiveView";
import SensorHistory from "./SensorHistory";
import DidYouKnow from "./DidYouKnow";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";

import { fetchBoxData } from "./sensor-data";

// Make sure you tell Font Awesome to skip auto-inserting CSS into the <head>
config.autoAddCss = false;

export default {
  name: "SensorViewSelector",
  components: {
    SensorLiveView,
    SensorHistory,
    DidYouKnow,
    FontAwesomeIcon
  },
  mounted() {
    // This will only work on your root Vue component since it's using $parent
    const { shadowRoot } = this.$parent.$options;
    const id = "fa-styles";

    if (shadowRoot && !shadowRoot.getElementById(`${id}`)) {
      const faStyles = document.createElement("style");
      faStyles.setAttribute("id", id);
      faStyles.textContent = dom.css();
      shadowRoot.appendChild(faStyles);
    }
  },
  props: {
    device_id: {
      type: String,
      required: false,
      default: () => ""
    },
    name: {
      type: String,
      required: false,
      default: () => "Sensor Detail"
    },
    last_seen_string: {
      type: String,
      required: false,
      default: () => new Date().toString()
    },
    pm2_5_value: {
      type: Number,
      required: false,
      default: () => 0
    },
    pm10_value: {
      type: Number,
      required: false,
      default: () => 0
    },
    isDev: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data: () => ({
    activeTab: "now",
    calendarIcon: faCalendarAlt,
    clockIcon: faClock,
  }),
  methods: {
    fetchData(boxid, phenomenon, sampleHours, useHourlyMean, dataCallback){
      return fetchBoxData(boxid, phenomenon, sampleHours, useHourlyMean, dataCallback)
    }

  }
};
</script>