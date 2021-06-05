<template>
<div>
    <page-title-bar @actionClick="addNew"></page-title-bar>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid grid-list-xl py-0>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title>
                    <v-select :label="$t('message.department')" :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="department_id" item-value="id" :items="departments" :rules="requireRule" required :disabled="all"></v-select>
                    <v-checkbox class="mx-4" :label="$t('message.showAll')" v-model="all"></v-checkbox>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="getFilteredProducts" v-bind:search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`product${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ `${baseUrl}product/${item.id}` }}
                                </td>
                                <td>
                                    {{
                      item.department.vendor[
                        selectedLocale.locale == "en" ? "en_name" : "ar_name"
                      ]
                    }}
                                </td>
                                <td>
                                    {{
                      item.department[
                        selectedLocale.locale == "en" ? "en_name" : "ar_name"
                      ]
                    }}
                                </td>
                                <td>
                                    {{
                      selectedLocale.locale == "en"
                        ? item.en_name
                        : item.ar_name
                    }}
                                </td>
                                <td>
                                    <v-img class="my-2" :src="`${baseUrl}uploads/products/${item.image}`" aspect-ratio="2"></v-img>
                                </td>
                                <td>
                                    <v-chip class="ma-2" :color="item.active ? 'success' : 'error'" text-color="white">
                                        <v-icon>{{
                        item.active ? "check_circle" : "zmdi-close-circle"
                      }}</v-icon>
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn class="ma-2" color="primary" @click="edit(item)">{{
                      $t("message.edit")
                    }}</v-btn>
                                    <v-btn class="ma-2" color="error" @click="askDelete(item)">{{ $t("message.delete") }}</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-data-table>
            </app-card>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="900px">
        <v-card>
            <v-card-title>
                {{ $t("message.product") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select :label="$t('message.department')" :item-text="
                    selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'
                  " v-model="department_id" :items="departments" item-value="id" :rules="requireRule" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-checkbox :label="$t('message.recommended')" v-model="recommended"></v-checkbox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.enName')" v-model="en_name" :rules="requireRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.arName')" v-model="ar_name" :rules="requireRule" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.enDescription')" v-model="en_description" :rules="requireRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.arDescription')" v-model="ar_description" :rules="requireRule" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-text-field :label="$t('message.price')" v-model="price" :rules="requireRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field :label="`${$t('message.discount')}(%)`" v-model="discount_price" :rules="requireRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field :label="`${$t('message.tax')}(%)`" v-model="tax" :rules="requireRule" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row style="align-items: center">
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.ratings')" v-model="rating" :rules="numberRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-radio-group v-model="active" row class="pt-0" :label="$t('message.active')">
                                <v-radio color="primary" :label="$t('message.yes')" :value="true"></v-radio>
                                <v-radio color="primary" :label="$t('message.no')" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-img @click="chooseFiles" class="my-2" :src="image ? image : '/static/img/gallery.png'" aspect-ratio="1" style="height: 200px" contain></v-img>
                        <input id="fileUpload" type="file" hidden :accept="['.jpg', '.jpeg', '.gif', '.png']" @change="uploadImageFile" />
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="spacer"></div>
                <v-btn color="info" @click.stop="save" :disabled="!valid || loading || !image" :loading="loading">{{ $t("message.save") }}</v-btn>
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
                <v-btn color="warning" text="text" @click.stop="deleteProduct" :disabled="loading">Delete</v-btn>
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
            departments: [],
            products: [],

            requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
            startingMenu: false,
            endingMenu: false,
            startingTimeMenu: false,
            endingTimeMenu: false,
            numberRule: [
                (v) => !!v || this.$t("message.fieldRequired"),
                (v) =>
                (parseFloat(v) >= 0 && parseFloat(v) <= 5) ||
                this.$t("message.ratingRule"),
            ],

            id: -1,
            department_id: -1,
            en_name: "",
            ar_name: "",
            en_description: "",
            ar_description: "",
            recommended: true,
            rating: "0",
            image: null,
            active: true,
            tax: "5",
            price: "0",
            discount_price: "0",

            headers: [{
                    text: this.$t("message.no"),
                    value: "no",
                    align: "center",
                },
                {
                    text: this.$t("message.url"),
                    value: "url",
                    align: "center",
                },
                {
                    text: this.$t("message.vendorName"),
                    value: "vendor.en_name",
                    align: "center",
                },
                {
                    text: this.$t("message.departmentName"),
                    value: "department",
                    align: "center",
                },
                {
                    text: this.$t("message.name"),
                    value: "en_name",
                    align: "center",
                },
                {
                    text: this.$t("message.image"),
                    value: "image",
                    align: "center",
                },
                {
                    text: this.$t("message.active"),
                    value: "active",
                    align: "center",
                },
                {
                    text: this.$t("message.settings"),
                    value: "settings",
                    align: "center",
                },
            ],

   
            baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
            selectedItem: null,
            deleteDialog: false,
        };
    },

    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
        getFilteredProducts() {
            if (this.department_id == -1 || this.all) {
                return this.products;
            } else {
                return this.products.filter(
                    (product) => product.department_id == this.department_id
                );
            }
        },
    },

    methods: {
        getProducts() {
            this.loading = true;
            api
                .get("getProducts", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.products = response.data.data.products;
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
            if (this.valid && this.department_id != -1 && this.image != null) {
                let model = {
                    id: this.id,
                    department_id: this.department_id,
                    en_name: this.en_name,
                    ar_name: this.ar_name,
                    en_description: this.en_description,
                    ar_description: this.ar_description,
                    recommended: this.recommended,
                    rating: this.rating,
                    image: this.image,
                    tax: parseFloat(this.tax),
                    price: parseFloat(this.price),
                    discount_price: parseFloat(this.discount_price),
                    active: this.active,
                };
                this.loading = true;
                api
                    .post("addProduct", JSON.stringify(model), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getUser.token}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.cancel();
                            this.getProducts();
                        } else {
                            Vue.notify({
                                group: "loggedIn",
                                type: "error",
                                text: this.$t("message.registerFailed"),
                            });
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
            this.department_id = -1;
            this.en_name = "";
            this.ar_name = "";
            this.en_description = "";
            this.ar_description = "";
            this.rating = "";
            this.recommended = true;
            this.image = null;
            this.active = true;
            this.tax = "5";
            this.price = "0";
            this.discount_price = "0";
            this.dialog = false;
        },
        chooseFiles() {
            document.getElementById("fileUpload").click();
        },

        uploadImageFile(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                return;
            }
            var file = files[0];
            const fileType = file["type"];
            const validImageTypes = [
                "image/gif",
                "image/jpeg",
                "image/png",
                "image/jpg",
            ];
            if (!validImageTypes.includes(fileType)) {
                Vue.notify({
                    group: "loggedIn",
                    type: "error",
                    text: this.$t("message.selectValidImage"),
                });
                return;
            }
            this.createImage(file);
        },

        createImage(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        edit(item) {
            this.id = item.id;
            this.department_id = item.department_id;
            this.en_name = item.en_name;
            this.ar_name = item.ar_name;
            this.en_description = item.en_description;
            this.ar_description = item.ar_description;
            this.tax = item.tax;
            this.price = item.price;
            this.discount_price = item.discount_price;
            this.rating = item.rating + "";
            this.recommended = item.recommended == 1;
            this.active = item.active == 1;
            this.image = this.baseUrl + "uploads/products/" + item.image;
            this.dialog = true;
        },

        askDelete(item) {
            this.selectedItem = item;
            this.deleteDialog = true;
        },

        deleteProduct() {
            this.loading = true;
            let model = {
                id: this.selectedItem.id,
            };
            api
                .post("deleteProduct", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.getProducts();
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
    },

    mounted() {
        this.getProducts();
    },
};
</script>
