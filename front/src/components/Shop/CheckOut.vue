<template>
<div>
    <app-card customClasses="product-item" class="border">
        <div class="d-flex flex-column">
            <div class="d-flex flex-direction-row">
                <v-text-field color="warning" v-model="coupon" :rules="requireRule" required :label="$t('message.couponCode')" solo :disabled="loading || coupon_percent > 0"></v-text-field>
                <v-btn color="warning" height="48px" class="ml-2" @click="applyCoupon" :disabled="coupon_percent > 0">{{ $t("message.apply") }}</v-btn>
            </div>
            <h5 class="text-purple">
                {{
            cart.length == 1
              ? `${$t("message.thereIs")} 1 ${$t("message.item")}`
              : `${$t("message.thereAre")} ${cart.length} ${$t(
                  "message.items"
                )}`
          }}
            </h5>
            <v-row>
                <v-col cols="5">
                    <h6 class="text-purple item-title">{{ $t("message.name") }}</h6>
                </v-col>
                <v-col cols="2">
                    <h6 class="text-purple item-title">{{ $t("message.quantity") }}</h6>
                </v-col>
                <v-col cols="2">
                    <h6 class="text-purple item-title">{{ $t("message.price") }}</h6>
                </v-col>
                <v-col cols="3">
                    <h6 class="text-purple item-title">{{ $t("message.total") }}</h6>
                </v-col>
            </v-row>
            <div v-for="(product, index) in cart" :key="`${index}_cart`" class="mt-2">
                <v-row class="align-items-center">
                    <v-col cols="5">
                        <h6 class="text-purple item-title">
                            {{
                  product[selectedLocale.locale == "en" ? "en_name" : "ar_name"]
                }}
                        </h6>
                    </v-col>
                    <v-col cols="2">
                        <h6 class="text-purple item-title">{{ product.quantity }}</h6>
                    </v-col>
                    <v-col cols="2">
                        <h6 class="text-purple item-title">{{ product.price }}</h6>
                    </v-col>
                    <v-col cols="3">
                        <h6 class="text-purple item-title">
                            {{ $t("message.currency") }}
                            {{ (product.price * product.quantity).toFixed(2) }}
                        </h6>
                    </v-col>
                </v-row>
            </div>
            <v-divider />
            <v-row class="align-items-center">
                <v-col cols="9">
                    <h6 class="text-purple item-title">
                        {{ $t("message.subTotal") }}
                    </h6>
                </v-col>
                <v-col cols="3">
                    <h6 class="text-purple item-title">
                        {{ $t("message.currency") }} {{ getSubTotal }}
                    </h6>
                </v-col>
            </v-row>
            <v-row class="align-items-center">
                <v-col cols="9">
                    <h6 class="text-purple item-title">
                        {{ $t("message.tax") }}
                    </h6>
                </v-col>
                <v-col cols="3">
                    <h6 class="text-purple item-title">
                        {{ $t("message.currency") }} {{ getTax }}
                    </h6>
                </v-col>
            </v-row>
            <v-row class="align-items-center">
                <v-col cols="9">
                    <h6 class="text-purple item-title">
                        {{ $t("message.coupons") }}
                    </h6>
                </v-col>
                <v-col cols="3">
                    <h6 class="text-purple item-title">
                        - {{ $t("message.currency") }} {{ getCoupons }}
                    </h6>
                </v-col>
            </v-row>
            <v-row class="align-items-center">
                <v-col cols="9">
                    <h6 class="text-purple item-title">
                        {{ $t("message.total") }}
                    </h6>
                </v-col>
                <v-col cols="3">
                    <h6 class="text-purple item-title">
                        {{ $t("message.currency") }} {{ getTotal }}
                    </h6>
                </v-col>
            </v-row>
            <div class="mt-5">
                <v-btn block class="checkout-button" @click="checkOut" :loading="loading" :disabled="loading">{{ $t("message.checkout") }}</v-btn>
            </div>
        </div>
    </app-card>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import appConfig from "Constants/AppConfig";
import Vue from "vue";
import api from "Api";
import CardForm from "./CreditCard/CardForm";

export default {
    components: {
        CardForm,
    },
    data() {
        return {
            loading: false,
            baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
            coupon: "",
            coupon_percent: 0,
            requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
            formData: {
                cardName: "",
                cardNumber: "",
                cardMonth: "",
                cardYear: "",
                cardCvv: "",
            },
            dialog: false,
        };
    },
    computed: {
        ...mapGetters(["cart", "getUser", "selectedLocale"]),

        getSubTotal() {
            let total = 0;
            this.cart.forEach((element) => {
                total += element.price * element.quantity;
            });
            total = total.toFixed(2);
            return total;
        },

        getTax() {
            let total = 0;
            this.cart.forEach((element) => {
                total += (element.price * element.quantity * element.tax) / 100;
            });
            total = total.toFixed(2);
            return total;
        },

        getCoupons() {
            if (this.coupon_percent == 0) {
                return parseFloat(0).toFixed(2);
            } else {
                return parseFloat(
                    (this.getSubTotal * this.coupon_percent) / 100
                ).toFixed(2);
            }
        },

        getTotal() {
            let total = 0;
            total = (
                parseFloat(this.getSubTotal) +
                parseFloat(this.getTax) -
                parseFloat(this.getCoupons)
            ).toFixed(2);
            return total;
        },
    },
    methods: {
        checkOut() {
            if (this.getUser == null) {
                Vue.notify({
                    group: "center",
                    type: "error",
                    text: this.$t("message.youNeedToLoginFirst"),
                });
            } else {
                this.getProductSession();
            }
        },
        applyCoupon() {
            if (this.getUser == null) {
                Vue.notify({
                    group: "center",
                    type: "error",
                    text: this.$t("message.youNeedToLoginFirst"),
                });
                return;
            }
            if (this.coupon == "") {
                return;
            }
            this.loading = true;
            api
                .post(
                    `checkCoupon`,
                    JSON.stringify({
                        coupon: this.coupon,
                        type: "product"
                    }), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getUser.token}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.data.success) {
                        this.coupon_percent = response.data.data;
                        Vue.notify({
                            group: "center",
                            type: "success",
                            text: this.$t("message.couponApplied"),
                        });
                    } else {
                        Vue.notify({
                            group: "center",
                            type: "error",
                            text: this.$t("message.invalidCoupon"),
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        getProductSession() {
            let model = {
                cancel_url: `${this.baseUrl}carts//2`,
                success_url: `${this.baseUrl}carts/3`,
                carts: this.cart,
                coupon: this.coupon_percent > 0 ? this.coupon : "",
                type: "product",
                lang: this.selectedLocale.locale == "ar" ? "ar" : "en",
            }

            this.loading = true;
            api
                .post(`getProductSession`, JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        let session_id = response.data.data;
                        let url = "";
                        if (appConfig.payment_test) {
                            url = "https://uatcheckout.thawani.om/pay/"
                        } else {
                            url = "https://checkout.thawani.om/pay/"
                        }
                        window.location.href = `${url}${session_id}?key=${appConfig.payment_public_key}`
                    } else {
                        Vue.notify({
                            group: "center",
                            type: "error",
                            text: this.$t("message.sessionError"),
                        });
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="scss">
@import "./CreditCard/style.scss";
</style>
