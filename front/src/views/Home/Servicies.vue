<template>
  <div class="container shop-wrapper p-0">
    <app-section-loader :status="loading"></app-section-loader>
    <v-row class="shop-content">
      <v-col xl="3" lg="3" md="3" sm="0" xs="0" class="px-0">
        <filter-bar
          :category="true"
          :city="true"
          :vendor="true"
          :department="true"
          :price="true"
          :discount="true"
          :url="'service'"
        >
        </filter-bar>
      </v-col>
      <v-col xl="9" lg="9" md="9" sm="12" cols="12" class="item-content">
        <service-items :servicies="servicies" :small="true"></service-items>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import api from "Api";
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import Vue from "vue";
import ServiceItems from "Components/Shop/ServiceItems";
import FilterBar from "Components/Shop/FilterBar";

export default {
  components: {
    ServiceItems,
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
    getDepartmentIds() {
      let department_ids = this.$route.params.department_id;
      let selectedDepartments = [];
      if (department_ids != "-1") {
        selectedDepartments = department_ids.split(",");
      }
      return selectedDepartments;
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
      baseUrl: appConfig.baseUrl,
      servicies: [],
      path: "",
    };
  },
  methods: {
    getServicies() {
      this.loading = true;
      let model = {
        selected_cities: this.getCityIds,
        selected_categories: this.getCategoryIds,
        selected_vendors: this.getVendorIds,
        selected_departments: this.getDepartmentIds,
        selected_pricies: this.getFilterPricies,
        selected_discount: this.getFilterDiscount,
      };
      api
        .post(`getServicies`, JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            let servicies = response.data.data;
            this.servicies = servicies;
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
    this.getServicies();
  },
  watch: {
    getCategoryIds() {
      if (this.path != this.$route.path) {
        this.getServicies();
        this.path = this.$route.path;
      }
    },

    getCityIds() {
      if (this.path != this.$route.path) {
        this.getServicies();
        this.path = this.$route.path;
      }
    },

    getVendorIds() {
      if (this.path != this.$route.path) {
        this.getServicies();
        this.path = this.$route.path;
      }
    },

    getDepartmentIds() {
      if (this.path != this.$route.path) {
        this.getServicies();
        this.path = this.$route.path;
      }
    },

    getFilterPricies() {
      if (this.path != this.$route.path) {
        this.getServicies();
        this.path = this.$route.path;
      }
    },

    getFilterDiscount() {
      if (this.path != this.$route.path) {
        this.getServicies();
        this.path = this.$route.path;
      }
    },
  },
};
</script>
