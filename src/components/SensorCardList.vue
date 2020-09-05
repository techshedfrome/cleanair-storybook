<template>
  <div class="container readings" id="itemListContainer">
    <SensorCard v-for="item in sensorList" 
                :key="item.device_id" 
                :device_id="item.device_id" 
                :last_seen="item.last_seen" 
                :readingdate="item.readingdate" 
                :pm2_5_value="item.pm2_5_value" 
                :pm10_value="item.pm10_value" 
                :daqi_value="item.daqi_value" 
                :daqi_band="item.daqi_band" 
                :show="item.show" 
                :isDev="item.isDev" 
    />
  </div>
</template>

<script>
import SensorCard from "./SensorCard";

export default {
  name: "SensorCardList",
  components: {
    SensorCard
  },
  props: {
    getSensors: {
      type: Function,
      required: false,
      default: () => console.log("getSensors prop not defined")
    },
  },
  data: () => ({
    sensorList: []
  }),
  mounted() {
    console.log(this.sensorList);
    this.sensorList = this.getSensors();
    console.log(this.sensorList);
  }
};
</script>

<style>
</style>