<template>
  <div class="is-12-mobile is-8-desktop">
    <div class="mb-5">
      <div class="is-size-6 has-text-weight-bold mb-0 has-text-centered has-text-black">
        Size of dust particale
        <i class="far fa-question-circle ml-1"></i>
      </div>
      <div
        id="readingTabs"
        class="pt-1 tabs is-toggle is-toggle-rounded is-centered has-text-weight-medium"
      >
        <ul class="has-text-weight-medium">
          <li
            id="PM25Selector"
            v-on:click="activeTab = 'PM2.5'"
            v-bind:class="{ 'is-active': activeTab == 'PM2.5'}"
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

const PM_2_5 = "PM2.5";
const PM_10  = "PM10";
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
    },
  },
  data: () => ({
    activeTab: "PM2.5",
  }),
  computed: {
    activeValue() {
      return this.activeTab === "PM2.5" ? this.pm2_5_value : this.pm10_value;
    }
  },
  methods: {  }
};
</script>

<style scoped>
</style>