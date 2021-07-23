<template>
  <div class="language-bar">
    <v-btn @click="changeLanguage()" text large class="ml-2 v-step-3">
      <!--<img
        class="img-responsive"
        :src="selectedLocale.locale == 'en' ? '/static/flag-icons/om.png' : '/static/flag-icons/uk.png'"
      />-->
      <p style="color:white; margin-left:5px; margin-right:5px">{{selectedLocale.locale == "en" ? "العربية":"English"}}</p>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["selectedLocale", "languages"]),
  },
  methods: {
    changeLanguage() {
      let language = this.selectedLocale.locale == "en" ? this.languages[1]:this.languages[0]
      this.$i18n.locale = language.locale;
      this.$store.dispatch("changeLanguage", language);
    },
  },
};
</script>
