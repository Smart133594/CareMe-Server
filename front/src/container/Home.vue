<template>
<div class="main-container">
    <Header @login="openLogin" @signup="openSignup" />
    <!-- App Router -->
    <transition name="router-anim" :enter-active-class="`animated ${selectedRouterAnimation}`">
        <router-view></router-view>
    </transition>
    <v-divider />
    <FooterMain />
    <!-- Auth Modal -->
    <v-dialog v-model="dialog" persistent max-width="500px" dark>
        <v-card class="auth-action">
            <v-tabs v-model="tab" class="elevation-2" :grow="true">
                <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
                    {{ i == 1 ? $t("message.signIn") : $t("message.signUp") }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab" dark>
                <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
                    <app-card class="auth-card">
                        <v-form v-model="valid" class="mb-5">
                            <div class="user-image text-center mb-4">
                                <img @click="chooseFiles(i)" :src="avatar ? avatar : '/static/avatars/male.png'" class="img-responsive rounded-circle" alt="user images" style="width: 100px; height: 100px" />
                            </div>
                            <input id="fileUpload" type="file" hidden :accept="['.jpg', '.jpeg', '.gif', '.png']" @change="uploadImageFile" />
                            <VuePhoneNumberInput v-model="phone" @update="updatePhone" dark required dark-color="#2e3343" default-country-code="OM" :preferred-countries="['OM', 'US', 'DE']" style="direction:ltr !important"/>
                            <v-row class="px-3 input-row" v-if="i == 2">
                                <v-text-field v-model="first_name" :rules="firstNameRules" prepend-icon="perm_identity" :label="$t('message.firstName')" required></v-text-field>
                                <v-text-field v-model="last_name" :rules="lastNameRules" prepend-icon="perm_identity" :label="$t('message.lastName')" required></v-text-field>
                                <v-text-field v-model="email" :rules="emailRules" prepend-icon="mail" :label="$t('message.email')" required></v-text-field>
                            </v-row>
                            <v-row class="px-3" :class="i == 1 && 'input-row'">
                                <v-text-field :label="$t('message.password')" v-model="password" prepend-icon="ti-lock" :rules="passwordRules" type="password" required></v-text-field>
                                <a v-if="i == 1" class="mb-2" @click="forgotPassword" :disabled="loading">{{ $t("message.forgotPassword") }}?</a>
                            </v-row>
                        </v-form>
                    </app-card>
                </v-tab-item>
            </v-tabs-items>
            <v-card-actions class="auth-action">
                <v-btn class="action bg-primary-color" block large :loading="loading" @click="submit()" :disabled="loading">
                    {{ $t("message.submit") }}
                </v-btn>
                <v-btn class="action" block color="secondary" large @click="dialog = false">
                    {{ $t("message.cancel") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Reset Modal -->
    <v-dialog v-model="showResetDialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                {{ $t("message.resetPassword") }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-form>
                    <v-row>
                        <v-text-field :label="$t('message.pleaseEnterYourPasswordToReset')" v-model="password" prepend-icon="ti-lock" :rules="passwordRules" type="password" required></v-text-field>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <div class="spacer"></div>
                <v-btn color="info" @click.stop="resetPassword" :disabled="loading" :loading="loading">{{ $t("message.resetPassword") }}</v-btn>
                <v-btn color="secondary" @click.stop="showResetDialog = false">{{
            $t("message.cancel")
          }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- Verify Modal -->
    <v-dialog v-model="verify" persistent max-width="500px">
        <v-card class="elevation-5" dark>
            <v-img class="align-start justify-center white--text" src="/static/img/phone-verify.jpg" alt="Card Image" height="200">
            </v-img>
            <app-card>
                <v-card-title class="justify-center">{{
            $t("message.sentVerifyCode")
          }}</v-card-title>
                <v-form class="mb-5">
                    <v-row class="px-3 input-row">
                        <v-text-field v-model="verify_code" :rules="verifyRules" prepend-icon="ti-check" :label="$t('message.verifyCode')" required></v-text-field>
                    </v-row>
                </v-form>
            </app-card>
            <v-card-actions class="auth-action">
                <div>
                    {{ $t("message.didNotReceiveCode") }}?<a class="mb-2 ml-5" @click="sendVerification">{{ $t("message.resend") }}</a>
                </div>
                <v-btn class="action bg-primary-color" block large :loading="loading" @click="checkVerify" :disabled="loading">
                    {{ $t("message.confirm") }}
                </v-btn>
                <v-btn class="action" block color="secondary" large @click="
              verify = false;
              forgot = false;
            ">
                    {{ $t("message.cancel") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- End Modal -->
</div>
</template>

<script>
import Vue from "vue";
import Header from "Components/HomeBanner/Header";
import FooterMain from "Components/Footer/FooterMain";
import {
    mapGetters
} from "vuex";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
import api from "Api";
import appConfig from "Constants/AppConfig";
export default {
    components: {
        Header,
        VuePhoneNumberInput,
        FooterMain,
    },
    computed: {
        ...mapGetters(["getUser", "selectedLocale", "selectedRouterAnimation"]),
    },
    data() {
        return {
            valid: false,
            dialog: false,
            tabs: 2,
            tab: "tab-1",
            loading: false,
            avatar: null,
            phone: "",
            phoeObject: null,
            first_name: "",
            firstNameRules: [(v) => !!v || this.$t("message.fieldRequired")],
            last_name: "",
            lastNameRules: [(v) => !!v || this.$t("message.fieldRequired")],
            email: "",
            emailRules: [
                (v) => !!v || this.$t("message.fieldRequired"),
                (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                "E-mail must be valid",
            ],
            verify: false,
            verify_code: "",
            verification_id: -1,
            verifyRules: [(v) => !!v || this.$t("message.fieldRequired")],
            password:"",
            passwordRules: [(v) => !!v || this.$t("passwordRequired")],
            forgot: false,
            showResetDialog: false,
            baseUrl: appConfig.baseUrl,
        };
    },
    methods: {
        openLogin() {
            this.tab = "tab-1";
            this.dialog = true;
        },

        openSignup() {
            this.tab = "tab-2";
            this.dialog = true;
        },

        chooseFiles: function (i) {
            if (i == 1) {
                return;
            }
            document.getElementById("fileUpload").click();
        },

        uploadImageFile(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
                this.avatar = null;
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

        submit() {
            if (!this.phoeObject?.isValid) {
                Vue.notify({
                    group: "loggedIn",
                    type: "error",
                    text: this.$t("message.phoneNumber"),
                });
                return;
            } else if (this.password == "") {
                Vue.notify({
                    group: "loggedIn",
                    type: "error",
                    text: this.$t("message.pleaseEndterYourPassword"),
                });
                return;
            }

            if (this.tab == "tab-2") {
                if (this.valid) this.sendVerification();
            } else this.signin();
        },

        updatePhone(e) {
            this.phoeObject = e;
        },

        sendVerification() {
            this.verification_id = -1;
            const model = {
                phone: this.phoeObject.formattedNumber,
                email: this.email,
                forgot: this.forgot,
            };
            this.loading = true;
            api
                .post("phoneVerification", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        Vue.notify({
                            group: "loggedIn",
                            type: "success",
                            text: this.$t("message.sentVerifyCode"),
                        });
                        this.dialog = false;
                        this.verify = true;
                        this.verification_id = response.data.verification_id;
                    } else {
                        if (this.forgot == true) {
                            this.forgot = false;
                            Vue.notify({
                                group: "loggedIn",
                                type: "error",
                                text: this.$t("message.phoneNotExist"),
                            });
                        } else {
                            Vue.notify({
                                group: "loggedIn",
                                type: "error",
                                text: this.$t("message.phoneOremailExist"),
                            });
                        }
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

        checkVerify() {
            if (this.verify_code != "") {
                const model = {
                    verification_id: this.verification_id,
                    verify_code: this.verify_code,
                    phone: this.phoeObject.formattedNumber,
                };
                this.loading = true;
                api
                    .post("checkVerify", JSON.stringify(model), {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        if (response.data.success) {
                            Vue.notify({
                                group: "loggedIn",
                                type: "success",
                                text: this.$t("message.phoneVerificationSuccess"),
                            });
                            this.verify_code = "";
                            this.verification_id = -1;
                            if (this.forgot == false) this.signup();
                            else {
                                this.forgot = true;
                                this.password = "";
                                this.showResetDialog = true;
                            }
                            this.verify = false;
                        } else {
                            Vue.notify({
                                group: "loggedIn",
                                type: "error",
                                text: this.$t("message.verifyCodeInvalid"),
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
            } else {
                Vue.notify({
                    group: "loggedIn",
                    type: "error",
                    text: this.$t("message.insertVerifyCode"),
                });
            }
        },

        signin() {
            this.loading = true;
            const model = {
                phone: this.phoeObject.formattedNumber,
                password: this.password,
            };

            this.$store.dispatch("signin", {
                model,
            });

            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },

        signup() {
            const model = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                phone: this.phoeObject.formattedNumber,
                avatar: this.avatar,
                password: this.password,
            };
            this.loading = true;
            api
                .post("signup", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        this.signin();
                    } else {
                        Vue.notify({
                            group: "loggedIn",
                            type: "error",
                            text: this.$t("message.signupFailed"),
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

        forgotPassword() {
            if (!this.phoeObject?.isValid) {
                Vue.notify({
                    group: "loggedIn",
                    type: "error",
                    text: this.$t("message.phoneNumber"),
                });
                return;
            }
            this.email = "";
            if (this.forgot == true) return;
            this.forgot = true;
            this.sendVerification();
        },

        resetPassword() {
            const model = {
                phone: this.phoeObject.formattedNumber,
                password: this.password,
            };
            this.loading = true;
            api
                .post("resetPassword", JSON.stringify(model), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    if (response.data.success) {
                        Vue.notify({
                            group: "loggedIn",
                            type: "success",
                            text: this.$t("message.passwordResetted"),
                        });
                        this.showResetDialog = false;
                        this.openLogin();
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
    },
    beforeMount() {
        let query = this.$route.query;
        if ("redirect" in query) {
            this.$store.dispatch("logoutUser", this.$router);
            this.dialog = true;
        }
    },
    mounted() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_app.variables.scss";

.auth-action {
    flex-direction: column !important;
    justify-items: center !important;
    align-items: center !important;

    .action {
        margin-left: 0px !important;
        margin-top: 10px;
    }

    .bg-primary-color {
        background-color: $primary_color !important;
    }

    .input-row {
        padding-top: 20px !important;
    }
}

.v-tab {
    &--active {
        background-color: $primary_color !important;
    }
}

.top-button {
    position: fixed !important;
    bottom: 30px !important;
    right: 30px !important;
}
</style>
