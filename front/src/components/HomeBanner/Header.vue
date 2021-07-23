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

          <b-nav-item href="/aboutus" class="scroll"
            ><span>{{ $t("message.aboutUs") }}</span></b-nav-item
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
          <b-nav-item href="/servicies/-1/-1/-1/-1/0,0/0,0" class="scroll"
            ><span>{{ $t("message.servicies") }}</span></b-nav-item
          >
          <b-nav-item href="/products/-1/-1/-1/-1/0,0/0,0" class="scroll"
            ><span>{{ $t("message.products") }}</span></b-nav-item
          >
          <b-nav-item >
           <CountryProvider/>
          </b-nav-item>
          <b-nav-item @click="changeLanguage(language)">
            <span>{{ language.name }}</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      
      <b-btn-group class="header-config-wrapper">
        <b-btn class="header-config" @click="toggleClass('addClass', 'active')"
          ><i class="far fa-search"></i
        ></b-btn>
      </b-btn-group>
    </div>
    <OffcanvasSearchBox :searchItems="searchItems" />
  </b-navbar>
</template>

<script>
import LanguageProvider from "../Header/LanguageProvider";
import CountryProvider from "./CountryProvider";
import Vue from "vue";
import { mapGetters } from "vuex";
import AppLogo from "Components/AppLogo/AppLogo";
import OffcanvasSearchBox from "./OffcanvasSearchBox";
import api from "Api";
import appConfig from "Constants/AppConfig";

export default {
  components: {
    LanguageProvider,
    CountryProvider,
    AppLogo,
    OffcanvasSearchBox,
  },
  data() {
    return {
      searchItems: null,
      baseUrl: appConfig.baseUrl,
    };
  },
  computed: {
    ...mapGetters(["getUser", "languages", "selectedLocale"]),

    language(){
      let language = null;
      this.languages.forEach(element => {
        if(element.locale != this.selectedLocale.locale){
          language = element
        }
      });
      return language
    }
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
    changeLanguage(language) {
      this.$i18n.locale = language.locale;
      this.$store.dispatch("changeLanguage", language);
    },
    toggleClass(addRemoveClass, className) {
      const el = document.querySelector("#search-overlay");
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },

    getSearchItems() {
      api
        .get("getSearchItems", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.searchItems = response.data.data;
          }
        })
    },
  },
  created() {},
  destroyed() {},
  beforeMount() {
    this.getSearchItems();
  },
};
</script>

<style scoped>
</style>
