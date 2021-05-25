<template>
  <div>
    <app-section-loader :status="loadingData"></app-section-loader>
    <v-carousel
      :interval="3000"
      hide-delimiters
      cycle
      :autoplay="true"
      :loop="true"
      height="500px"
    >
      <v-carousel-item
        v-for="(banner, i) in banners"
        v-bind:src="`${baseUrl}uploads/banners/${banner}`"
        :key="`${i}-banner`"
      ></v-carousel-item>
    </v-carousel>
    <div
      class="app-landing--center-slider-wrapper section-space--ptb_30 container"
      id="categories"
      v-if="!loadingData"
    >
      <!-- Category swiper -->
      <div style="display: flex; flex-direction: row" class="align-center">
        <h5 class="font-weight--bold wow move-up text-purple show-title">
          {{ $t("message.our") }} {{ $t("message.categories") }}
        </h5>
      </div>
      <v-divider />
      <category-swiper :baseUrl="baseUrl" :items="categories" class="mb-20" />
      <!-- vendor swiper -->
      <div style="display: flex; flex-direction: row" class="align-center">
        <h5 class="font-weight--bold wow move-up text-purple show-title">
          {{ $t("message.recommended") }} {{ $t("message.vendors") }}
        </h5>
        <div class="spacer"></div>
        <h6 class="font-weight--bold wow move-up text-warning show-all" @click="viewAllVendors">
          {{ $t("message.viewAll") }}
        </h6>
      </div>
      <v-divider />
      <vendor-swiper :baseUrl="baseUrl" :items="vendors" class="mb-20" />
      <!-- servicies swiper -->
      <div style="display: flex; flex-direction: row" class="align-center">
        <h5 class="font-weight--bold wow move-up text-purple show-title">
          {{ $t("message.recommended") }} {{ $t("message.servicies") }}
        </h5>
        <div class="spacer"></div>
        <h6 class="font-weight--bold wow move-up text-warning show-all" @click="viewAllServicies">
          {{ $t("message.viewAll") }}
        </h6>
      </div>
      <v-divider />
      <service-swiper :baseUrl="baseUrl" :items="servicies" class="mb-20" />
      <!-- product swiper -->
      <div style="display: flex; flex-direction: row" class="align-center">
        <h5 class="font-weight--bold wow move-up text-purple show-title">
          {{ $t("message.recommended") }} {{ $t("message.products") }}
        </h5>
        <div class="spacer"></div>
        <h6 class="font-weight--bold wow move-up text-warning show-all" @click="viewAllProducts">
          {{ $t("message.viewAll") }}
        </h6>
      </div>
      <v-divider />
      <product-swiper :baseUrl="baseUrl" :items="products" />
      <!-- hot deals -->
      <div
        style="display: flex; flex-direction: row"
        class="align-center mt-40"
      >
        <h5 class="font-weight--bold wow move-up text-purple show-title">
          {{ $t("message.recommended") }} {{ $t("message.hotDeals") }}
        </h5>
      </div>
      <v-divider />
      <hot-deals
        :servicies="hot_servicies"
        :products="hot_products"
      ></hot-deals>
    </div>
  </div>
</template>

<script>
import CategorySwiper from "Components/Swipers/CategorySwiper";
import VendorSwiper from "Components/Swipers/VendorSwiper";
import ServiceSwiper from "Components/Swipers/ServiceSwiper";
import ProductSwiper from "Components/Swipers/ProductSwiper";
import HotDeals from "Components/Shop/HotDeals";

import { mapGetters } from "vuex";
import api from "Api";
import appConfig from "Constants/AppConfig";
// import CurveShape from "Components/CurveShape/CurveShape";

export default {
  components: {
    CategorySwiper,
    VendorSwiper,
    ServiceSwiper,
    ProductSwiper,
    HotDeals,
  },

  data() {
    return {
      loading: false,
      loadingData: false,
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      banners: [],
      categories: [],
      vendors: [],
      servicies: [],
      products: [],
      hot_servicies: [],
      hot_products: [],
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  methods: {
    getFrontData() {
      this.loadingData = true;
      api
        .get("getFrontData", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.banners = response.data.data.banners;
            this.categories = response.data.data.categories;
            this.vendors = response.data.data.vendors;
            this.servicies = response.data.data.servicies;
            this.products = response.data.data.products;
            let hot_servicies = response.data.data.hot_servicies;

            this.hot_servicies = hot_servicies;
            let hot_products = response.data.data.hot_products;

            // for (let index = 0; index < 3; index++) {
            //   hot_products.forEach((item) => {
            //     hot_products.push(item);
            //   });
            // }

            this.hot_products = hot_products;
          }
        })
        .finally(() => {
          this.loadingData = false;
        });
    },

    viewAllVendors(){
        this.$router.push(`/vendors/-1/-1`);
    },

    viewAllServicies(){
        this.$router.push(`/servicies/-1/-1/-1/0,0/0,0`);
    },
    viewAllProducts(){
        this.$router.push(`/products/-1/-1/-1/0,0/0,0`);
    }
  },

  beforeMount() {
    this.getFrontData();
  },

  mounted() {},
};
</script>

