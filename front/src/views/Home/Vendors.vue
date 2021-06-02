<template>
<div class="container p-0">
    <app-section-loader :status="loading"></app-section-loader>
    <v-row class="px-0">
        <v-col xl="3" lg="3" md="3" sm="0" xs="0" class="shop-wrapper px-0">
            <filter-bar :category="true" :city="true"> </filter-bar>
        </v-col>
        <v-col xl="9" lg="9" md="9" sm="12" cols="12">
            <v-row>
                <v-col xl="3" lg="3" md="3" sm="12" cols="12" v-for="(vendor, index) in getFilteredVendors" :key="`${index}_vendor`" class="shop-content-wrap px-2">
                    <vendor-item :vendor="vendor" :small="true"></vendor-item>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</div>
</template>

<script>
import api from "Api";
import appConfig from "Constants/AppConfig";
import {
    mapGetters
} from "vuex";
import Vue from "vue";
import VendorItem from "Components/Shop/VendorItem";
import FilterBar from "Components/Shop/FilterBar";

export default {
    components: {
        VendorItem,
        FilterBar,
    },
    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
        getFilteredVendors() {
            return this.vendors;
        },

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
    },
    data: function () {
        return {
            loading: false,
            vendors: [],
            baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
        };
    },
    methods: {
        getVendors() {
            this.loading = true;
            let model = {
                selected_cities: this.getCityIds,
                selected_categories: this.getCategoryIds,
            };
            api
                .post(`getVendors`, JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        let vendors = response.data.data;
                        this.vendors = vendors;
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
        this.getVendors();
    },
    watch: {
        getCategoryIds() {
            this.getVendors();
        },

        getCityIds() {
            this.getVendors();
        },
    },
};
</script>
