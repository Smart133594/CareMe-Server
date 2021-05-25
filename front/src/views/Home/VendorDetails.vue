<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <div class="container">
      <v-carousel
        :interval="3000"
        hide-delimiters
        cycle
        :autoplay="true"
        :loop="true"
        height="300px"
      >
        <v-carousel-item
          v-for="(image, i) in vendor.images"
          v-bind:src="`${baseUrl}uploads/vendors/${image.image}`"
          :key="`${i}-vendor-banner`"
        ></v-carousel-item>
      </v-carousel>
      <v-row class="align-items-center">
        <v-col xl="6" lg="6" md="6" sm="12" cols="12">
          <gmap-map
            :center="center"
            :zoom="9"
            ref="mapRef"
            style="width: 100%; height: 300px"
            :options="mapOptions"
          >
            <gmap-marker
              :position="{
                lat: parseFloat(marker.position.lat),
                lng: parseFloat(marker.position.lng),
              }"
              :label="getAddress"
            >
            </gmap-marker>
          </gmap-map>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="p-10">
          <div
            class="d-custom-flex align-items-center justify-content-center mt-5"
          >
            <h5 class="text-purple">
              {{
                vendor[selectedLocale.locale == "en" ? "en_name" : "ar_name"]
              }}
            </h5>
          </div>
          <div
            class="d-custom-flex align-items-center justify-content-center mt-5"
          >
            <span class="icon-style" style="font-size: 25px">
              <i class="ti-location-pin"></i>
            </span>
            <h5 class="text-purple pl-5">
              {{
                vendor[
                  selectedLocale.locale == "en" ? "en_address" : "ar_address"
                ]
              }}
            </h5>
          </div>
          <div
            class="d-custom-flex align-items-center justify-content-center mt-5"
          >
            <span class="icon-style" style="font-size: 25px">
              <i class="zmdi zmdi-phone"></i>
            </span>
            <h5 class="text-purple pl-5">
              {{ vendor.phone }}
            </h5>
          </div>
          <div
            class="d-custom-flex align-items-center justify-content-center mt-5"
          >
            <v-rating
              readonly
              v-model="vendor.rating"
              background-color="orange"
              color="orange"
            ></v-rating>
          </div>
          <!-- <div class="d-custom-flex align-items-center justify-content-center mt-5">
                <v-btn dark class="ma-2" @click="veiwServiciesProducts" color="orange">{{$t('message.viewServiciesProducts')}}</v-btn>
          </div> -->
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-divider />
        <hot-deals
          :servicies="servicies"
          :products="products"
        ></hot-deals>
      </v-row>
    </div>
  </div>
</template>

<script>
import api from "Api";
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import Vue from "vue";
import HotDeals from "Components/Shop/HotDeals";

export default {
  components: {
    HotDeals,
  },
  data: function () {
    return {
      loading: false,
      vendor_id: -1,
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      vendor: { images: [] },
      center: { lat: 23.614328, lng: 58.545284 },
      marker: {
        position: { lat: 23.614328, lng: 58.545284 },
      },
      mapOptions: {
        disableDefaultUI: true,
      },
      products:[],
      servicies:[],
    };
  },
  methods: {
    getVendor() {
      this.loading = true;
      api
        .get(`getVendor/${this.vendor_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            let vendor = response.data.data.vendor;
            this.vendor = vendor;
            this.marker.position.lat = this.vendor.lat;
            this.marker.position.lng = this.vendor.lng;
            this.center.lat = this.marker.position.lat;
            this.center.lng = this.marker.position.lng;

            let products = response.data.data.products;
            this.products = products;
            let servicies = response.data.data.servicies;
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

    veiwServiciesProducts() {},
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    getAddress() {
      return this.vendor[
        this.selectedLocale.locale == "en" ? "en_name" : "ar_name"
      ];
    },
  },
  mounted() {},
  beforeMount() {
    let vendor_id = this.$route.params.vendor_id;
    this.vendor_id = vendor_id;
    this.getVendor();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_app.variables.scss";
</style>

