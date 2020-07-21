<template>
  <div>
    <section class="is-medium">
      <dial v-bind="dialData" />
      <div class="container readings">
        <advice 
          :device_id="dialData.device_id"
          :aqi="dialData.main_value"
          :show="dialData.show"
        />
      </div>
    </section>
  </div>
</template>




<script>
import Dial from "./Dial";
import Advice from "./Advice";
export default {
  name: "instrumentation",
  components: {
    Dial,
    Advice
  },
  props: {
    dialData: {
      type: Object,
      required: false,
      default: () => ({
        device_id: "1",
        last_seen: new Date(),
        main_value: 3,
        sub_value: 14.32,
        is_large: true,
        show: true
      })
    },
  }
};
</script>