<template>
  <transition name="fade">
    <div 
      id=":device_id" class="dial container has-text-centered mt-2" v-show="show"
    >
      <div 
        :class="dialClass"
      >
        <div class="shift-down">{{ main_value }}</div>
        <div
          class="is-size-6 has-text-weight-bold shift-up has-text-black has-text-right right-align"
        >{{ presentationSubValue }} {{sub_value_units}}</div>
      </div>
      <div class="is-size-4 has-text-weight-bold band has-text-black">{{pollutionBand}}</div>
    </div>
  </transition>
</template>

<script>
import {
  getColourClassForAqi,
  indexToPollutionBandFromAqi
} from "./airquality-index.js";
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
      type: String,
      required: true
    },
    sub_value: {
      type: Number,
      required: true,
      default: () => 0.0
    },
    sub_value_units: {
      type: String,
      required: false,
      default: () => "µg/m³"
    },
    show: {
      type: Boolean,
      required: true,
      default: () => false
    },
    isDev: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    presentationSubValue() {
      var displayAs = Number.parseFloat(this.sub_value);
      console.log(displayAs);
      if(displayAs) displayAs = displayAs.toFixed(2)
      console.log(displayAs);
      return displayAs ?? "-.--";
    },
    dialClass() {
      if (this.isDev)
        console.log("getting dial class for aqi " + this.main_value);
      var daqiClass = getColourClassForAqi(this.main_value, !this.isLive);
      return `value-badge border title ${daqiClass} large`;
    },
    pollutionBand() {
      if (this.isDev)
        console.log("getting pollution band for aqi " + this.main_value);
      var band = indexToPollutionBandFromAqi(
        this.isLive ? this.main_value : undefined
      );
      return band === "Coming Soon" ? "Sensor Offline" : band;
    },
    isLive() {
      if (this.isDev)
        console.log(
          'checking age of reading to determin "live" status for datetime ' +
            this.last_seen
        );
      if (!this.last_seen) return false;
      var hours = Math.floor((new Date().getTime() - this.last_seen) / 3600000);
      return hours < 3;
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
  margin-top: 0.5em;
}
.dial {
  margin: 1em auto;
  height: 13em;
}
.right-align {
  margin-right: 1.6em;
}
</style>