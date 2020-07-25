<template>
  <div class="is-12-mobile is-8-desktop">
    <div class="mb-5">
      <div class="is-size-6 has-text-weight-bold mb-0 has-text-centered has-text-black">
        Size of dust particale
        <i class="far fa-question-circle ml-1"></i>
      </div>
      <div id="readingTabs" class="pt-1 tabs is-toggle is-toggle-rounded is-centered has-text-weight-medium"      >
        <ul class="has-text-weight-medium">
          <li id="PM25Selector" measure="PM2.5" @click="activeTab = measure" @class="activeTab == this.measure ? 'is-active' : ''" >
            <a @click="$emit('switchMeasurement', device_id, 'PM2.5')">
              <span class="has-text-black has-text-weight-bold">PM 2.5</span>
            </a>
          </li>

          <li id="PM10Selector" measure="PM10"  @click="activeTab = measure" @class="activeTab == this.measure ? 'is-active' : ''" >
            <a @click="$emit('switchMeasurement', device_id, 'PM10')">
              <span class="has-text-black has-text-weight-bold">PM 10</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <instrumentation
      :device_id="device_id"
      :last_seen="last_seen"
      :measure="measure"
      :value="value"
      :show="true"
      :isDev="isDev"
    />
  </div>
</template>

<script>
import Instrumentation from "./Instrumentation";

export default {
  name: "measurementSelector",
  components: {
    Instrumentation
  },
  props: {
    device: {
      type: Object,
      required: false,
      default: () => ({
        device_id: '',
      }),
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
    measure: {
      type: String,
      required: false,
      default: () => "PM10"
    },
    value: {
      type: Number,
      required: false,
      default: () => 1
    },
    isDev: {
      type: Boolean,
      required: false,
      default: () => false
    },
  },
  data: () => ({
      activeTab: "PM2.5"
    })
  

};
</script>

<style scoped>
</style>