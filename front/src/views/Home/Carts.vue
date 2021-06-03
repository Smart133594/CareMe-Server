<template>
<div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container v-if="!loading && cart.length > 0">
        <v-row class="cart-wrapper">
            <v-col xl="6" lg="6" md="6" sm="12" xs="12">
                <v-select :label="$t('message.vendors')" :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="vendor_id" :items="getVendors" item-value="id"></v-select>
                <v-row>
                    <div v-for="(product, index) in getVendorCart" :key="`${index}_product`" :class="{ 'mt-5': index != 0 }">
                        <cart-item :product="product"></cart-item>
                    </div>
                </v-row>
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="12" xs="12">
                <check-out :cart="getVendorCart" :vendorId="vendor_id"></check-out>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import api from "Api";
import CartItem from "Components/Shop/CartItem";
import CheckOut from "Components/Shop/CheckOut";
import Vue from "vue";

export default {
    computed: {
        ...mapGetters(["getUser", "selectedLocale", "cart"]),

        getVendorCart() {
            let carts = this.cart.filter(element => element.vendor_id == this.vendor_id);
            console.log(carts);
            return carts;
        },

        getVendors() {
            let carts = this.cart;
            let vendors = [];
            carts.forEach(cart => {
                let vendor = {
                    id: cart.vendor_id,
                    en_name: cart.vendor_en_name,
                    ar_name: cart.vendor_ar_name,
                };
                vendors.push(vendor);
            });
            return vendors;
        }
    },

    components: {
        CartItem,
        CheckOut,
    },

    data: function () {
        return {
            loading: false,
            vendor_id: -1,
        };
    },

    methods: {
        getCarts() {
            this.loading = true;
            api
                .post(`getCarts`, JSON.stringify(this.cart), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        let products = response.data.data;
                        if (products.length > 0) {
                            this.vendor_id = products[0].vendor_id
                        }
                        this.$store.dispatch("updateCart", products);
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },

    mounted() {},
    beforeMount() {
        let type = this.$route.params.type;
        if (type != "-1") {
            Vue.notify({
                group: "center",
                type: "success",
                text: this.$t("message.orderingSuccess"),
            });
            this.vendor_id = -1;
            let carts = this.cart.filter(element => element.vendor_id != type);
            this.$store.dispatch("updateCart", carts);
        }
        this.getCarts();
    },

    watch: {
        cart() {
            if (this.cart.length == 0) {
                this.$router.push("/");
            }
        }
    }
};
</script>
