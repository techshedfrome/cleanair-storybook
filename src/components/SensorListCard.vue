<template>
  <div class="reading reading-bare level is-mobile is-marginless invisible make-visible fast">
    <div class="level-left-tablet has-text-left">
      <div>
        <div
          class="title is-size-5 has-text-left-tablet mb-3"
          id="cleanairfrome-5-title"
        >{{streetName}}</div>
        <div class="has-text-left-tablet has-text-weight-normal is-size-6">
          {{description}}
          <br />1 sensor
        </div>
      </div>
      <span class="level-item"></span>
    </div>
    <div
      class="level-right-tablet has-text-centered mt-2"
      :device_id="device_id"
      readingdate="2020-07-31T14:01:03+01:00"
    >
      <div class="level-item">
        <div>
          <div class="value-badge is-size-4 border aqi-{{aqi}} title invisible make-visible">
            <p>{{aqi}}</p>
          </div>
          <label for="element-toggle">
            <a class="main-link">
              <span>{{band}}</span>
              <i class="fas fa-info-circle has-text-grey ml-1" aria-hidden="true"></i>
            </a>
            <!-- generate detail view -->
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sensorListCard",
  props: {
    device_id: {
      type: String,
      required: true,
      default: () => undefined
    },
    description: {
      type: String,
      required: true,
      default: () => ""
    },
    lat: {
      type: Number,
      required: true,
      default: () => 0
    },
    lon: {
      type: Number,
      required: true,
      default: () => 0
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
  data: ()=> ({
      streetName: "",
  }),
  created() {
    // hook into created()  to trigger population of streetname
    // populateStreetName();
  },
  beforeMount(){
  },
  mounted(){
  },
  methods: {
    populateStreetName() {
      //fetch streetname from known coords or streetname API
        // fetch("<URL>")
        // .then(response => response.json())
        // .then(data => (this.streetName = data.result));
    }
  },
  computed: {
  }
};
</script>

<style scoped>
</style>