<template>
<div>
    <page-title-bar @actionClick="addNew"></page-title-bar>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid grid-list-xl py-0>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title>
                    <v-select :label="$t('message.vendor')" :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="vendor_id" item-value="id" :items="vendors" :rules="requireRule" required :disabled="all"></v-select>
                    <v-checkbox class="mx-4" :label="$t('message.showAll')" v-model="all"></v-checkbox>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="getFilteredDepartments" v-bind:search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`department${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{item.vendor[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}}
                                </td>
                                <td>{{ item.en_name }}</td>
                                <td>{{ item.ar_name }}</td>
                                <td>
                                    <v-chip class="ma-2" :color="item.active ? 'success' : 'error'" text-color="white">
                                        <v-icon>{{item.active ? "check_circle" : "zmdi-close-circle"}}</v-icon>
                                        <!-- {{ item.active ? $t("actived") : $t("disabled") }} -->
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn class="ma-2" color="primary" @click="edit(item)">{{ $t("message.edit")}}</v-btn>
                                    <v-btn class="ma-2" color="error" @click="askDelete(item)">{{ $t("message.delete") }}</v-btn>
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
                {{ $t("message.department") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <v-select :label="$t('message.vendor')" :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="vendor_id" item-value="id" :items="vendors" :rules="requireRule" required></v-select>
                    </v-row>
                    <v-row>
                        <v-text-field :label="$t('message.enName')" v-model="en_name" :rules="requireRule" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field :label="$t('message.arName')" v-model="ar_name" :rules="requireRule" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-radio-group v-model="active" row class="pt-0" :label="$t('message.active')">
                            <v-radio color="primary" :label="$t('message.yes')" :value="true"></v-radio>
                            <v-radio color="primary" :label="$t('message.no')" :value="false"></v-radio>
                        </v-radio-group>
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

    <v-dialog v-model="deleteDialog" max-width="500">
        <v-card>
            <v-card-title class="headline">{{
          $t("message.deleteItemTitle")
        }}</v-card-title>
            <v-card-text>{{ $t("message.deleteItemContent") }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="warning" text="text" @click.stop="deleteDepartment" :disabled="loading">Delete</v-btn>
                <v-btn color="error" text="text" @click.stop="deleteDialog = false" :disabled="loading">Cancel</v-btn>
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

export default {
    data: function () {
        return {
            loading: false,
            dialog: false,
            valid: false,
            search: "",
            all: true,
            vendors: [],
            departments: [],
            baseUrl: appConfig.baseUrl,
            headers: [{
                    text: this.$t("message.no"),
                    value: "no",
                },
                {
                    text: this.$t("message.vendorName"),
                    value: "vendor",
                },
                {
                    text: this.$t("message.enName"),
                    value: "en_name",
                },
                {
                    text: this.$t("message.arName"),
                    value: "ar_name",
                },
                {
                    text: this.$t("message.active"),
                    value: "active",
                },
                {
                    text: this.$t("message.settings"),
                    value: "settings",
                },
            ],
            requireRule: [(v) => !!v || this.$t("message.fieldRequired")],

            id: -1,
            vendor_id: -1,
            en_name: "",
            ar_name: "",
            active: true,

            selectedItem: null,
            deleteDialog: false,
        };
    },

    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
        getFilteredDepartments() {
            if (this.all || this.vendor_id == -1) {
                return this.departments;
            } else {
                return this.departments.filter(
                    (department) => department.vendor_id == this.vendor_id
                );
            }
        },
    },

    methods: {
        getDepartMents() {
            this.loading = true;
            api
                .get("getDepartments", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.vendors = response.data.data.vendors;
                        this.departments = response.data.data.departments;
                    }
                })
                .catch((error) => {
                    Vue.notify({
                        group: "loggedIn",
                        type: "error",
                        text: error,
                    });
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        addNew() {
            this.dialog = true;
        },
        save() {
            if (this.valid && this.vendor_id != -1) {
                let model = {
                    id: this.id,
                    vendor_id: this.vendor_id,
                    en_name: this.en_name,
                    ar_name: this.ar_name,
                    active: this.active,
                };

                this.loading = true;
                api
                    .post("addDepartment", JSON.stringify(model), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getUser.token}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.cancel();
                            this.getDepartMents();
                        }
                    })
                    .catch((error) => {
                        Vue.notify({
                            group: "loggedIn",
                            type: "error",
                            text: error,
                        });
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        cancel() {
            this.id = -1;
            this.vendor_id = -1;
            this.en_name = "";
            this.ar_name = "";
            this.active = true;
            this.dialog = false;
        },

        askDelete(item) {
            this.selectedItem = item;
            this.deleteDialog = true;
        },

        deleteDepartment() {
            this.loading = true;
            let model = {
                id: this.selectedItem.id,
            };
            api
                .post("deleteDepartment", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.getDepartMents();
                    }
                })
                .catch((error) => {
                    Vue.notify({
                        group: "loggedIn",
                        type: "error",
                        text: error,
                    });
                })
                .finally(() => {
                    this.loading = false;
                    this.deleteDialog = false;
                    this.selectedItem = null;
                });
        },

        edit(item) {
            this.id = item.id;
            this.vendor_id = item.vendor_id;
            this.en_name = item.en_name;
            this.ar_name = item.ar_name;
            this.active = item.active == 1;
            this.dialog = true;
        },
    },

    mounted() {
        this.getDepartMents();
    },
};
</script>
