<template>
  <div class="reading reading-bare level is-mobile is-marginless invisible make-visible fast">
    <div class="level-left-tablet has-text-left">
      <div>
        <div
          class="title is-size-5 has-text-left-tablet mb-3"
          :id="`decicecardtitle_${device_id}`"
        >{{ streetName }}</div>
        <div class="has-text-left-tablet has-text-weight-normal is-size-6">
          {{ description }}
          <br />1 sensor
        </div>
      </div>
      <span class="level-item"></span>
    </div>
    <div
      class="level-right-tablet has-text-centered mt-2"
      :id="`decicecardvalues_${device_id}`"
      :readingdate="readingdate"
      :device_id="device_id"
      :last_seen="last_seen"
      :pm2_5_value="pm2_5_value"
      :pm10_value="pm10_value"
    >
      <div class="level-item">
        <div>
          <div
            :class="`value-badge is-size-4 border aqi-${daqi_value} title invisible make-visible`"
          >
            <p>{{ daqi_value }}</p>
          </div>
          <label for="detail-toggle">
            <a class="main-link">
              <span>{{ daqi_band }}</span>
            </a>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
needs an event or hook to tie in the displaying of SensorLiveView.
*/
export default {
  name: "SensorCard",
  components: {},
  props: {
    fetchBoxData: {
      type: Function,
      required: false,
      default: () => console.log("fetchBoxData prop not defined")
    },
    device_id: {
      type: String,
      required: false,
      default: () => ""
    },
    last_seen: {
      type: Date,
      required: false
    },
    readingdate: {
      type: Date,
      required: false
    },
    pm2_5_value: {
      type: String,
      required: false,
      default: () => "-:--"
    },
    pm10_value: {
      type: String,
      required: false,
      default: () => "-:--"
    },
    daqi_value: {
      type: String,
      required: false,
      default: () => "-"
    },
    daqi_band: {
      type: String,
      required: false,
      default: () => "-"
    },
    description: {
      type: String,
      required: false,
      default: () => "-"
    }
  },
  data: () => ({
    streetName: ""
  }),
  created() {
    // hook into created()  to trigger population of streetname
    // populateStreetName();
  },
  beforeMount() {},
  mounted() {
    this.getStreetName();
  },
  methods: {
    getStreetName() {
      //streetname is async
      //
      //fetch streetname from known coords or streetname API
      // fetch("<URL>")
      // .then(response => response.json())
      // .then(data => (this.streetName = data.result));
      this.streetName = "Not a Real Street";
    }
  },
  computed: {}
};
</script>

<style>
</style>