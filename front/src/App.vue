<template>
  <v-app
    id="inspire"
    :class="[
      {
        'box-layout': boxLayout,
        'collapse-sidebar': sidebarState,
        'rtl-layout': rtlLayout,
      },
    ]"
  >
    <router-view :auth="auth" :authenticated="authenticated"></router-view>
    <notifications
      group="loggedIn"
      position="top right"
      animation-type="velocity"
    />
     <notifications
      group="center"
      position="top center"
      animation-type="velocity"
    />
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AuthService from "./auth/AuthService";

const auth = new AuthService();
const { authenticated, authNotifier } = auth;

export default {
  data() {
    authNotifier.on("authChange", (authState) => {
      this.authenticated = authState.authenticated;
    });
    return {
      auth,
      authenticated,
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2],
        },
        leave: {
          opacity: 0,
          height: 0,
        },
      },
    };
  },
  mounted() {
    // This if block is for IE 11
    if (!Object.entries)
      Object.entries = function (obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
      };
    if (this.selectedLocale.locale === "ar") {
      this.$store.dispatch("rtlLayout");
    }

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const model = {
        password: user.password,
        phone: user.phone,
      };
      this.$store.dispatch("confirmUser", {
        model,
      });
    }
  },
  computed: {
    ...mapGetters([
      "collapseSidebar",
      "boxLayout",
      "rtlLayout",
      "selectedLocale",
    ]),
    // isDark(){ return (this.$vuetify.theme.dark) ? 'dark' : 'light' }
    sidebarState: {
      get: function () {
        return this.collapseSidebar;
      },
      set: function () {
        return this.collapseSidebar;
      },
    },
  },
};
</script>
