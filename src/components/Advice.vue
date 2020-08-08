<template>
  <transition name="fade">
        <div class="advice-box reading-bare is-mobile has-background-warning-light">
          <div class="has-text-centered">
            <div>
              <div class="title is-size-6 mb-3 has-text-centered has-text-weight-semibold">
                Accompanying health messages
                for at-risk individuals
              </div>
              {{ getAdvice }}
            </div>
          </div>
        </div>
  </transition>
</template>

<script>
import { indexToAdviceFromAqi } from "./airquality-index.js";
//import µm³ to Daqi conversion
export default {
  name: "advice",
  props: {
    device_id: {
      type: String,
      required: true,
      default: () => undefined
    },
    aqi: {
      type: String,
      required: true,
      default: () => 1
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
    },
  },
  computed: {
    getAdvice() {
      if (this.isDev) console.log('getting advice for aqi '+ this.aqi);
      var band = indexToAdviceFromAqi(this.aqi);
      return band === "Coming Soon" ? "Sensor Offline" : band;
    },
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
.dial {
  margin: 1em auto;
  height: 13em;
}



.advice-box {
    border: 2px solid #FBDD58;
    border-radius: 8px;
}

</style>