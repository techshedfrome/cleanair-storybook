<template>
  <div class="is-12-mobile is-8-desktop">
    <div class="mb-5">
      <div
        class="is-size-6 has-text-weight-bold mb-0 has-text-centered has-text-black"
      >
        <span class="mr-2">Size of dust particle</span>
        <span
          class="is-hidden-mobile has-tooltip-bottom has-tooltip-arrow"
          :data-tooltip="pmDescription"
        >
          <font-awesome-icon :icon="icon" />
        </span>
        <span
          class="is-hidden-tablet has-tooltip-bottom has-tooltip-arrow"
          :data-tooltip="pmDescriptionNarrow"
        >
          <font-awesome-icon :icon="icon" />
        </span>
      </div>
      <div
        id="readingTabs"
        class="pt-1 tabs is-toggle is-toggle-rounded is-centered has-text-weight-medium"
      >
        <ul class="has-text-weight-medium">
          <li
            id="PM25Selector"
            v-on:click="activeTab = 'PM2.5'"
            v-bind:class="{ 'is-active': activeTab == 'PM2.5' }"
          >
            <a>
              <span class="has-text-black has-text-weight-bold">PM 2.5</span>
            </a>
          </li>

          <li
            id="PM10Selector"
            v-on:click="activeTab = 'PM10'"
            v-bind:class="{ 'is-active': activeTab == 'PM10' }"
          >
            <a>
              <span class="has-text-black has-text-weight-bold">PM 10</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <instrumentation
      :device_id="device_id"
      :last_seen="last_seen"
      :measure="activeTab"
      :value="activeValue"
      :show="true"
      :isDev="isDev"
    />
  </div>
</template>

<script>
import Instrumentation from "./Instrumentation";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { config, dom } from "@fortawesome/fontawesome-svg-core";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

// Make sure you tell Font Awesome to skip auto-inserting CSS into the <head>
config.autoAddCss = false;

export default {
  name: "measurementSelector",
  components: {
    Instrumentation,
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
    device: {
      type: Object,
      required: false,
      default: () => ({
        device_id: ""
      })
    },
    device_id: {
      type: String,
      required: false,
      default: () => ""
    },
    last_seen: {
      type: Date,
      required: false,
      default: () => new Date()
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
    activeTab: "PM2.5",
    icon: faQuestionCircle,
  }),
  computed: {
    activeValue() {
      return this.activeTab === "PM2.5" ? this.pm2_5_value : this.pm10_value;
    },
    pmDescription() {
      var msg =  
`Particulate Matter (PM) is how we describe fine 
dust particles that can be harmful to our health.

It's measured in µm (AKA micrometers or microns); 
so below we're showing some of the most harmful 
particles at PM sizes of 2.5µm and 10µm.

1 Micrometer is 1 thousandth of a millimeter!
(Human hair ranges from 17µm to 181μm)`
      return msg
    },

    pmDescriptionNarrow() {
      var msg =  
`Particulate Matter (PM) 
is how we describe fine 
dust particles that can 
be harmful to our 
health.

It's measured in µm 
(AKA micrometers or 
microns); below we're 
showing some of the 
most harmful particles 
at PM sizes of 2.5µm 
and 10µm.

1µm is 1 thousandth 
of a millimeter!
Human hair ranges 
from 17µm to 181μm`
      return msg
  },
  },
  methods: {}
};
</script>

<style>
@import "../css/main.css";
@import "../css/overrides.css";
</style>
