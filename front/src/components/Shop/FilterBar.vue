<template>
  <v-card class="shop-filter">
    <v-toolbar color="#e1e1e1">
      <v-toolbar-title class="title">{{
        $t("message.filterBy")
      }}</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <app-card v-if="city">
        <div class="filter-tilte">
          <h6 class="text-purple font-weight--bold">
            {{ $t("message.city") }}
          </h6>
        </div>
        <div class="content">
          <v-checkbox
            :label="item[selectedLocale.locale == 'en' ? 'en_name' : 'ar_name']"
            style="margin-top: -15px"
            v-model="selectedCities"
            v-for="(item, index) in cities"
            :key="`${index}_city`"
            :value="item.id.toString()"
          >
          </v-checkbox>
        </div>
      </app-card>
      <app-card v-if="category">
        <div class="filter-tilte">
          <h6 class="text-purple font-weight--bold">
            {{ $t("message.category") }}
          </h6>
        </div>
        <div class="content">
          <v-checkbox
            :label="item[selectedLocale.locale == 'en' ? 'en_name' : 'ar_name']"
            style="margin-top: -15px"
            v-model="selectedCategories"
            v-for="(item, index) in categories"
            :key="`${index}_category`"
            :value="item.id.toString()"
          >
          </v-checkbox>
        </div>
      </app-card>
      <app-card v-if="vendor">
        <div class="filter-tilte">
          <h6 class="text-purple font-weight--bold">
            {{ $t("message.vendor") }}
          </h6>
        </div>
        <div class="content">
          <v-checkbox
            :label="item[selectedLocale.locale == 'en' ? 'en_name' : 'ar_name']"
            style="margin-top: -15px"
            v-model="selectedVendors"
            v-for="(item, index) in vendors"
            :key="`${index}_vendor`"
            :value="item.id.toString()"
          >
          </v-checkbox>
        </div>
      </app-card>
      <app-card v-if="price">
        <div class="filter-tilte">
          <h6 class="text-purple font-weight--bold">
            {{ $t("message.price") }}
          </h6>
        </div>
        <div class="content">
          <v-radio-group v-model="selectedPricies" column class="pt-0">
            <v-radio
              :label="item['text']"
              color="indigo"
              :value="item.value"
              v-for="(item, index) in pricies"
              :key="`${index}_price`"
            >
            </v-radio>
          </v-radio-group>
        </div>
      </app-card>
      <app-card v-if="discount">
        <div class="filter-tilte">
          <h6 class="text-purple font-weight--bold">
            {{ $t("message.discount") }}
          </h6>
        </div>
        <div class="content">
          <v-radio-group v-model="selectedDiscounts" column class="pt-0">
            <v-radio
              :label="item['text']"
              color="indigo"
              :value="item.value"
              v-for="(item, index) in pricies"
              :key="`${index}_price`"
            >
            </v-radio>
          </v-radio-group>
        </div>
      </app-card>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import api from "Api";
import appConfig from "Constants/AppConfig";

export default {
  components: {},
  props: {
    city: {
      required: false,
      default: false,
    },
    category: {
      required: false,
      default: false,
    },
    vendor: {
      required: false,
      default: false,
    },
    price: {
      required: false,
      default: false,
    },
    discount: {
      required: false,
      default: false,
    },

    url: {
      required: false,
      default: "vendor",
    },
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 160,
      },
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      loading: false,
      cities: [],
      categories: [],
      selectedCities: [],
      selectedCategories: [],
      selectedVendors: [],
      selectedPricies: "",
      selectedDiscounts: [],
      vendors: [],

      pricies: [
        { id: 1, text: "0 - 10", value: '0,10' },
        { id: 2, text: "10 - 50", value: '10,50' },
        { id: 3, text: "50 - 100", value: '50,100' },
        { id: 4, text: this.$t("message.all"), value: '0,0' },
      ],

      discounts: [
        { id: 1, text: "0 - 10 %", value: '0,10'},
        { id: 2, text: "10 - 50 %", value: '10,50'},
        { id: 3, text: "50 - 99 %", value: '50,99'},
        { id: 4, text: this.$t("message.all"), value: '0,0' },
      ],
    };
  },
  methods: {
    getFilterData() {
      this.loading = true;
      api
        .get("getFilterData", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.cities = response.data.data.cities;
            this.categories = response.data.data.categories;

            let vendors = [];
            this.categories.forEach((category) => {
              category.vendors.forEach((element) => {
                vendors.push(element);
              });
            });
            this.vendors = vendors;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    checkFilter() {
        console.log(this.selectedPricies)
      let category_ids = this.selectedCategories.join();
      let city_ids = this.selectedCities.join();
      if (city_ids == "") {
        city_ids = "-1";
      }
      if (category_ids == "") {
        category_ids = "-1";
      }
      let path = "";
      if (this.url == "vendor") {
        path = `/vendors/${category_ids}/${city_ids}`;
      } else {
        let vendor_ids = this.selectedVendors.join();
        if (vendor_ids == "") {
          vendor_ids = "-1";
        }

        let pricies = this.selectedPricies;
        let discounts = this.selectedDiscounts;
        if (this.url == "service")
          path = `/servicies/${city_ids}/${category_ids}/${vendor_ids}/${pricies}/${discounts}`;
        else
          path = `/products/${city_ids}/${category_ids}/${vendor_ids}/${pricies}/${discounts}`;
      }

      if (this.$route.path != path) {
        this.$router.push(path);
      }
    },
  },

  beforeMount() {
    let category_ids = this.$route.params.category_id;
    let city_ids = this.$route.params.city_id;

    if (category_ids != "-1") {
      this.selectedCategories = category_ids.split(",");
    }
    if (city_ids != "-1") {
      this.selectedCities = city_ids.split(",");
    }
    if (this.url == "service" || this.url == "product") {
      let vendor_ids = this.$route.params.vendor_id;
      if (vendor_ids != "-1") {
        this.selectedVendors = vendor_ids.split(",");
      }

      let pricies = this.$route.params.pricies;
      this.selectedPricies = pricies;

      let discounts = this.$route.params.discount;
      this.selectedDiscounts = discounts;
    }
    this.getFilterData();
  },

  watch: {
    selectedCategories() {
      let vendors = [];
      let selectedVendors = [];
      this.categories.forEach((category) => {
        category.vendors.forEach((element) => {
          let isOk = false;
          if (this.selectedCategories.length) {
            if (this.selectedCategories.includes(category.id.toString())) {
              isOk = true;
            }
          } else {
            isOk = true;
          }

          if (isOk) {
            vendors.push(element);
            if (this.selectedVendors.length) {
              if (this.selectedVendors.includes(element.id.toString())) {
                selectedVendors.push(element.id.toString());
              }
            }
          }
        });
      });

      this.vendors = vendors;
      this.selectedVendors = selectedVendors;
      this.checkFilter();
    },

    selectedCities() {
      this.checkFilter();
    },

    selectedVendors() {
      this.checkFilter();
    },

    selectedPricies() {
      this.checkFilter();
    },

    selectedDiscounts() {
      this.checkFilter();
    },
  },
};
</script>
