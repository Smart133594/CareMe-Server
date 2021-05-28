<template>
  <div class="search-overlay" id="search-overlay">
    <div class="search-overlay__inner">
      <div class="search-overlay__header">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-6 col-8">
              <app-logo></app-logo>
            </div>
            <div class="col-md-6 col-4">
              <div class="search-content text-right">
                <span
                  class="mobile-navigation-close-icon"
                  @click="toggleClass('removeClass', 'active')"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-overlay__body accordion-wrapper">
        <div class="search-overlay__form">
          <form action="#">
            <input
              type="text"
              v-model="search"
              placeholder="Enter search keyword..."
            />
            <button type="submit"><i class="far fa-search"></i></button>
          </form>
        </div>
        <div class="faq-wrapper wow move-up mt-5">
            <div class="accordion-faq wow move-up">
                <b-card no-body v-if="categories.length>0">
                    <b-card-header header-tag="header">
                        <b-button block v-b-toggle.accordion-categories class="faq-title">{{ $t("message.categories") }} </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-categories" visible accordion="my-accordion">
                        <b-card-body class="px-2">
                            <div class="swiper-slide shop-content-wrap"  v-for="(item, index) in categories" :key="`${index}_filter_category`" @click="selectCategoryItem(item)">
                                <div class="border d-flex flex-direction-row align-items-center mt-1">
                                    <img :src="`${baseUrl}uploads/categories/${item.image}`" height="80" width="80"/>
                                    <div class="d-flex flex-direction-column ml-2">
                                        <h6 class="font-weight--bold text-purple">{{item[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}} </h6>
                                    </div>
                                </div>
                            </div>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body v-if="vendors.length>0">
                    <b-card-header header-tag="header">
                        <b-button block v-b-toggle.accordion-vendors class="faq-title">{{ $t("message.vendors") }} </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-vendors" visible accordion="my-accordion">
                        <b-card-body class="px-2">
                            <div class="swiper-slide shop-content-wrap"  v-for="(item, index) in vendors" :key="`${index}_filter_vendor`" @click="selectVendorItem(item)">
                                <div class="border d-flex flex-direction-row align-items-center mt-1">
                                    <img :src="`${baseUrl}uploads/vendors/${item.image}`" height="80" width="80"/>
                                    <div class="d-flex flex-direction-column ml-2">
                                        <h6 class="font-weight--bold text-purple">{{item[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}} </h6>
                                        <p class="font-weight--bold text-purple">{{item[selectedLocale.locale == "en" ? "en_address" : "ar_address"]}} </p>
                                    </div>
                                </div>
                            </div>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                 <b-card no-body v-if="servicies.length>0">
                    <b-card-header header-tag="header">
                        <b-button block v-b-toggle.accordion-servicies class="faq-title">{{ $t("message.servicies") }} </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-servicies" visible accordion="my-accordion">
                        <b-card-body class="px-2">
                            <div class="swiper-slide shop-content-wrap"  v-for="(item, index) in servicies" :key="`${index}_filter_service`" @click="selectServiceItem(item)">
                                <div class="border d-flex flex-direction-row align-items-center mt-1">
                                    <img :src="`${baseUrl}uploads/servicies/${item.image}`" height="80" width="80"/>
                                    <div class="d-flex flex-direction-column ml-2">
                                        <h6 class="font-weight--bold text-purple">{{item[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}} </h6>
                                        <!-- <p class="font-weight--bold text-purple">{{textTruncate(item[selectedLocale.locale == "en" ? "en_description" : "ar_description"])}} </p> -->
                                    </div>
                                </div>
                            </div>
                        </b-card-body>
                    </b-collapse>
                </b-card>

                <b-card no-body v-if="products.length>0">
                    <b-card-header header-tag="header">
                        <b-button block v-b-toggle.accordion-products class="faq-title">{{ $t("message.products") }} </b-button>
                    </b-card-header>
                    <b-collapse id="accordion-products" visible accordion="my-accordion">
                        <b-card-body class="px-2">
                            <div class="swiper-slide shop-content-wrap"  v-for="(item, index) in products" :key="`${index}_filter_product`" @click="selectProductItem(item)">
                                <div class="border d-flex flex-direction-row align-items-center mt-1">
                                    <img :src="`${baseUrl}uploads/products/${item.image}`" height="80" width="80"/>
                                    <div class="d-flex flex-direction-column ml-2">
                                        <h6 class="font-weight--bold text-purple">{{item[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}} </h6>
                                        <!-- <p class="font-weight--bold text-purple">{{textTruncate(item[selectedLocale.locale == "en" ? "en_description" : "ar_description"])}} </p> -->
                                    </div>
                                </div>
                            </div>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogo from "Components/AppLogo/AppLogo";
import ServiceItem from "Components/Shop/ServiceItem";
import { mapGetters } from "vuex";
import appConfig from "Constants/AppConfig";
import {
  textTruncate,
} from "Helpers/helpers";
export default {
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  components: {
    ServiceItem,
    AppLogo,
  },
  props: {
    searchItems: {
      required: true,
    },
  },
  data() {
    return {
      search: "",
      categories: [],
      vendors: [],
      servicies: [],
      products: [],
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
    };
  },
  methods: {
    toggleClass(addRemoveClass, className) {
      const el = document.querySelector("#search-overlay");
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },

    selectCategoryItem(item) {
      this.$router.push(`/vendors/${item.id}/-1`);
      this.toggleClass("removeClass", "active");
    },

    selectVendorItem(item) {
      this.$router.push(`/vendor-details/${item.id}`);
      this.toggleClass("removeClass", "active");
    },

    selectServiceItem(item) {
      this.$router.push(`/service/${item.id}`);
      this.toggleClass("removeClass", "active");
    },

    selectProductItem(item) {
      this.$router.push(`/product/${item.id}`);
      this.toggleClass("removeClass", "active");
    },

     textTruncate(text) {
      return textTruncate(text, 34);
    },

  },

  watch: {
    search() {
      if (this.search == "" || this.searchItems == null) {
        this.categories = [];
        this.vendors = [];
        this.products = [];
        this.servicies = [];
      } else {
        let categories = this.searchItems.categories;
        let vendors = this.searchItems.vendors;
        let products = this.searchItems.products;
        let servicies = this.searchItems.servicies;

        this.categories = categories.filter(category => category[this.selectedLocale.locale  == "en" ? "en_name" : "ar_name"].toLowerCase().includes(this.search.toLowerCase()));
        this.vendors = vendors.filter(vendor => vendor[this.selectedLocale.locale  == "en" ? "en_name" : "ar_name"].toLowerCase().includes(this.search.toLowerCase()));
        this.products = products.filter(product => product[this.selectedLocale.locale  == "en" ? "en_name" : "ar_name"].toLowerCase().includes(this.search.toLowerCase()));
        this.servicies = servicies.filter(service => service[this.selectedLocale.locale  == "en" ? "en_name" : "ar_name"].toLowerCase().includes(this.search.toLowerCase()));
      }
    },
  },
};
</script>

<style lang="scss">
</style>
