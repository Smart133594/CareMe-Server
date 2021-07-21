<template>
  <v-container>
    <div v-html="content" class="about"></div>
  </v-container>
</template>

<script>
import api from "Api";
import { mapGetters } from "vuex";

export default {
  components: {
    
  },

  data() {
    return {
      loading: false,
      aboutUs: {
        id: -1,
        en_name: "",
        ar_name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    content(){
      return this.selectedLocale.locale == 'en'? this.aboutUs.en_name: this.aboutUs.ar_name 
    }
  },
  methods: {
    getItems() {
      api
        .get("getAboutUs", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            if (response.data.data != null) {
              this.aboutUs = response.data.data;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  beforeMount() {
    this.getItems();
  },
  mounted() {},
};
</script>

<style lang="scss">
  .about{
    p {
      color:#434343 !important
    }
    li {
      color:#434343 !important
    }
    h1{
      font-size: 28px !important;
      margin-bottom: 8px !important;
      font-weight: 400 !important;
    }
  }
</style>

