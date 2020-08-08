<template>
  <div id="didYouKnow" class="container is-centered has-text-centered">
    <div class="columns mt-4 is-mobile">
      <div
        class="column is-2-mobile is-1-tablet is-1-desktop is-offset-2-desktop has-text-right mr-2"
      >
        <font-awesome-icon :icon="icon" class="is-pulled-right is-size-2" />
      </div>
      <div class="column is-mobile-11 has-text-left">
        <div class="has-text-weight-bold is-size-6">Did you know</div>
        <p>
          Air pollution tends to get trapped within roads with tall buildings on either side, so this
          type of road usually has poor air quality and should be avoided for exercise.
        </p>
      </div>
      <div class="column is-3-desktop is-hidden-mobile"></div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
export default {
  name: "DidYouKnow",
  components: {
    FontAwesomeIcon,
  },
  data: () => ({
    icon: faLightbulb,
  }),
};
</script>

<style>
</style>