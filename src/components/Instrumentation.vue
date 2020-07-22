<template>
  <transition name="fade">
    <div v-show="show">
      <section class="is-medium">
        <dial
          :device_id="device_id"
          :last_seen="last_seen"
          :main_value="pollutionBand"
          :sub_value="value"
          :sub_value_units="value_units"
          :show="show"
        />
        <div class="container readings">
          <advice :device_id="device_id" :aqi="pollutionBand" :show="show" />
        </div>
      </section>
    </div>
  </transition>
</template>




<script>
import { pm25ToIndex, pm10ToIndex } from "./airquality-index.js";
import Dial from "./Dial";
import Advice from "./Advice";
export default {
  name: "instrumentation",
  components: {
    Dial,
    Advice
  },
  props: {
    device_id: {
      type: String,
      required: true,
      default: () => ""
    },
    last_seen: {
      type: Date,
      required: true,
      default: () => undefined
    },
    measure: {
      type: String,
      required: true,
      default: () => ""
    },
    value: {
      type: Number,
      required: true,
      default: () => 0
    },
    value_units: {
      type: String,
      required: false,
      default: () => "µg/m³"
    },
    show: {
      type: Boolean,
      required: true,
      default: () => false
    }
  },
  computed: {
    pollutionBand() {
      if (this.measure !== "PM2.5" && this.measure !== "PM10") return 0;
      var aqi =
        this.measure === "PM2.5"
          ? pm25ToIndex(this.value)
          : pm10ToIndex(this.value);
      console.log(aqi);
      return aqi;
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
</style>