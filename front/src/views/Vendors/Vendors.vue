<template>
<div>
    <page-title-bar @actionClick="addNew"></page-title-bar>
    <v-container fluid grid-list-xl py-0>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title>
                    <v-select :label="$t('message.category')" :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="category_id" item-value="id" :items="categories" :rules="requireRule" required :disabled="all"></v-select>
                    <v-checkbox class="mx-4" :label="$t('message.showAll')" v-model="all"></v-checkbox>
                    <v-btn color="info" @click.stop="manage" :disabled="loading" :loading="loading">{{ $t("message.manage") }}</v-btn>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="getFilterVendors" v-bind:search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`vendor${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{item.category[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}}
                                </td>
                                <td>
                                    {{item.city[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}}
                                </td>
                                <td>{{ item.en_name }}</td>
                                <td>{{ item.ar_name }}</td>
                                <td>
                                    <v-chip class="ma-2" :color="item.active ? 'success' : 'error'" text-color="white">
                                        <v-icon>{{ item.active ? "check_circle" : "zmdi-close-circle"}}</v-icon>
                                        <!-- {{ item.active ? $t("actived") : $t("disabled") }} -->
                                    </v-chip>
                                </td>
                                <td>
                                    <v-btn class="ma-2" color="primary" @click="edit(item)">{{ $t("message.edit")}}</v-btn>
                                    <v-btn class="ma-2" color="error" @click="askDelete(item)">{{ $t("message.delete") }}</v-btn>
                                    <v-btn class="ma-2" color="success" @click="genderateLink(item)">{{ $t("message.generate") }}</v-btn>
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
                {{ $t("message.vendor") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-select :label="$t('message.category')" :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="category_id" item-value="id" :items="categories" :rules="requireRule" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select :label="$t('message.city')" :item-text=" selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'" v-model="city_id" :items="cities" item-value="id" :rules="requireRule" required></v-select>
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
                            <v-text-field :label="$t('message.ratings')" v-model="rating" :rules="numberRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-checkbox :label="$t('message.recommended')" v-model="recommended"></v-checkbox>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.lat')" v-model="marker.position.lat" :rules="requireRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.lng')" v-model="marker.position.lng" :rules="requireRule" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.enAddress')" v-model="en_address" :rules="requireRule" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.arAddress')" v-model="ar_address" :rules="requireRule" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="align-items-center">
                        <v-col cols="12" sm="6">
                            <v-radio-group v-model="active" row class="pt-0" :label="$t('message.active')">
                                <v-radio color="primary" :label="$t('message.yes')" :value="true"></v-radio>
                                <v-radio color="primary" :label="$t('message.no')" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field :label="$t('message.phone')" v-model="phone" :rules="requireRule" required></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <gmap-autocomplete class="py-3 input form-control" @place_changed="setPlace">
                        </gmap-autocomplete>
                        <gmap-map :center="center" :zoom="9" ref="mapRef" style="width: 100%; height: 400px" @click="handleMapClick" :options="mapOptions">
                            <gmap-marker :position="{lat: parseFloat(marker.position.lat), lng: parseFloat(marker.position.lng)}" :clickable="true">
                            </gmap-marker>
                        </gmap-map>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="3" v-for="(item, index) in images" :key="`image${index}`">
                            <v-img @click="chooseFiles(index)" class="my-2" :src="item.image ? item.image : '/static/img/gallery.png'" aspect-ratio="1" contain></v-img>
                        </v-col>
                        <input id="fileUpload" type="file" hidden :accept="['.jpg', '.jpeg', '.gif', '.png']" @change="uploadImageFile" />
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="spacer"></div>
                <v-btn color="info" @click.stop="save" :disabled="!valid || loading" :loading="loading">{{ $t("message.save") }}</v-btn>
                <v-btn color="secondary" @click.stop="cancel">{{ $t("message.cancel")}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" max-width="500">
        <v-card>
            <v-card-title class="headline">{{$t("message.deleteItemTitle")}}</v-card-title>
            <v-card-text>{{ $t("message.deleteItemContent") }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="warning" text="text" @click.stop="deleteVendor" :disabled="loading">Delete</v-btn>
                <v-btn color="error" text="text" @click.stop="deleteDialog = false" :disabled="loading">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="manageDialog" fullscreen transition="dialog-bottom-transition" overlay="false" scrollable>
        <v-card>
            <v-toolbar color="info" dark class="dialog-toolbar mb-6">
                <v-btn icon @click.native="manageDialog = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ $t("message.manageVendors") }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="saveVendorRole" dark class="mr-5" :disabled="loading">
                    {{ $t("message.save") }}
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <v-row class="">
                    <v-col xl="2" lg="3" md="3" sm="0" cols="0" class="chat-sidebar pa-0 pl-3">
                        <user-sidebar :baseUrl="baseUrl" :users="providers" @openVendor="openVendor"></user-sidebar>
                    </v-col>
                    <v-col xl="10" lg="9" md="9" sm="12" cols="12" class="chat-main pa-0" v-if="selectedUser != null">
                        <vendor-area :user="selectedUser" :vendors="vendors"></vendor-area>
                    </v-col>
                </v-row>
            </v-card-text>
            <div style="flex: 1 1 auto"></div>
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
import axios from "axios";
import UserSidebar from "./components/UserSidebar";
import VendorArea from "./components/VendorArea";
export default {
    components: {
        UserSidebar,
        VendorArea
    },
    data: function () {
        return {
            all: true,
            loading: false,
            dialog: false,
            valid: false,
            vendors: [],
            categories: [],
            cities: [],
            search: "",
            field2: null,

            id: -1,
            category_id: -1,
            city_id: 26,
            en_name: "",
            ar_name: "",
            en_address: "",
            ar_address: "",
            rating: "0",
            recommended: false,
            active: true,
            phone: "",
            images: [{
                    id: -1,
                    image: null
                },
                {
                    id: -1,
                    image: null
                },
                {
                    id: -1,
                    image: null
                },
                {
                    id: -1,
                    image: null
                },
            ],
            baseUrl: appConfig.baseUrl,
            requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
            numberRule: [
                (v) => !!v || this.$t("message.fieldRequired"),
                (v) =>
                (parseFloat(v) >= 0 && parseFloat(v) <= 5) ||
                this.$t("message.ratingRule"),
            ],

            center: {
                lat: 23.614328,
                lng: 58.545284
            },
            marker: {
                position: {
                    lat: 23.614328,
                    lng: 58.545284
                },
            },
            mapOptions: {
                disableDefaultUI: true,
            },
            index: -1,

            headers: [{
                    text: this.$t("message.no"),
                    value: "no",
                    align: "center",
                },
                {
                    text: this.$t("message.categoryName"),
                    value: "category",
                    align: "center",
                },
                {
                    text: this.$t("message.cityName"),
                    value: "city",
                    align: "center",
                },
                {
                    text: this.$t("message.enName"),
                    value: "en_name",
                    align: "center",
                },
                {
                    text: this.$t("message.arName"),
                    value: "ar_name",
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

            selectedItem: null,
            deleteDialog: false,

            manageDialog: false,
            providers: [],
            selectedUser: null,
        };
    },
    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
        getFilterVendors() {
            if (this.all || this.category_id == -1) {
                return this.vendors;
            } else {
                return this.vendors.filter(
                    (vendor) => vendor.category_id == this.category_id
                );
            }
        },
    },
    methods: {
        getCities() {
            this.loading = true;
            api
                .get("getCities", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.cities = response.data.data;
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

        getVendors() {
            this.loading = true;
            api
                .get("getVendors", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.categories = response.data.data.categories;
                        this.vendors = response.data.data.vendors;
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

        getProviders() {
            this.loading = true;
            api
                .get("getProviders", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        let providers = response.data.data.users;
                        providers.forEach((element) => {
                            element.selected = false;
                        });
                        this.providers = providers;
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

        handleMapClick(e) {
            this.marker.position = {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            };
            //   this.center = { lat: e.latLng.lat(), lng: e.latLng.lng() };
            this.$refs.mapRef.panTo(this.marker.position);
            //
            this.loading = true;
            axios
                .get(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.marker.position.lat},${this.marker.position.lng}&key=${appConfig.googleApiKey}`
                )
                .then((response) => {
                    this.loading = false;
                    this.en_address = response.data.results[0].formatted_address;
                });
        },

        chooseFiles(i) {
            this.index = i;
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
                this.images[this.index].image = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        save() {
            if (this.valid && this.category_id != -1 && this.city_id != -1) {
                let model = {
                    id: this.id,
                    category_id: this.category_id,
                    city_id: this.city_id,
                    en_name: this.en_name,
                    ar_name: this.ar_name,
                    en_address: this.en_address,
                    ar_address: this.ar_address,
                    lat: this.marker.position.lat,
                    lng: this.marker.position.lng,
                    rating: this.rating,
                    recommended: this.recommended,
                    active: this.active,
                    images: this.images,
                    phone: this.phone,

                };

                this.loading = true;
                api
                    .post("addVendor", JSON.stringify(model), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getUser.token}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.cancel();
                            this.getVendors();
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
            this.category_id = -1;
            this.en_name = "";
            this.ar_name = "";
            this.en_address = "";
            this.ar_address = "";
            this.rating = "0";
            this.recommended = false;
            this.phone = "";
            this.active = true;
            this.images = [{
                    id: -1,
                    image: null
                },
                {
                    id: -1,
                    image: null
                },
                {
                    id: -1,
                    image: null
                },
                {
                    id: -1,
                    image: null
                },
            ];
            this.dialog = false;
        },

        askDelete(item) {
            this.selectedItem = item;
            this.deleteDialog = true;
        },

        deleteVendor() {
            this.loading = true;
            let model = {
                id: this.selectedItem.id,
            };
            api
                .post("deleteVendor", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.getVendors();
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
            this.category_id = item.category_id;
            this.city_id = item.city_id;
            this.en_name = item.en_name;
            this.ar_name = item.ar_name;
            this.en_address = item.en_address;
            this.ar_address = item.ar_address;
            this.marker.position.lat = parseFloat(item.lat);
            this.marker.position.lng = parseFloat(item.lng);
            this.rating = item.rating;
            this.recommended = item.recommended == 1;
            this.active = item.active == 1;
            this.phone = item.phone;
            this.images = JSON.parse(JSON.stringify(item.images));
            for (let index = 0; index < 4 - item.images.length; index++) {
                this.images.push({
                    id: -1,
                    image: null
                });
            }
            this.images.forEach((image) => {
                if (image.image) {
                    image.image = this.baseUrl + "uploads/vendors/" + image.image;
                }
            });

            this.dialog = true;
        },

        setPlace(addressData) {
            this.center.lat = addressData.geometry.location.lat();
            this.center.lng = addressData.geometry.location.lng();
            this.marker.position.lat = addressData.geometry.location.lat();
            this.marker.position.lng = addressData.geometry.location.lng();
            this.en_address = addressData.formatted_address;
        },

        genderateLink(item) {
            console.log(item);
        },

        manage() {
            this.manageDialog = true;
        },

        saveVendorRole() {
            var new_array = this.providers.map(function (value) {
                return {
                    id: value.id,
                    roles: value.roles
                };
            });
            var model = {
                roles: new_array
            }
            this.loading = true;
            api
                .post("saveVendorRole", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.manageDialog = false
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
        },

        openVendor(user) {
            this.selectedUser = user;
        },
    },

    mounted() {
        this.getCities();
        this.getProviders();
        this.getVendors();
    },

    beforeMount() {
        try {
            this.$getLocation({
                    enableHighAccuracy: false, //defaults to false
                    timeout: Infinity, //defaults to Infinity
                    maximumAge: 0, //defaults to 0
                },
                false
            ).then((coordinates) => {
                this.center.lat = coordinates.lat;
                this.center.lng = coordinates.lng;
                this.marker.position.lat = coordinates.lat;
                this.marker.position.lng = coordinates.lng;
            });
        } catch (error) {
            console.log("No permission");
        }
    },
};
</script>
