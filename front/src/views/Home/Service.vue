<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container v-if="service">
      <v-row class="px-0">
        <v-col xl="6" lg="6" md="6" sm="12" xs="12" class="shop-wrapper px-5">
          <img
            :src="`${baseUrl}uploads/servicies/${service.image}`"
            height="100%"
            width="100%"
            class="border"
          />
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="shop-wrapper px-5">
          <h5
            class="mt-2 text-purple"
            style="font-size: 26px; font-weight: 700"
          >
            {{ service[selectedLocale.locale == "en" ? "en_name" : "ar_name"] }}
          </h5>
          <h6 class="font-weight--bold mt-2 text-purple">
            {{ $t("message.currency") }}
            {{ service.price }}
          </h6>
          <v-rating
            style="margin-left: -10px"
            readonly
            v-model="service.rating"
            background-color="orange"
            color="orange"
          ></v-rating>

          <div class="d-flex flex-direction-row mt-2">
            <v-text-field
              color="warning"
              v-model="coupon"
              :rules="requireRule"
              required
              :label="$t('message.couponCode')"
              solo
              :disabled="loading || coupon_percent > 0"
            ></v-text-field>
            <v-btn
              color="warning"
              height="48px"
              class="ml-2"
              @click="applyCoupon"
              :disabled="coupon_percent > 0"
              >{{ $t("message.apply") }}</v-btn
            >
          </div>

          <div class="d-custom-flex align-items-center">
            <v-btn
              color="secondary mr-1"
              style="flex: 1"
              @click="addWish"
              :disabled="itemExist"
              >{{
                itemExist
                  ? $t("message.added2wishlist")
                  : $t("message.add2wishlist")
              }}</v-btn
            >
            <v-btn
              @click="booking"
              :loading="loading"
              :disabled="loading"
              color="info ml-1"
              style="flex: 1"
              >{{ $t("message.booking") }}</v-btn
            >
          </div>
          <div class="d-custom-flex align-items-center mt-5">
            <span class="icon-style" style="font-size: 20px">
              <i class="ti-location-pin"></i>
            </span>
            <h6 class="text-purple pl-5">
              {{
                service[
                  selectedLocale.locale == "en" ? "en_address" : "ar_address"
                ]
              }}
            </h6>
          </div>
          <div class="d-custom-flex align-items-center mt-2">
            <span class="icon-style" style="font-size: 20px">
              <i class="zmdi zmdi-phone"></i>
            </span>
            <h6 class="text-purple pl-5">
              {{ service.phone }}
            </h6>
          </div>
          <h5 class="font-weight--bold text-purple mt-5">
            {{ $t("message.description") }}
          </h5>
          <div class="font-weight--bold text-purple mt-2">
            {{
              service[
                selectedLocale.locale == "en"
                  ? "en_description"
                  : "ar_description"
              ]
            }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700"
      content-class="step-dialog"
    >
      <div class="d-flex justify-content-end">
        <v-btn
          color="white"
          @click="dialog = false"
          icon
          style="
            background-color: black;
            position: relative;
            bottom: -20px;
            z-index: 999;
            right: 0;
          "
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      <v-card>
        <v-stepper v-model="step" v-if="service">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="step > 1">{{
              $t("message.makeBooking")
            }}</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2">{{
              $t("message.choosePayment")
            }}</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">{{
              $t("message.paymentDetails")
            }}</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>
            <v-stepper-content class="step-content" step="1">
              <v-row>
                <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                  <v-date-picker
                    v-model="selected_date"
                    :allowed-dates="mydate"
                  ></v-date-picker>
                </v-col>
                <v-col
                  xl="6"
                  lg="6"
                  md="6"
                  sm="12"
                  cols="12"
                  v-if="selected_date"
                >
                  <v-btn
                    @click="selectTime(item)"
                    color="primary"
                    :outlined="!selected_times.includes(item)"
                    v-for="(item, index) in service.times"
                    :key="`${index}time`"
                    class="mt-2"
                    block
                  >
                    {{ item.from_time }} ~
                    {{ item.to_time }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row
                v-if="selected_times.length > 0"
                class="align-items-center"
              >
                <v-col xl="8" lg="8" md="8" sm="12" cols="12">
                  <div
                    class="control-box d-flex ml-2 flex-row align-items-center"
                  >
                    <v-btn
                      text
                      class="control-button border"
                      small
                      @click="decreaseQuantity"
                    >
                      <v-icon dark>remove</v-icon>
                    </v-btn>
                    <div class="input-quantity">
                      <p>{{ quantity }}</p>
                    </div>
                    <v-btn
                      text
                      class="control-button border"
                      small
                      @click="increaseQuantity"
                    >
                      <v-icon dark>add</v-icon>
                    </v-btn>
                  </div>
                </v-col>
                <v-col xl="4" lg="4" md="4" sm="12" cols="12">
                  <p class="font-weight--bold text-purple">
                    {{ $t("message.price") }} : {{ $t("message.currency") }}
                    {{ service.price * selected_times.length * quantity
                    }}{{
                      ` (${service.price}*${selected_times.length}*${quantity})`
                    }}
                  </p>
                </v-col>
              </v-row>
              <v-row v-if="selected_date">
                <v-col xl="8" lg="8" md="8" sm="8" cols="8">
                  <v-select
                    :label="$t('message.worker')"
                    item-text="full_name"
                    v-model="worker_id"
                    item-value="id"
                    :items="service.workers"
                  ></v-select>
                </v-col>
                <v-col xl="4" lg="4" md="4" sm="4" cols="4">
                  <img
                    :src="getImage"
                    class="rounded-circle"
                    width="50px"
                    height="50px"
                  />
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content class="step-content" step="2">
              <div class="d-flex flex-direction-column px-5">
                <div>
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>{{ $t("message.price") }}</h6>
                    <h6>
                      {{ $t("message.currency") }}
                      {{ parseFloat(service.price).toFixed(2) }}
                    </h6>
                  </div>
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>{{ $t("message.times") }}</h6>
                    <h6>{{ selected_times.length }}</h6>
                  </div>
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>{{ $t("message.quantity") }}</h6>
                    <h6>{{ quantity }}</h6>
                  </div>
                  <v-divider />
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>{{ $t("message.subTotal") }}</h6>
                    <h6>
                      {{ $t("message.currency") }}
                      {{ getSubTotal }}
                    </h6>
                  </div>
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>{{ $t("message.tax") }}</h6>
                    <h6>
                      {{ $t("message.currency") }}
                      {{ getTax }}
                    </h6>
                  </div>
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>
                      {{ $t("message.coupons") }}{{ `(${coupon_percent} %)` }}
                    </h6>
                    <h6>- {{ $t("message.currency") }} {{ getCoupons }}</h6>
                  </div>
                  <div
                    class="d-flex flex-direction-row align-items-center justify-content-between m-2"
                  >
                    <h6>{{ $t("message.total") }}</h6>
                    <h6>
                      {{ $t("message.currency") }}
                      {{ getTotal }}
                    </h6>
                  </div>
                </div>
                <v-btn
                  class=""
                  block
                  height="50"
                  :outlined="payment != 0"
                  @click="payment = 0"
                  color="primary"
                  >{{ $t("message.insurancePay") }}</v-btn
                >
                <v-btn
                  class="mt-3"
                  block
                  height="50"
                  :outlined="payment != 1"
                  @click="payment = 1"
                  color="primary"
                  >{{ $t("message.creditCardPay") }}</v-btn
                >
              </div>
            </v-stepper-content>
            <v-stepper-content class="step-content p-0" step="3">
              <div v-if="payment == 0">
                <v-form v-model="valid" class="pa-4">
                  <v-row>
                    <v-text-field
                      :label="$t('message.companyName')"
                      v-model="company"
                      :rules="requireRule"
                      required
                    >
                    </v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      :label="$t('message.insuranceReferenceNumber')"
                      v-model="insurance"
                      :rules="requireRule"
                      required
                    >
                    </v-text-field>
                  </v-row>
                  <h6 class="text-purple mt-2">
                    {{ $t("message.uploadDetails") }}
                  </h6>
                  <v-row>
                    <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                      <v-img
                        @click="chooseFiles(1)"
                        class="my-2 border"
                        :src="image ? image : '/static/img/insurance.png'"
                        aspect-ratio="1"
                        style="height: 200px"
                        border
                      ></v-img>
                    </v-col>
                    <v-col xl="6" lg="6" md="6" sm="12" cols="12">
                      <v-img
                        @click="chooseFiles(2)"
                        class="my-2 border"
                        :src="image1 ? image1 : '/static/img/idcard.png'"
                        aspect-ratio="1"
                        style="height: 200px"
                      ></v-img>
                    </v-col>
                  </v-row>
                  <input
                    id="fileUpload"
                    type="file"
                    hidden
                    :accept="['.jpg', '.jpeg', '.gif', '.png']"
                    @change="uploadImageFile"
                  />
                </v-form>
              </div>
              <div v-if="payment == 1" class="mt-2">
                <CardForm
                  :form-data="formData"
                  @input-card-number="updateCardNumber"
                  @input-card-name="updateCardName"
                  @input-card-month="updateCardMonth"
                  @input-card-year="updateCardYear"
                  @input-card-cvv="updateCardCvv"
                  :randomBackgrounds="false"
                  :loading="loading"
                />
              </div>
            </v-stepper-content>
            <div class="p-2">
              <v-btn color="secondary" v-if="step > 1" @click="beforeStep">{{
                $t("message.back")
              }}</v-btn>
              <v-btn
                class="ml-2"
                color="info"
                v-if="step < 3"
                :disabled="!isValid"
                @click="nextStep"
                >{{ $t("message.continue") }}</v-btn
              >
              <v-btn
                class="ml-2"
                color="success"
                v-if="step == 3"
                :disabled="!isValid"
                @click="submit"
                >{{ $t("message.submit") }}</v-btn
              >
            </div>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "Api";
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import Vue from "vue";
import CardForm from "Components/Shop/CreditCard/CardForm";

export default {
  components: {
    CardForm,
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    itemExist() {
      let user = this.getUser;
      if (user == null) return false;
      let wishes = user.wishes;
      for (let index = 0; index < wishes.length; index++) {
        if (parseInt(this.service.id) == parseInt(wishes[index].service_id)) {
          return true;
        }
      }
      return false;
    },
    getImage() {
      let workers = this.service.workers.filter(
        (worker) => worker.id == this.worker_id
      );

      if (this.worker_id != -1) {
        let image = workers[0].image;
        if (image) {
          return `${this.baseUrl}uploads/workers/${image}`;
        } else {
          return `${this.baseUrl}static/avatars/male.png`;
        }
      }
      return `${this.baseUrl}static/avatars/male.png`;
    },
    isValid() {
      if (this.selected_date == null || this.selected_times.length == 0) {
        return false;
      }
      if (this.payment == -1) {
        if (this.step > 1) {
          return false;
        }
      }
      if (
        this.company == "" ||
        this.insurance == "" ||
        this.image == null ||
        this.image1 == null
      ) {
        if (this.step > 2 && this.payment == 0) {
          return false;
        }
      }

      if (
        this.formData.cardNumber == "" ||
        this.formData.cardName == "" ||
        this.formData.cardMonth == "" ||
        this.formData.cardYear == "" ||
        this.formData.cardCvv == ""
      ) {
        if (this.step > 2 && this.payment == 1) {
          return false;
        }
      }

      return true;
    },
    getSubTotal() {
      return parseFloat(
        this.selected_times.length * this.service.price * this.quantity
      ).toFixed(2);
    },
    getTax() {
      if (this.service.tax == 0) {
        return parseFloat(0).toFixed(2);
      } else {
        return parseFloat((this.getSubTotal * this.service.tax) / 100).toFixed(
          2
        );
      }
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
      return parseFloat(
        parseFloat(this.getSubTotal) +
          parseFloat(this.getTax) -
          parseFloat(this.getCoupons)
      ).toFixed(2);
    },
  },
  data: function () {
    return {
      loading: false,
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      service_id: -1,
      service: null,
      requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
      valid: false,
      selected_date: null,
      selected_times: [],
      worker_id: -1,
      quantity: 1,
      dialog: false,
      step: 1,
      payment: -1,
      company: "",
      insurance: "",
      imageType: -1,
      image: null,
      image1: null,
      coupon: "",
      coupon_percent: 0,
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
    };
  },
  methods: {
    getService() {
      this.loading = true;
      api
        .get(`getService/${this.service_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            let service = response.data.data;
            this.service = service;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    addWish() {
      if (this.getUser == null) {
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.youNeedToLoginFirst"),
        });
      } else {
        this.loading = true;
        let model = {
          service_id: this.service.id,
          product_id: -1,
        };
        api
          .post("addWish", JSON.stringify(model), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              Vue.notify({
                group: "center",
                type: "success",
                text: this.$t("message.added2WishList"),
              });
              this.getUser.wishes.push(response.data.data);
              localStorage.setItem("user", JSON.stringify(this.getUser));
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    booking() {
      if (this.getUser == null) {
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.youNeedToLoginFirst"),
        });
        return;
      }
      this.dialog = true;
    },

    mydate(date) {
      var today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      date = new Date(date);
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);

      if (today > date) {
        return false;
      }
      if (this.service.offdays.length > 0) {
        let day = date.getDay();
        if (this.service.offdays.includes(day)) {
          return false;
        }
      }
      if (this.service.holidays.length > 0) {
        for (let index = 0; index < this.service.holidays.length; index++) {
          const holiday = this.service.holidays[index];
          let starting_date = new Date(holiday.starting_date);
          starting_date.setHours(0);
          starting_date.setMinutes(0);
          starting_date.setSeconds(0);
          starting_date.setMilliseconds(0);

          let ending_date = new Date(holiday.ending_date);
          ending_date.setHours(0);
          ending_date.setMinutes(0);
          ending_date.setSeconds(0);
          ending_date.setMilliseconds(0);

          if (date >= starting_date && date <= ending_date) {
            return false;
          }
        }
      }
      return true;
    },

    selectTime(item) {
      if (this.selected_times.includes(item)) {
        this.selected_times = this.selected_times.filter(
          (time) => time.id != item.id
        );
      } else {
        if (this.service.multiple_bookings != 1) {
          this.selected_times = [];
        }
        this.selected_times.push(item);
      }
    },

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    increaseQuantity() {
      this.quantity++;
    },

    nextStep() {
      this.step++;
    },

    beforeStep() {
      this.step--;
    },
    chooseFiles(type) {
      this.imageType = type;
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
        if (this.imageType == 1) this.image = e.target.result;
        else {
          this.image1 = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    },

    updateCardNumber(val) {},
    updateCardName(val) {},
    updateCardMonth(val) {},
    updateCardYear(val) {},
    updateCardCvv(val) {},

    bookingWithInsurance() {
      let model = {
        service_id: this.service_id,
        worker_id: this.worker_id,
        date: this.selected_date,
        times: this.selected_times,
        quantity: this.quantity,
        company: this.company,
        insurance: this.insurance,
        image: this.image,
        image1: this.image1,
        coupon: this.coupon_percent > 0 ? this.coupon : "",
        type: "service",
        lang: this.selectedLocale.locale == "ar" ? "ar" : "en",
      };

      this.loading = true;
      api
        .post("bookingWithInsurance", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "center",
              type: "success",
              text: this.$t("message.bookingSuccess"),
            });
            this.step = 1;
            this.payment = -1;
            this.image1 = null;
            this.image = null;
            this.company = "";
            this.insurance = "";
            this.selected_times = [];
            this.quantity = 1;
            this.selected_date = null;
             this.formData = {
              cardName: "",
              cardNumber: "",
              cardMonth: "",
              cardYear: "",
              cardCvv: "",
            };
          } else {
            Vue.notify({
              group: "center",
              type: "error",
              text: this.$t("message.bookingFailed"),
            });
          }
          this.coupon = "";
          this.coupon_percent = 0;
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

    bookingWithCard() {
      let model = {
        service_id: this.service_id,
        worker_id: this.worker_id,
        date: this.selected_date,
        times: this.selected_times,
        quantity: this.quantity,
        coupon: this.coupon_percent > 0 ? this.coupon : "",
        type: "service",
        lang: this.selectedLocale.locale == "ar" ? "ar" : "en",
        formData: this.formData,
      };
      this.loading = true;
      api
        .post("bookingWithCard", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "center",
              type: "success",
              text: this.$t("message.bookingSuccess"),
            });
            this.step = 1;
            this.payment = -1;
            this.image1 = null;
            this.image = null;
            this.company = "";
            this.insurance = "";
            this.selected_times = [];
            this.quantity = 1;
            this.selected_date = null;
            this.formData = {
              cardName: "",
              cardNumber: "",
              cardMonth: "",
              cardYear: "",
              cardCvv: "",
            };
          } else {
            Vue.notify({
              group: "center",
              type: "error",
              text: this.$t("message.bookingFailed"),
            });
          }
          this.coupon = "";
          this.coupon_percent = 0;
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

    submit() {
      if (this.getUser.role != "client") {
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.youNeedClientRole"),
        });
        return;
      }
      if (this.payment == 0) {
        this.bookingWithInsurance();
      } else {
        this.bookingWithCard();
      }
      this.dialog = false;
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
          JSON.stringify({ coupon: this.coupon, type: "service" }),
          {
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
  },
  mounted() {},
  beforeMount() {
    let service_id = this.$route.params.service_id;
    this.service_id = service_id;
    this.getService();
  },
  watch: {
    coupon() {
      this.coupon_percent = 0;
    },
  },
};
</script>
<style lang="scss">
@import "Components/Shop/CreditCard/style.scss";
</style>
