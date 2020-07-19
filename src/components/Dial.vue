<template>
  <div id=":device_id" class="container">
    <button v-on:click="show = !show">Toggle</button>

    <transition name="fade">
      <div class="has-text-centered mt-2" v-show="show">
        <div class="level-item">
          <div class="value-badge value-badge-large border aqi-1 title">
            <div class="has-text-centered shift-down">{{ main_value }}</div>
            <div
              class="is-size-6 has-text-weight-bold shift-up has-text-black"
            >{{ sub_value }} {{sub_value_units}}</div>
            <div class="is-size-4 has-text-weight-bold band has-text-black">Low</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
//import µm³ to Daqi conversion
export default {
  name: "dial",
  props: {
    values: {
      type: Object,
      required: true,
      default: () => ({
        show: false
      })
    },
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
    sizeClass() {
      return `list-item ${is_large ? "large" : "small"}`;
    },
    isLive() {
      if (!this.last_seen) return false;
      var hours = Math.floor(new Date().getTime() / 3600000 - this.last_seen);
      retuen(hours < 3);
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
  margin-top: -1.5em;
}
</style>