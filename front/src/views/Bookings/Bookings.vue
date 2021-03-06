<template>
  <div>
    <app-section-loader :status="loading"> </app-section-loader>
    <v-container fluid grid-list-xl py-0>
      <v-row>
        <app-card
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-card-title>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            >
            </v-text-field>
            <v-spacer></v-spacer>
            <download-excel :data="filterBookings" :fields="excel_headers">
              <v-btn text>Export</v-btn>
            </download-excel>
          </v-card-title>
          <v-card-title>
            <v-select
              :label="$t('message.vendors')"
              :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'"
              v-model="vendor_value"
              :items="getVendors"
              item-value="value"
            ></v-select>
            <v-spacer></v-spacer>
            <v-select
              :label="$t('message.type')"
              :item-text="'text'"
              v-model="payment_type_value"
              :items="payment_type"
              item-value="value"
            ></v-select>
            <v-spacer></v-spacer>
            <v-select
              :label="$t('message.payment')"
              :item-text="'text'"
              v-model="payment_status_value"
              :items="payment_status"
              item-value="value"
            ></v-select>
            <v-spacer></v-spacer>
            <v-select
              :label="$t('message.state')"
              :item-text="'text'"
              v-model="states_value"
              :items="states"
              item-value="value"
            ></v-select>
          </v-card-title>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="getFilteredBooking"
            v-bind:search="search"
            :loading="loading"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`booking${item.id}`">
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{
                      item[
                        selectedLocale.locale == "en"
                          ? "vendor_en_name"
                          : "vendor_ar_name"
                      ]
                    }}
                  </td>
                  <td>
                    <a :href="`${baseUrl}${item.invoice}`" target="_blank">{{
                      $t("message.invoice")
                    }}</a>
                  </td>
                  <td>
                    {{
                      item[
                        selectedLocale.locale == "en" ? "en_name" : "ar_name"
                      ]
                    }}
                  </td>
                  <td>
                    {{ item.date }}
                  </td>
                  <td>
                    <p
                      class="m-0"
                      v-for="(time, index) in item.times"
                      :key="`${index}item`"
                    >
                      {{ time.from_time }} ~ {{ time.to_time }}
                    </p>
                  </td>
                  <td>
                    <p class="m-0">
                      {{ item.full_name }}
                    </p>
                    <p class="m-0">
                      {{ item.phone }}
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
                    <p style="text-transform: uppercase" class="m-0">
                      {{ item.type }}
                    </p>
                  </td>
                  <td>
                    <v-badge
                      :value="false"
                      class="p-2"
                      :class="{
                        error: item.payment_status != 'paid',
                        success: item.payment_status == 'paid',
                      }"
                      >{{ item.payment_status }}</v-badge
                    >
                  </td>
                  <td>
                    <v-badge
                      :value="false"
                      class="p-2"
                      :class="{
                        info:
                          item.state == 'confirmed' ||
                          item.state == 'completed',
                        error:
                          item.state == 'pending' || item.state == 'rejected',
                      }"
                      >{{ item.state }}</v-badge
                    >
                  </td>
                  <td>
                    <v-menu bottom left>
                      <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                          <v-icon>more_vert</v-icon>
                        </v-btn>
                      </template>
                      <v-list style="cursor: pointer">
                        <v-btn text block @click="view(item)">{{
                          $t("message.view")
                        }}</v-btn>

                        <v-btn
                          v-if="getUser.role == 'provider'"
                          text
                          block
                          @click="edit(item)"
                          >{{ $t("message.editing") }}</v-btn
                        >
                        <v-btn
                          text
                          block
                          @click="confirmBooking(item)"
                          class="mt-1"
                          v-if="item.state == 'pending'"
                          >{{ $t("message.confirm") }}</v-btn
                        >
                        <v-btn
                          text
                          block
                          @click="payBooking(item)"
                          v-if="
                            item.payment_status != 'paid' &&
                            item.state == 'confirmed'
                          "
                          class="mt-1"
                          >{{ $t("message.pay") }}</v-btn
                        >
                        <v-btn
                          text
                          block
                          @click="rejectBooking(item)"
                          v-if="item.state == 'pending'"
                          class="mt-1"
                          >{{ $t("message.reject") }}</v-btn
                        >
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
                <tr>
                  <td v-for="header in headers" :key="`total_${header.value}`">
                    <div v-if="'worker_name' == header.value">
                      <h6>{{ $t("message.total") }}:</h6>
                    </div>
                    <div v-if="'amount' == header.value">
                      <h6>{{ getTotal(items) }}</h6>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </app-card>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title
          >{{ $t("message.booking") }} {{ $t("message.details") }}</v-card-title
        >
        <v-card-text>
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.vendorName") }}</h6>
            <p style="fontsize: 14px; font-weight: bold">
              {{
                selectedItem[
                  selectedLocale.locale == "en"
                    ? "vendor_en_name"
                    : "vendor_ar_name"
                ]
              }}
            </p>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.invoice") }}</h6>
            <p style="fontsize: 14px; font-weight: bold">
              {{ baseUrl }}{{ selectedItem.invoice }}
            </p>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.service") }}</h6>
            <p style="fontsize: 14px; font-weight: bold">
              {{
                selectedItem[
                  selectedLocale.locale == "en" ? "en_name" : "ar_name"
                ]
              }}
            </p>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.date") }}</h6>
            <p style="fontsize: 14px; font-weight: bold">
              {{ selectedItem.date }}
            </p>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.times") }}</h6>
            <div class="d-flex flex-direction-column align-items-center">
              <p
                style="fontsize: 14px; font-weight: bold"
                v-for="(time, index) in selectedItem.times"
                :key="`${index}time`"
              >
                {{ time.from_time }} ~ {{ time.to_time }}
              </p>
            </div>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.client") }}</h6>
            <div class="d-flex flex-direction-column align-items-center">
              <div class="d-flex flex-direction-row align-items-center">
                <p style="fontsize: 14px; font-weight: bold" class="m-0">
                  {{ $t("message.name") }}
                </p>
                <p style="fontsize: 14px; font-weight: bold" class="ml-1">
                  {{ selectedItem.full_name }}
                </p>
              </div>
              <div class="d-flex flex-direction-row align-items-center">
                <p style="fontsize: 14px; font-weight: bold" class="m-0">
                  {{ $t("message.phone") }} :
                </p>
                <p style="fontsize: 14px; font-weight: bold" class="ml-1">
                  {{ selectedItem.phone }}
                </p>
              </div>
            </div>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.worker") }}</h6>
            <p style="fontsize: 14px; font-weight: bold">
              {{ selectedItem.worker_name }}
            </p>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.amount") }}</h6>
            <div class="d-flex flex-direction-row align-items-center">
              <p style="fontsize: 14px; font-weight: bold" class="m-0">
                {{ $t("message.currency") }}
              </p>
              <p style="fontsize: 14px; font-weight: bold" class="ml-1">
                {{ parseFloat(selectedItem.amount).toFixed(2) }}
              </p>
            </div>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.type") }}</h6>
            <p
              style="
                fontsize: 14px;
                font-weight: bold;
                text-transform: uppercase;
              "
            >
              {{ selectedItem.type }}
            </p>
          </div>
          <v-divider v-if="selectedItem.type == 'insurance'" />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
            v-if="selectedItem.type == 'insurance'"
          >
            <h6>{{ $t("message.payment") }} {{ $t("message.details") }}</h6>
            <div class="d-flex flex-direction-column align-items-center">
              <div
                class="
                  d-flex
                  flex-direction-row
                  align-items-center
                  justify-content-between
                "
              >
                <p style="fontsize: 14px; font-weight: bold" class="m-0">
                  {{ $t("message.companyName") }} :
                </p>
                <p
                  style="
                    fontsize: 14px;
                    font-weight: bold;
                    text-transform: uppercase;
                  "
                  class="ml-1"
                >
                  {{ selectedItem.company }}
                </p>
              </div>
              <div
                class="
                  d-flex
                  flex-direction-row
                  align-items-center
                  justify-content-between
                "
              >
                <p style="fontsize: 14px; font-weight: bold" class="m-0">
                  {{ $t("message.insuranceReferenceNumber") }} :
                </p>
                <p
                  style="
                    fontsize: 14px;
                    font-weight: bold;
                    text-transform: uppercase;
                  "
                  class="ml-1"
                >
                  {{ selectedItem.insurance }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
            v-if="selectedItem.type == 'insurance'"
          >
            <v-img
              class="my-2 border"
              :src="`${baseUrl}uploads/bookings/${selectedItem.image}`"
              aspect-ratio="1"
              style="height: 200px"
              border
              @click="
                showImage(`${baseUrl}uploads/bookings/${selectedItem.image}`)
              "
            ></v-img>
            <v-img
              class="my-2 border"
              :src="`${baseUrl}uploads/bookings/${selectedItem.image1}`"
              aspect-ratio="1"
              style="height: 200px"
              border
              @click="
                showImage(`${baseUrl}uploads/bookings/${selectedItem.image1}`)
              "
            ></v-img>
          </div>
          <v-divider />
          <div
            class="
              d-flex
              flex-direction-row
              align-items-center
              justify-content-between
            "
          >
            <h6>{{ $t("message.state") }}</h6>
            <p
              style="
                fontsize: 14px;
                font-weight: bold;
                text-transform: uppercase;
              "
            >
              {{ selectedItem.payment_status }}
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" max-width="700px">
      <v-card v-if="service != null" class="m2 p-3">
        <v-card-text>
          <v-row>
            <v-col xl="6" lg="6" md="6" sm="12" cols="12">
              <v-date-picker
                v-model="selectedItem.date"
                :allowed-dates="mydate"
              ></v-date-picker>
            </v-col>
            <v-col xl="6" lg="6" md="6" sm="12" cols="12">
              <v-btn
                @click="selectTime(item)"
                color="primary"
                :outlined="!checkExist(item)"
                v-for="(item, index) in service.times"
                :key="`${index}time`"
                class="mt-2"
                block
              >
                {{ item.from_time }} ~ {{ item.to_time }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col xl="8" lg="8" md="8" sm="8" cols="8">
              <v-select
                :label="$t('message.worker')"
                item-text="full_name"
                v-model="selectedItem.worker_id"
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
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click.stop="editDialog = false">Close</v-btn>
          <v-btn color="success" @click.stop="editBooking()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import api from "Api";
import Vue from "vue";
import CouponsVue from "../Coupons/Coupons.vue";
import JsonExcel from "vue-json-excel";
export default {
  components: {
    downloadExcel: JsonExcel,
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),

    getFilteredBooking() {
      let bookings = this.bookings;
      if (this.vendor_value != "") {
        bookings = bookings.filter(
          (booking) => booking.vendor_en_name == this.vendor_value
        );
      }

      if (this.payment_type_value != "") {
        bookings = bookings.filter(
          (booking) => booking.type == this.payment_type_value
        );
      }

      if (this.payment_status_value != "") {
        bookings = bookings.filter(
          (booking) => booking.payment_status == this.payment_status_value
        );
      }

      if (this.states_value != "") {
        bookings = bookings.filter(
          (booking) => booking.state == this.states_value
        );
      }
      return bookings;
    },

    getVendors() {
      let vendors = [
        {
          en_name: "None",
          ar_name: "None",
          value: "",
        },
      ];
      this.bookings.forEach((element) => {
        let exist = vendors.filter(
          (vendor) => vendor.en_name == element.en_name
        );
        if (exist.length == 0) {
          vendors.push({
            en_name: element.vendor_en_name,
            ar_name: element.vendor_ar_name,
            value: element.vendor_en_name,
          });
        }
      });
      return vendors;
    },

    getImage() {
      if (this.service == null) {
        return "";
      }
      let workers = this.service.workers.filter(
        (worker) => worker.id == this.selectedItem.worker_id
      );

      if (this.selectedItem.worker_id != -1) {
        let image = workers[0].image;
        if (image) {
          return `${this.baseUrl}uploads/workers/${image}`;
        } else {
          return `${this.baseUrl}static/avatars/male.png`;
        }
      }
      return `${this.baseUrl}static/avatars/male.png`;
    },
  },
  data: function () {
    return {
      loading: false,
      bookings: [],
      search: "",
      baseUrl: appConfig.baseUrl,
      editDialog: false,
      headers: [
        {
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
      excel_headers: {
        "Vendor Name": "vendor_en_name",
        "Invoice Url": {
          field: "invoice",
          callback: (value) => {
            return `${this.baseUrl}${value}`;
          },
        },
        "Service Name": "en_name",
        Date: "date",
        Times: {
          field: "times",
          callback: (value) => {
            let stringValue = "";
            value.forEach((element) => {
              stringValue += element.from_time + " ~ " + element.to_time + "\n";
            });
            return stringValue;
          },
        },
        "Client Name": "full_name",
        "Worker Name": "worker_name",
        Amount: "amount",
        Type: {
          field: "type",
          callback: (value) => {
            let stringValue = value.toUpperCase();
            return stringValue;
          },
        },
        Payment: {
          field: "payment_status",
          callback: (value) => {
            let stringValue = value.toUpperCase();
            return stringValue;
          },
        },
        Status: {
          field: "state",
          callback: (value) => {
            let stringValue = value.toUpperCase();
            return stringValue;
          },
        },
      },
      selectedItem: {},
      imageUrl: "",
      dialog: false,
      vendors: [],
      payment_type: [
        {
          text: "None",
          value: "",
        },
        {
          text: "CARD",
          value: "card",
        },
        {
          text: "INSURANCE",
          value: "insurance",
        },
      ],
      payment_status: [
        {
          text: "None",
          value: "",
        },
        {
          text: "UNPAID",
          value: "unpaid",
        },
        {
          text: "PAID",
          value: "paid",
        },
        {
          text: "REFUND",
          value: "refund",
        },
      ],
      states: [
        {
          text: "None",
          value: "",
        },
        {
          text: "PENDING",
          value: "pending",
        },
        {
          text: "CONFIRMED",
          value: "confirmed",
        },
        {
          text: "REJECTED",
          value: "rejected",
        },
      ],
      filterBookings: [],
      vendor_value: "",
      payment_type_value: "",
      payment_status_value: "",
      states_value: "",
      service: null,
      selectedTimeCount: 0,
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
      this.selectedTimeCount = item.times.length;
      this.loading = true;
      this.editDialog = true;
      api
        .get(`getService/${item.service_id}`, {
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
    confirmBooking(item) {
      this.loading = true;
      api
        .post(
          "confirmBooking",
          JSON.stringify({
            id: item.id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
          } else {
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
        .post(
          "payBooking",
          JSON.stringify({
            id: item.id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
          } else {
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
        .post(
          "rejectBooking",
          JSON.stringify({
            id: item.id,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
          } else {
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
    },

    getTotal(items) {
      let amount = 0;
      this.filterBookings = items;
      items.forEach((element) => {
        amount += parseFloat(element.amount);
      });
      return amount.toFixed(2);
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

    editBooking() {
      if(this.selectedTimeCount != this.selectedItem.times.length){
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "You cant edit quantity, please check times correctly. you have to select same time count as before.",
        });
        return
      }
      this.editDialog = false;
      this.loading = true;
      api
        .post("editBooking", JSON.stringify(this.selectedItem), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getBookings();
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });

    },

    checkExist(item) {
      let check = false;
      this.selectedItem.times.forEach((element) => {
        if (element.id == item.id) {
          check = true;
        }
      });
      return check;
    },

    selectTime(item) {
      if (this.checkExist(item)) {
        this.selectedItem.times = this.selectedItem.times.filter(
          (time) => time.id != item.id
        );
      } else {
        if (this.service.multiple_bookings != 1) {
          this.selectedItem.times = [];
        }
        this.selectedItem.times.push(item);
      }
    },
  },
  mounted() {},
  beforeMount() {
    this.getBookings();
  },
};
</script>
