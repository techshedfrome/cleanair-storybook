<template>
  <div>
    <section class="is-medium">
      <dial v-bind="dialData" />
      <div class="container readings">
        <div class="AdviceBox reading-bare is-mobile has-background-warning-light">
          <div class="has-text-centered">
            <div>
              <div class="title is-size-6 mb-3 has-text-centered has-text-weight-semibold">
                <!-- data driven -->
                Accompanying health messages
                for at-risk individuals
              </div>Enjoy your usual outdoor activities.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>




<script>
import Dial from "./Dial";
export default {
  name: "instrumentation",
  components: {
    Dial
  },
  props: {
    dialData: {
      type: Object,
      required: false,
      default: () => ({
          device_id:  "1",
          last_seen:  new Date(),
          main_value:  3,
          sub_value: 14.32,
          is_large: true,
          show:  true,
        })
      }
    },
};
</script>