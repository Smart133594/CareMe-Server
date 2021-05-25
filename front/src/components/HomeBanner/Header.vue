<template>
  <b-navbar toggleable="xl" class="header-area text-white">
    <div class="container-fluid container-fluid--cp-150">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <app-logo></app-logo>
      <b-collapse
        class="default-nav justify-content-end"
        is-nav
        id="nav_collapse"
      >
        <b-navbar-nav class="navbar-nav main-menu text-white">
          <b-nav-item v-if="getUser == null" @click="onLogin"
            ><span>{{ $t("message.signIn") }}</span></b-nav-item
          >
          <b-nav-item v-if="getUser != null" @click="onDashborad"
            ><span>{{ $t("message.dashboard") }}</span></b-nav-item
          >

          <b-nav-item href="/contactUs" class="scroll"
            ><span>{{ $t("message.contactUs") }}</span></b-nav-item
          >

          <b-nav-item href="/faq" class="scroll"
            ><span>{{ $t("message.faq") }}</span></b-nav-item
          >

          <b-nav-item @click="onWishList" class="scroll"
            ><span>{{ $t("message.wishList") }}</span></b-nav-item
          >
          <!--
          <b-nav-item href="/categories" class="scroll"
            ><span>{{ $t("message.categories") }}</span></b-nav-item
          > -->
          <b-nav-item href="/vendors/-1/-1" class="scroll"
            ><span>{{ $t("message.vendors") }}</span></b-nav-item
          >
          <b-nav-item href="/servicies/-1/-1/-1/0,0/0,0" class="scroll"
            ><span>{{ $t("message.servicies") }}</span></b-nav-item
          >
          <b-nav-item href="/products/-1/-1/-1/0,0/0,0" class="scroll"
            ><span>{{ $t("message.products") }}</span></b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
      <language-provider></language-provider>
    </div>
  </b-navbar>
</template>

<script>
import LanguageProvider from "../Header/LanguageProvider";
import Vue from "vue";
import { mapGetters } from "vuex";
import AppLogo from "Components/AppLogo/AppLogo";

export default {
  components: {
    LanguageProvider,
    AppLogo,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted() {
    // (function () {
    //   scrollTo();
    // })();
    // function scrollTo() {
    //   document.querySelectorAll('.scroll a[href^="#"]').forEach((anchor) => {
    //     anchor.addEventListener("click", function (e) {
    //       e.preventDefault();
    //       document.querySelector(this.getAttribute("href")).scrollIntoView({
    //         behavior: "smooth",
    //       });
    //     });
    //   });
    // }
  },
  methods: {
    onLogin() {
      this.$emit("login");
    },
    onSignup() {
      this.$emit("signup");
    },
    onDashborad() {
      var user = this.getUser;
      if (user.role == "admin") {
        this.$router.push("/admin");
      } else if (user.role == "provider") {
        this.$router.push("/provider");
      } else if (user.role == "client") {
        this.$router.push("/client");
      }
    },
    onWishList() {
      if (this.getUser == null) {
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.youNeedToLoginFirst"),
        });
      } else {
        this.$router.push("/wishlist");
      }
    },
    handleScroll() {},
  },
  created() {},
  destroyed() {},
};
</script>

<style scoped>
</style>
