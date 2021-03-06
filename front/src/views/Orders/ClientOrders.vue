<template>
<div>
    <app-section-loader :status="loading"> </app-section-loader>
    <v-container fluid grid-list-xl py-0>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="orders" v-bind:search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`ordering${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <a :href="`${baseUrl}${item.invoice}`" target="_blank">{{$t("message.invoice")}}</a>
                                </td>
                                <td>{{item.created_at}}</td>
                                <td>
                                    <p class="m-0" v-for="(cart, index) in item.carts" :key="`${index}item`">
                                        {{cart[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}}({{cart.quantity}})
                                    </p>
                                </td>
                                <td>
                                    {{ $t("message.currency") }}
                                    {{ parseFloat(item.amount).toFixed(2) }}
                                </td>
                                <td>
                                    <v-badge :value="false" class="p-2" :class="{error: item.payment != 'paid', success: item.payment == 'paid'}">{{ item.payment_status }}</v-badge>
                                </td>
                                <td>
                                    <v-badge :value="false" class="p-2" :class="{info:item.state == 'delivered', error:item.state == 'pending' || item.state == 'rejected'}">{{item.state}}</v-badge>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </app-card>
        </v-row>
    </v-container>
</div>
</template>

<script>
import appConfig from "Constants/AppConfig";
import {
    mapGetters
} from "vuex";
import api from "Api";
import Vue from "vue";
export default {
    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
    },
    data: function () {
        return {
            loading: false,
            orders: [],
            search: "",
            baseUrl: appConfig.baseUrl,
            headers: [{
                    text: this.$t("message.no"),
                    value: "no",
                },
                {
                    text: this.$t("message.invoice"),
                    value: "invoice",
                },
                {
                    text: this.$t("message.date"),
                    value: "created_at",
                },
                {
                    text: this.$t("message.item"),
                    value: "carts",
                },
                {
                    text: this.$t("message.amount"),
                    value: "amount",
                },
                {
                    text: this.$t("message.payment"),
                    value: "payment_status",
                },
                {
                    text: this.$t("message.state"),
                },
            ],
        };
    },
    methods: {
        getMyOrders() {
            this.loading = true;
            api
                .get("getMyOrders", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        let orders = response.data.data;
                        this.orders = orders;
                    }
                })
                .catch((error) => {})
                .finally(() => {
                    this.loading = false;
                });
        },

    },
    mounted() {},
    beforeMount() {
        this.getMyOrders();
    },
};
</script>
