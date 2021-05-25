<template>
  <div class="container shop-wrapper p-0">
    <app-section-loader :status="loading"></app-section-loader>
    <v-row class="px-0">
      <v-col xl="3" lg="3" md="3" sm="0" xs="0" class="shop-wrapper px-0">
        <filter-bar
          :category="true"
          :city="true"
          :vendor="true"
          :price="true"
          :discount="true"
          :url="'product'"
        >
        </filter-bar>
      </v-col>
      <v-col xl="9" lg="9" md="9" sm="12" cols="12">
        <product-items :products="products" :small="true"></product-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "Api";
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import Vue from "vue";
import ProductItems from "Components/Shop/ProductItems";
import FilterBar from "Components/Shop/FilterBar";

export default {
  components: {
    ProductItems,
    FilterBar,
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    getCategoryIds() {
      let category_ids = this.$route.params.category_id;
      let selectedCategories = [];
      if (category_ids != "-1") {
        selectedCategories = category_ids.split(",");
      }
      return selectedCategories;
    },
    getCityIds() {
      let city_ids = this.$route.params.city_id;
      let selectedCities = [];
      if (city_ids != -1) {
        selectedCities = city_ids.split(",");
      }

      return selectedCities;
    },
    getVendorIds() {
      let vendor_ids = this.$route.params.vendor_id;
      let selectedVendors = [];
      if (vendor_ids != "-1") {
        selectedVendors = vendor_ids.split(",");
      }
      return selectedVendors;
    },

    getFilterPricies() {
      let pricies = this.$route.params.pricies;
      let filterPricies = [];
      if (pricies != "0,0") {
        filterPricies = pricies.split(",");
      }
      return filterPricies;
    },

    getFilterDiscount() {
      let discount = this.$route.params.discount;
      let filterDiscount = [];
      if (discount != "0,0") {
        filterDiscount = discount.split(",");
      }
      return filterDiscount;
    },
  },
  data: function () {
    return {
      loading: false,
      vendors: [],
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      products: [],
      path: "",
    };
  },
  methods: {
    getProducts() {
      this.loading = true;
      let model = {
        selected_cities: this.getCityIds,
        selected_categories: this.getCategoryIds,
        selected_vendors: this.getVendorIds,
        selected_pricies: this.getFilterPricies,
        selected_discount: this.getFilterDiscount,
      };
      api
        .post(`getProducts`, JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            let products = response.data.data;
            this.products = products;
          }
        })
        .catch((error) => {
          Vue.notify({
            group: "center",
            type: "error",
            text: error,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {},
  beforeMount() {
    this.getProducts();
  },
  watch: {
    getCategoryIds() {
      if (this.path != this.$route.path) {
        this.getProducts();
        this.path = this.$route.path;
      }
    },

    getCityIds() {
      if (this.path != this.$route.path) {
        this.getProducts();
        this.path = this.$route.path;
      }
    },

    getVendorIds() {
      if (this.path != this.$route.path) {
        this.getProducts();
        this.path = this.$route.path;
      }
    },

    getFilterPricies() {
      if (this.path != this.$route.path) {
        this.getProducts();
        this.path = this.$route.path;
      }
    },

    getFilterDiscount() {
      if (this.path != this.$route.path) {
        this.getProducts();
        this.path = this.$route.path;
      }
    },
  },
};
</script>
