<template>
<div>
    <page-title-bar @actionClick="dialog = true"></page-title-bar>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid grid-list-xl p-5>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="coupons" v-bind:search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`service${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ item.code }}
                                </td>
                                <td>
                                    {{ item.description }}
                                </td>
                                <td>
                                    {{ item.percent }}
                                </td>
                                <td>
                                    {{ item.type }}
                                </td>
                                <td>
                                    {{ item.expire }}
                                </td>

                                <td>
                                    <v-btn v-if="item.available == 1" class="ma-2" color="primary" @click="edit(item)">{{ $t("message.edit")}}</v-btn>
                                    <v-btn class="ma-2" color="error" v-if="item.available == 1" @click="deleteCoupon(item)">{{ $t("message.delete") }}</v-btn>
                                    <v-badge :value="false" class="p-2 info" v-if="item.available == 0">{{ $t('message.used') }}</v-badge>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </app-card>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                {{ $t("message.coupons") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <v-text-field :label="$t('message.code')" v-model="model.code" :rules="requireRule" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :label="$t('message.description')" v-model="model.description" :rules="requireRule" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :label="$t('message.percent')" v-model="model.percent" :rules="requireRule" required type="number"></v-text-field>
                    </v-row>
                    <v-row>
                        <v-select :label="$t('message.vendor')" v-model="model.type" item-value="id" :items="types" :rules="requireRule" required></v-select>
                    </v-row>
                    <v-row>
                        <v-menu ref="expire_date" :close-on-content-click="false" transition="scale-transition" v-model="expireMenu" offset-y :nudge-right="40" min-width="290px" :return-value.sync="model.expire">
                            <template v-slot:activator="{ on }">
                                <v-text-field v-on="on" :label="$t('message.expireDate')" v-model="model.expire" prepend-icon="event" readonly :rules="requireRule" required></v-text-field>
                            </template>
                            <v-date-picker v-model="model.expire" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="expireMenu = false">Cancel</v-btn>
                                <v-btn color="warning" @click="$refs.expire_date.save(model.expire)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="spacer"></div>
                <v-btn color="info" @click.stop="save" :disabled="!valid || loading" :loading="loading">{{ $t("message.save") }}</v-btn>
                <v-btn color="secondary" @click.stop="cancel">{{
            $t("message.cancel")
          }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import api from "Api";
import Vue from "vue";
import appConfig from "Constants/AppConfig";
import Bookings from "../Bookings/Bookings.vue";

export default {
    components: {
        Bookings
    },
    data: function () {
        return {
            loading: false,
            valid: false,
            search: "",
            baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
            requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
            dialog: false,
            headers: [{
                    text: this.$t("message.no"),
                },
                {
                    text: this.$t("message.code"),
                    value: "code",
                },
                {
                    text: this.$t("message.description"),
                    value: "description",
                },
                {
                    text: this.$t("message.percent"),
                    value: "percent",
                },
                {
                    text: this.$t("message.type"),
                    value: "type",
                },
                {
                    text: this.$t("message.expireDate"),
                    value: "expire",
                },
                {
                    text: this.$t("message.settings"),
                },
            ],
            model: {
                code: "",
                description: "",
                percent: 10,
                type: "cart",
                expire: null,
                available: true,
                id: -1,
            },
            coupons: [],
            types: ["cart", "product", "service"],
            expireMenu: false,
        };
    },
    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
    },

    methods: {
        save() {
            this.loading = true;
            api
                .post("addCoupon", JSON.stringify(this.model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.dialog = false;
                    } else {
                        Vue.notify({
                            group: "center",
                            type: "error",
                            text: this.$t("message.registerFailed"),
                        });
                    }
                    this.cancel();
                    this.getCoupons();
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

        cancel() {
            this.model = {
                code: "",
                description: "",
                percent: 10,
                type: "cart",
                expire: null,
                available: true,
                id: -1,
            };
            this.dialog = false;
        },

        getCoupons() {
            this.loading = true;
            api
                .get("getCoupons", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.coupons = response.data.data;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        edit(item) {
            this.model.id = item.id;
            this.model.code = item.code;
            this.model.description = item.description;
            this.model.type = item.percent;
            this.model.type = item.type;
            this.model.expire = item.expire;
            this.dialog = true;
        },

        deleteCoupon(item) {
            this.loading = true;
            api
                .post("deleteCoupon", JSON.stringify({
                    id: item.id
                }), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    this.getCoupons();
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },

    mounted() {
        this.getCoupons();
    },

    beforeMount() {},
};
</script>
