<template>
  <div id=":device_id" class="container">
    <transition name="fade">
      <div class="has-text-centered mt-2" v-show="show">
        <div class="level-item">
          <div :class="dialClass">
            <div class="shift-down">{{ main_value }}</div>
            <div
              class="is-size-6 has-text-weight-bold shift-up has-text-black"
            >{{ sub_value }} {{sub_value_units}}</div>
            <div class="is-size-4 has-text-weight-bold band has-text-black">{{pollutionBand}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import { getColourClassForAqi, indexToPollutionBandFromAqi } from "./airquality-index.js"
//import µm³ to Daqi conversion
export default {
  name: "dial",
  props: {
    device_id: {
      type: String,
      required: true,
      default: () => undefined
    },
    last_seen: {
      type: Date,
      required: true,
      default: () => undefined
    },
    main_value: {
      type: Number,
      required: true,
      default: () => 1
    },
    sub_value: {
      type: Number,
      required: true,
      default: () => 14.32
    },
    sub_value_units: {
      type: String,
      required: false,
      default: () => "µg/m³"
    },
    is_large: {
      type: Boolean,
      required: true,
      default: () => true
    },
    show: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  computed: {
    dialClass() {
      var daqiClass = getColourClassForAqi(this.main_value, !this.isLive) ;
      return `value-badge value-badge-large border title ${ daqiClass } ${this.is_large ? "large" : "small"}`;
    },
    pollutionBand() {
      var band = indexToPollutionBandFromAqi(this.isLive ? this.main_value : undefined) ;
      return band === 'Coming Soon' ? 'Sensor Offline' : band;
    },
    isLive() {
        console.log(this.last_seen);
      if (!this.last_seen) return false;
      var hours = Math.floor((new Date().getTime() - this.last_seen) / 3600000);
      console.log(hours);
      return(hours < 3);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.shift-up {
  margin-top: -2em;
}

.shift-down {
  margin-top: 0.15em;
}

.band {
  line-height: 1em;
}
</style>