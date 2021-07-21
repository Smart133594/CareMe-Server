<template>
  <v-container>
    <div v-html="content" class="customer"></div>
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
      item: {
        id: -1,
        en_name: "",
        ar_name: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    content(){
      return this.selectedLocale.locale == 'en'? this.item.en_name: this.item.ar_name 
    }
  },
  methods: {
    getItems() {
      api
        .get("getCustomerServices", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            if (response.data.data != null) {
              this.item = response.data.data;
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
  .customer{
    p {
      color:#434343 !important
    }
    li {
      color:#434343 !important;
      list-style: inside !important;
      margin-bottom: 16px !important;
    }
    h1{
      font-size: 28px !important;
      margin-bottom: 8px !important;
      font-weight: 400 !important;
    }
    h2{
      font-size: 20px !important;
      margin-bottom: 8px !important;
      font-weight: 600 !important;
    }

    strong{
      font-size: 15px !important;
      margin-bottom: 8px !important;
    }
  }
</style>

