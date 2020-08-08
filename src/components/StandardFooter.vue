<template>
  <footer class="footer has-text-centered has-background-warning-light underline-links">
    <div class="container">
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <div class="content">
            <p
              class="has-text-weight-semibold is-size-5 mb-0"
              id="ContactUs"
            >Contact Clean Air Frome</p>
            <p class="pt-0">Clean air Frome is an initiative setup by the Frome Town Council.</p>
            <p>
              <a :href="`mailto:${this.council_email}`">Contact Frome Town Council</a>
            </p>
            <p>
              <a :href="`mailto:${this.clean_air_email}`">Contact Clean Air Team</a>
            </p>
            <p class="has-text-weight-semibold">Follow us on..</p>
            <p class="no-underline-links">
              <a href="https://www.facebook.com/Clean-Air-Frome-113809790395405'">
                <font-awesome-icon :icon="facebookIcon"  class="is-size-3 has-text-dark mx-1" />
              </a>
              <a href="https://cleanairinfrome.blogspot.com/">
                <font-awesome-icon :icon="bloggerIcon"  class="is-size-3 has-text-dark mx-1" />
              </a>
            </p>
            <p></p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-8-desktop is-offset-2-desktop">
          <div class="columns is-mobile is-centered mt-3">
            <div class="column is-half-desktop is-10-mobile card-outline has-background-white">
              <div class="columns is-mobile no-underline-links with-hover">
                <div class="column">
                  <h3 class="has-text-weight-semibold">Funded by</h3>
                  <br />
                  <a href="https://www.frometowncouncil.gov.uk/">
                    <img src="assets/FTC_logo.png" width="160px" />
                  </a>
                </div>
                <div class="column">
                  <h3 class="has-text-weight-semibold">Developed by</h3>
                  <br />
                  <a href="https://techshedfrome.org/">
                    <img src="assets/TechShed_Logo_Ani_optimised.gif" width="190px" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h3 class="has-text-weight-semibold">Support Tech Shed Frome</h3>
          <p>
            If you're interested in creating your own Tech project or want to meet the team to chat,
            <a
              :href="`mailto:${this.techshed_email}`"
            >get in touch</a>
          </p>
          <br />
          <p>
            <a href="https://www.frometowncouncil.gov.uk/privacy-policy/">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { faFacebookSquare, faBlogger } from "@fortawesome/fontawesome-free-brands";

export default {
  name: "standardFooter",
  components: {
    FontAwesomeIcon,
  },
  mounted() {
    // This will only work on your root Vue component since it's using $parent
    const { shadowRoot } = this.$parent.$options;
    const id = "fa-styles";

    if (shadowRoot && !shadowRoot.getElementById(`${id}`)) {
      const faStyles = document.createElement("style");
      faStyles.setAttribute("id", id);
      faStyles.textContent = dom.css();
      shadowRoot.appendChild(faStyles);
    }
  },
  props: {
    council_email: {
      type: String,
      required: true,
      default: () => ""
    },
    clean_air_email: {
      type: String,
      required: true,
      default: () => ""
    },
    techshed_email: {
      type: String,
      required: true,
      default: () => ""
    }
  },
  data: () => ({
        facebookIcon: faFacebookSquare,
        bloggerIcon : faBlogger
  }),
  computed: {}
};
</script>
<style>
@import "../css/main.css";
</style>
