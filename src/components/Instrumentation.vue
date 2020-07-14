<!--src/components/Instrumentation.vue-->
<template>
  <div :class="instrumentationClass">
    <!-- <div :class="taskClass">
      <label class="checkbox">
        <input type="checkbox" :checked="isChecked" :disabled="true" name="checked" />
        <span class="checkbox-custom" @click="$emit('archiveTask', task.id)" />
      </label>
      <div class="title">
        <input type="text" :readonly="true" :value="this.task.title" placeholder="Input title" />
      </div>
      <div class="actions">
        <a @click="$emit('pinTask', task.id)" v-if="!isChecked">
          <span class="icon-star" />
        </a>
      </div>
    </div> -->

    <section class="is-medium">
      <div class="hero-body has-text-centered is-12-desktop">
        <div class="container">
          <div
            class="level-right-tablet has-text-centered mt-2"
            id="_5eeba76aee9b25001b3ba5c7"
            readingdate="2020-07-12T16:33:04+01:00"
          >
            <div class="level-item">
                <!-- should have loading state -->
                <!-- should animate on load -->
                <!-- should have error state -->
              <div>
                <div class="value-badge-large is-size-1 border aqi-1 title invisible make-visible">
                <!-- data driven -->
                  1
                </div>
                <div>
                  <span class="is-size-6">
                    <!-- data driven -->
                    1.8 µg/m³</span>
                </div>

                <span class="main-link is-size-3">
                <!-- data driven -->
                  Low</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
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
export default {
  name: "instrumentation",
  props: {
    instrumentation: {
      type: Object,
      required: true,
      default: () => ({
        id: "",
        state: "",
        title: "",
        pm10: "",
        pm2_5: "",
      })
    }
  },
  // computed: {
  //   taskClass() {
  //     return `list-item ${this.instrumentation.state}`;
  //   },
  //   isChecked() {
  //     return this.instrumentation.state === "TASK_ARCHIVED";
  //   }
  // }
};
</script>