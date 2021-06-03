<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container class="shop-wrapper">
        <service-items :servicies="servicies"></service-items>
        <product-items :products="products"></product-items>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "Api";
import ServiceItems from "Components/Shop/ServiceItems";
import ProductItems from "Components/Shop/ProductItems";
export default {
  components: {
    ServiceItems,
    ProductItems,
  },
  data: function () {
    return {
      loading: false,
      servicies: [],
      products: [],
      wishes:[],
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    isExistWishes(){
      let user = this.getUser;
      let wishes = user.wishes;
      return wishes.length;
    }
  },
  methods: {
    getWishes() {
      this.loading = true;
      api
        .get("getWishes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.servicies = response.data.data.servicies;
            this.products = response.data.data.products;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  mounted() {},
  beforeMount() {
    this.getWishes();
  },
  watch:{
    isExistWishes(){
      this.getWishes();
    }
  }
};
</script>
