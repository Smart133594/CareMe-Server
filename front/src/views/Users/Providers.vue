<template>
<div>
    <page-title-bar @actionClick="addNew"></page-title-bar>
    <v-container fluid grid-list-xl py-0>
        <v-row>
            <app-card :fullBlock="true" colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-text-field append-icon="search" label="Search" single-line hide-details v-model="search">
                    </v-text-field>
                </v-card-title>
                <v-data-table v-bind:headers="headers" v-bind:items="providers" v-bind:search="search">
                    <template v-slot:body="{ items }">
                        <tbody>
                            <tr v-for="(item, index) in items" :key="`provider${item.id}`">
                                <td>{{ index + 1 }}</td>
                                <td>{{ item.first_name }}</td>
                                <td>{{ item.last_name }}</td>
                                <td>{{ item.phone }}</td>
                                <td>{{ item.email }}</td>
                                <td>
                                    <v-img class="my-2" :src="
                        item.avatar
                          ? `${baseUrl}uploads/avatars/${item.avatar}`
                          : '/static/avatars/male.png'
                      " aspect-ratio="2" contain></v-img>
                                </td>
                                <td>
                                    <v-chip class="ma-2" :color="item.active ? 'success' : 'error'">
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

    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                {{ $t("message.providers") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form v-model="valid">
                    <v-row>
                        <div class="user-image text-center mb-4">
                            <img @click="chooseFiles" :src="avatar ? avatar : '/static/avatars/male.png'" class="img-responsive rounded-circle" alt="user images" style="width: 100px; height: 100px" />
                            <input id="fileUpload" type="file" hidden :accept="['.jpg', '.jpeg', '.gif', '.png']" @change="uploadImageFile" />
                        </div>
                    </v-row>
                    <VuePhoneNumberInput v-model="phone" @update="updatePhone" required default-country-code="OM" :preferred-countries="['OM', 'US', 'DE']" />
                    <v-row class="mt-6">
                        <v-text-field v-model="first_name" :rules="requireRules" prepend-icon="perm_identity" :label="$t('message.firstName')" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="last_name" :rules="requireRules" prepend-icon="perm_identity" :label="$t('message.lastName')" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field v-model="email" :rules="emailRules" prepend-icon="mail" :label="$t('message.email')" required></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field label="Password" v-model="password" prepend-icon="ti-lock" :rules="requireRules" type="password" :disabled="id != -1" required></v-text-field>
                    </v-row>
                    <v-radio-group v-model="active" row class="pt-0" :label="$t('message.active')">
                        <v-radio color="primary" :label="$t('message.yes')" :value="true"></v-radio>
                        <v-radio color="primary" :label="$t('message.no')" :value="false"></v-radio>
                    </v-radio-group>
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
                <v-btn color="warning" text="text" @click.stop="deleteProvider" :disabled="loading">Delete</v-btn>
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
import Vue from "vue";
import api from "Api";
import appConfig from "Constants/AppConfig";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
    components: {
        VuePhoneNumberInput
    },
    data() {
        return {
            valid: false,
            dialog: false,
            search: "",
            phoneObject: null,

            id: -1,
            first_name: "",
            last_name: "",
            avatar: "",
            email: "",
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "E-mail must be valid",
            ],
            phone: "",
            password: "",
            active: true,

            requireRules: [(v) => !!v || this.$t("message.fieldRequired")],
            loading: false,

            headers: [{
                    text: this.$t("message.no"),
                    value: "no",
                },
                {
                    text: this.$t("message.firstName"),
                    value: "first_name",
                },
                {
                    text: this.$t("message.lastName"),
                    value: "last_name",
                },
                {
                    text: this.$t("message.phone"),
                    value: "phone",
                },
                {
                    text: this.$t("message.email"),
                    value: "email",
                },
                {
                    text: this.$t("message.image"),
                    value: "avatar",
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

            providers: [],
            baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
            deleteDialog: false,
            deleteItem: null,
            manageDialog: false,
        };
    },

    computed: {
        ...mapGetters(["getUser", "selectedLocale"]),
    },

    methods: {
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
                        this.providers = response.data.data.users;
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
            if (this.valid && this.phoneObject?.isValid) {
                this.loading = true;

                const model = {
                    id: this.id,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    phone: this.phoneObject.formattedNumber,
                    avatar: this.avatar,
                    password: this.password,
                    active: this.active,
                };
                api
                    .post("addProvider", JSON.stringify(model), {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.getUser.token}`,
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            this.dialog = false;
                            this.cancel();
                            this.getProviders();
                        } else {
                            Vue.notify({
                                group: "loggedIn",
                                type: "error",
                                text: this.$t("message.phoneOremailExist"),
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
            this.first_name = "";
            this.last_name = "";
            this.email = "";
            this.phone = "";
            this.avatar = "";
            this.password = "";
            if (this.phoneObject)
                this.phoneObject.isValid = false;
            this.phoneObject = null;
            this.dialog = false;
        },

        chooseFiles() {
            document.getElementById("fileUpload").click();
        },

        updatePhone(e) {
            this.phoneObject = e;
        },

        uploadImageFile(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                this.image = null;
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
                this.avatar = e.target.result;
            };
            reader.readAsDataURL(file);
        },

        askDelete(item) {
            this.deleteItem = item;
            this.deleteDialog = true;
        },

        deleteProvider() {
            this.loading = true;
            let model = {
                id: this.deleteItem.id,
            };
            api
                .post("deleteProvider", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.getUser.token}`,
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.getProviders();
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
                    this.deleteItem = null;
                });
        },

        edit(item) {
            this.id = item.id;
            this.first_name = item.first_name;
            this.last_name = item.last_name;
            this.avatar = item.avatar ?
                this.baseUrl + "uploads/avatars/" + item.avatar :
                item.avatar;
            this.active = item.active == 1;
            this.email = item.email;
            this.phone = item.phone;
            this.password = "password";
            this.dialog = true;
        },

        showManage() {
            this.manageDialog = true;
        },

        manage() {},
    },

    mounted() {
        this.getProviders();
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_app.variables.scss";
</style>
