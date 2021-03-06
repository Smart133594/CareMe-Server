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
        class="carousel"
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
          <a
            target="_blink"
            :href="`https://www.google.com/maps/dir/?api=1&origin=${getAddress}&destination=${location.address}&key=${google_key}`"
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
          </a>
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
      <v-divider />
      <v-row class="mt-5">
        <v-row>
          <v-col xl="3" lg="3" md="3" sm="12" cols="12" class="shop-wrapper">
            <v-card class="shop-filter">
              <v-list>
                <app-card>
                  <div class="filter-tilte">
                    <h6 class="text-purple font-weight--bold">
                      {{ $t("message.department") }}
                    </h6>
                  </div>
                  <div class="content" style="max-height: 500px">
                    <v-checkbox
                      :label="
                        item[
                          selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'
                        ]
                      "
                      v-model="selectedDepartments"
                      :value="item.id"
                      hide-details
                      v-for="(item, index) in vendor.departments"
                      :key="`${index}_department`"
                    >
                    </v-checkbox>
                  </div>
                </app-card>
              </v-list>
            </v-card>
          </v-col>
          <v-col xl="9" lg="9" md="9" sm="12" cols="12">
            <hot-deals
              :small="true"
              :servicies="filteredServicies"
              :products="filteredProducts"
            ></hot-deals>
          </v-col>
        </v-row>
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
import axios from "axios";

export default {
  components: {
    HotDeals,
  },
  data: function () {
    return {
      loading: false,
      vendor_id: -1,
      baseUrl: appConfig.baseUrl,
      google_key: appConfig.googleApiKey,
      vendor: {
        images: [],
      },
      center: {
        lat: 23.614328,
        lng: 58.545284,
      },
      marker: {
        position: {
          lat: 23.614328,
          lng: 58.545284,
        },
      },
      mapOptions: {
        disableDefaultUI: true,
      },
      products: [],
      servicies: [],
      filteredProducts: [],
      filteredServicies: [],
      selectedDepartments: [],
      location: {},
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

            this.filteredProducts = response.data.data.products;
            this.filteredServicies = response.data.data.servicies;
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
        this.selectedLocale.locale == "en" ? "en_address" : "ar_address"
      ];
    },
  },
  mounted() {},
  beforeMount() {
    try {
      this.$getLocation(
        {
          enableHighAccuracy: false, //defaults to false
          timeout: Infinity, //defaults to Infinity
          maximumAge: 0, //defaults to 0
        },
        false
      ).then((coordinates) => {
        this.$geocoder.send(coordinates, (response) => {
          this.location = {
            lat: coordinates.lat,
            lng: coordinates.lng,
            address: response.results[0].formatted_address,
          };
        });

        console.log(coordinates);
      });
    } catch (error) {}

    let vendor_id = this.$route.params.vendor_id;
    this.vendor_id = vendor_id;
    this.getVendor();
  },

  watch: {
    selectedDepartments() {
      if (this.selectedDepartments.length) {
        this.filteredServicies = this.servicies.filter((service) =>
          this.selectedDepartments.includes(service.department_id)
        );
        this.filteredProducts = this.products.filter((product) =>
          this.selectedDepartments.includes(product.department_id)
        );
      } else {
        this.filteredProducts = this.products;
        this.filteredServicies = this.servicies;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_app.variables.scss";
</style>
