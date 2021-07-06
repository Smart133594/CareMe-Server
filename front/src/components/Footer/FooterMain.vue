<template>
  <div class="footer-area-wrapper" :class="FooterStyle">
    <div class="footer-area my-4">
      <div class="container">
        <div class="row footer-widget-wrapper" style="align-items: top">
          <v-col sm="12">
            <h6 class="footer-widget__title mb-20">WHAT'S HOT</h6>
            <ul class="footer-widget__list p-0">
              <li>
                <router-link to="/">Apparel</router-link>
              </li>
              <li>
                <router-link to="/">Footwear</router-link>
              </li>
              <li>
                <router-link to="/">Sports</router-link>
              </li>
              <li>
                <router-link to="/">Arabic Fragrances</router-link>
              </li>
            </ul>
          </v-col>
          <v-col sm="12">
            <h6 class="footer-widget__title mb-20">COMPANY INFORMATION</h6>
            <ul class="footer-widget__list p-0">
              <li>
                <router-link to="/">About Us</router-link>
              </li>
              <li>
                <router-link to="/">Privacy Policy</router-link>
              </li>
              <li>
                <router-link to="/">Delivery Terms</router-link>
              </li>
              <li>
                <router-link to="/">Terms and conditions</router-link>
              </li>
              <li>
                <router-link to="/">Newsroom</router-link>
              </li>
            </ul>
          </v-col>
          <v-col sm="12">
            <h6 class="footer-widget__title mb-20">
              EXPERIENCE BOUTIQAAT APP ON MOBILE
            </h6>
            <ul class="footer-widget__logo p-0">
              <li>
                <router-link to="/">
                  <img
                    src="/static/img/google-play.png"
                    alt="site logo"
                    width="108"
                    height="32"
                  />
                </router-link>
              </li>
              <li>
                <router-link to="/">
                  <img
                    src="/static/img/apple-store.png"
                    alt="site logo"
                    width="108"
                    height="32"
                  />
                </router-link>
              </li>
              <li>
                <router-link to="/">
                  <img
                    src="/static/img/app-callery.png"
                    alt="site logo"
                    width="108"
                    height="32"
                  />
                </router-link>
              </li>
            </ul>
          </v-col>
          <v-col sm="12">
            <h6 class="footer-widget__title mb-20">SUPPORT</h6>
            <ul class="footer-widget__list p-0">
              <li>
                <router-link to="/">Exchange and returns</router-link>
              </li>
              <li>
                <router-link to="/">Customer Service</router-link>
              </li>
              <li>
                <router-link to="/">How to order</router-link>
              </li>
              <li>
                <router-link to="/faq">{{ $t("message.faq") }}</router-link>
              </li>
              <li>
                <router-link to="/">Newsroom</router-link>
              </li>
            </ul>
          </v-col>
          <v-col sm="12">
            <h6 class="footer-widget__title mb-20">CONTACT US</h6>
            <ul class="footer-widget__list p-0">
              <li>
                <a href="tel:+96595940026">Call: +965 95940026</a>
              </li>
              <li>
                <a href="mailto:support@careme.om">Email: support@careme.om</a>
              </li>
              <ul class="footer-widget__contact p-0">
                <h6 class="footer-widget__title my-4">FOLLOW US ON</h6>
                <li style="margin-right: 0.55rem">
                  <router-link to="/">
                    <span class="icon-style" style="font-size: 26px">
                      <i class="ti-instagram"></i>
                    </span>
                  </router-link>
                </li>
                <li style="margin-right: 0.55rem">
                  <router-link to="/">
                    <span class="icon-style" style="font-size: 26px">
                      <i class="ti-facebook"></i>
                    </span>
                  </router-link>
                </li>
                <li style="margin-right: 0.55rem">
                  <router-link to="/">
                    <span class="icon-style" style="font-size: 26px">
                      <i class="ti-twitter-alt"></i>
                    </span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/">
                    <span class="icon-style" style="font-size: 26px">
                      <i class="ti-pinterest"></i>
                    </span>
                  </router-link>
                </li>
              </ul>
            </ul>
          </v-col>
        </div>
      </div>
    </div>
    <div class="footer-copyright-area border-top bg_drak-footer">
      <div class="container">
        <div class="align-items-center foot-bottom">
          <app-logo></app-logo>
          <span class="copyright-text">
            &copy; 2021 <b>CareMe </b> All Rights Reserved.
          </span>
          <img
            src="/static/img/payments.png"
            class="img-fluid logo-light"
            alt="logo"
          />
        </div>
      </div>
    </div>
    <v-btn class="whats-button py-5" dark small @click="goToWhatsapp">
      <v-icon style="font-size: 30px">zmdi-whatsapp</v-icon>
    </v-btn>
    <v-btn
      class="top-button py-5"
      dark
      small
      color="orange"
      @click="go2Top"
      v-if="scrolled"
    >
      <v-icon dark>ti-angle-up</v-icon>
    </v-btn>
    <v-btn
      class="cart-button py-5"
      dark
      small
      color="info"
      @click="go2Carts"
      v-if="existCarts"
    >
      <v-icon dark>ti-shopping-cart-full</v-icon>
    </v-btn>
  </div>
</template>

<script>
import AppLogo from "Components/AppLogo/AppLogo";
import $ from "jquery";
import { mapGetters } from "vuex";

export default {
  name: "FooterMain",
  props: ["FooterStyle"],
  computed: {
    ...mapGetters(["cart"]),
    existCarts(){
        return this.cart.length
    }
  },
  components: {
    AppLogo,
  },
  data(){
      return {
          scrolled: false,
      }
  },
  methods: {
    goToWhatsapp() {
      window.open("https://api.whatsapp.com/send?phone=+96595940026");
    },

    go2Top() {
      $("html,body").animate({ scrollTop: 0 }, "slow");
    },
    handleScroll() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.scrolled = currentScroll > 100;
    },

    go2Carts(){
        this.$router.push('/carts/-1')
    }
  },
  created() {
    document.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/_app.variables.scss";
@import "../../assets/aeroland/assets/scss/_variabls.scss";

.whats-button {
  position: fixed;
  bottom: 15px;
  left: 30px;
  background-color: $whatsapp !important;
}

.cart-button {
  position: fixed;
  bottom: 75px;
  left: 30px;
}

.top-button {
  position: fixed;
  bottom: 15px;
  right: 30px;
}

</style>

