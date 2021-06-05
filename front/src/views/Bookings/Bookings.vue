<template>
<div>
    <app-section-loader :status="loading"> </app-section-loader>
    <v-container fluid grid-list-xl py-0>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title class="align-items-center">
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn icon class="" color="success">
                        <v-icon>favorite</v-icon>
                    </v-btn>
                     <v-btn icon class="mr-5" color="success">
                        <v-icon>favorite</v-icon>
                    </v-btn>
                    <div class="d-flex flex-direction-row align-items-center">
                        <h5>{{$t("message.total")}}</h5>
                        <h6> : {{$t("message.currency")}} {{getTotalPrice}}</h6>
                    </div>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="getFilteredBooking" v-bind:search="search" v-if="!loading">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`booking${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{item[selectedLocale.locale == "en" ? "vendor_en_name" : "vendor_ar_name"]}}
                                </td>
                                <td>
                                    <a :href="`${baseUrl}${item.invoice}`" target="_blank">{{$t("message.invoice")}}</a>
                                </td>
                                <td>
                                    {{item[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}}
                                </td>
                                <td>
                                    {{ item.date }}
                                </td>
                                <td>
                                    <p class="m-0" v-for="(time, index) in item.times" :key="`${index}item`">
                                        {{ time.from_time }} ~ {{ time.to_time }}
                                    </p>
                                </td>
                                <td>
                                    <p class="m-0">
                                        {{ item.full_name }}
                                    </p>
                                    <p class="m-0">
                                        {{item.phone}}
                                    </p>
                                </td>
                                <td>
                                    <p class="m-0">
                                        {{ item.worker_name }}
                                    </p>
                                </td>
                                <td>
                                    {{ $t("message.currency") }}
                                    {{ parseFloat(item.amount).toFixed(2) }}
                                </td>
                                <td>
                                    <div v-if="item.type == 'insurance'" class="d-flex flex-direction-row">
                                        <v-img @click="showImage(`${baseUrl}uploads/bookings/${item.image}`)" class="m-0" width="50" height="50" :src="`${baseUrl}uploads/bookings/${item.image}`"></v-img>
                                        <v-img @click="showImage(`${baseUrl}uploads/bookings/${item.image1}`)" class="m-0 ml-1" width="50" height="50" :src="`${baseUrl}uploads/bookings/${item.image1}`"></v-img>
                                    </div>
                                    <div v-else>
                                        <p style="text-transform: uppercase" class="m-0">{{ item.type }}</p>
                                    </div>
                                </td>
                                <td>
                                    <v-badge :value="false" class="p-2" :class="{error: item.payment_status != 'paid',success: item.payment_status == 'paid'}">{{ item.payment_status }}</v-badge>
                                    <div v-if="item.payment_status == 'paid'">
                                        <p style="text-transform: uppercase" class="m-0">{{item.etc}}</p>
                                    </div>
                                </td>
                                <td>
                                    <v-badge :value="false" class="p-2" :class="{info:item.state == 'confirmed' || item.state == 'completed',error:item.state == 'pending' || item.state == 'rejected'}">{{item.state}}</v-badge>
                                </td>
                                <td>
                                    <v-menu bottom left>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on">
                                                <v-icon>more_vert</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list style="cursor: pointer">
                                            <!--<<v-btn text block @click="view(item)">{{$t("message.view")}}</v-btn>!-->
                                            <!--<v-btn text block @click="edit(item)" class="mt-1">{{$t("message.edit")}}</v-btn>!-->
                                            <v-btn text block @click="confirmBooking(item)" class="mt-1" v-if="item.state == 'pending'">{{ $t("message.confirm") }}</v-btn>
                                            <v-btn text block @click="payBooking(item)" v-if="item.payment_status != 'paid' && item.state == 'confirmed'" class="mt-1">{{ $t("message.pay") }}</v-btn>
                                            <v-btn text block @click="rejectBooking(item)" v-if="item.state == 'pending'" class="mt-1">{{ $t("message.reject") }}</v-btn>
                                        </v-list>
                                    </v-menu>
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

        getFilteredBooking() {
            return this.bookings
        },

        getTotalPrice() {
            return "0.00"
        }
    },
    data: function () {
        return {
            loading: false,
            bookings: [],
            search: "",
            baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
            headers: [{
                    text: this.$t("message.no"),
                    value: "no",
                },
                {
                    text: this.$t("message.vendorName"),
                    value: "vendor_en_name",
                    align: "center",
                },
                {
                    text: this.$t("message.invoice"),
                    value: "invoice",
                },
                {
                    text: this.$t("message.service"),
                    value: "en_name",
                },
                {
                    text: this.$t("message.date"),
                    value: "date",
                },
                {
                    text: this.$t("message.times"),
                    value: "times",
                },
                {
                    text: this.$t("message.client"),
                    value: "full_name",
                },
                {
                    text: this.$t("message.worker"),
                    value: "worker_name",
                },
                {
                    text: this.$t("message.amount"),
                    value: "amount",
                },
                {
                    text: this.$t("message.type"),
                    value: "type",
                },
                {
                    text: this.$t("message.payment"),
                    value: "payment_status",
                },
                {
                    text: this.$t("message.state"),
                    value: "state",
                },
                {
                    text: this.$t("message.settings"),
                },
            ],
            selectedItem: {},
            imageUrl: "",
            dialog: false,
        };
    },
    methods: {
        getBookings() {
            this.loading = true;
            api
                .get("getBookings", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        let bookings = response.data.data;
                        bookings.forEach((element) => {
                            let times = element.times;
                            if (times != null) {
                                element.times = JSON.parse(times);
                            }
                        });
                        this.bookings = bookings;
                    }
                })
                .catch((error) => {})
                .finally(() => {
                    this.loading = false;
                });
        },
        view(item) {
            this.selectedItem = item;
            this.dialog = true;
        },
        edit(item) {
            this.selectedItem = item;
            this.dialog = true;
        },
        confirmBooking(item) {
            this.loading = true;
            api
                .post("confirmBooking", JSON.stringify({
                    id: item.id
                }), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {} else {
                        Vue.notify({
                            group: "center",
                            type: "error",
                            text: this.$t("message.alreadyRejectedOrCanceled"),
                        });
                    }
                    this.getBookings();
                })
                .catch((error) => {})
                .finally(() => {
                    // this.loading = false;
                });
        },
        payBooking(item) {
            this.loading = true;
            api
                .post("payBooking", JSON.stringify({
                    id: item.id
                }), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {} else {
                        Vue.notify({
                            group: "center",
                            type: "error",
                            text: this.$t("message.alreadyRejectedOrCanceled"),
                        });
                    }
                    this.getBookings();
                })
                .catch((error) => {})
                .finally(() => {
                    // this.loading = false;
                });
        },
        rejectBooking(item) {
            this.loading = true;
            api
                .post("rejectBooking", JSON.stringify({
                    id: item.id
                }), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {} else {
                        Vue.notify({
                            group: "center",
                            type: "error",
                            text: this.$t("message.alreadyRejectedOrCanceled"),
                        });
                    }
                    this.getBookings();
                })
                .catch((error) => {})
                .finally(() => {
                    // this.loading = false;
                });
        },
        showImage(url) {
            window.open(url, "_blank");
        }
    },
    mounted() {},
    beforeMount() {
        this.getBookings();
    },
};
</script>
