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
            <download-excel :data="filterOrders" :fields="excel_headers">
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
            v-bind:items="getFilteredOrders"
            v-bind:search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`ordering${item.id}`">
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
                  <td>{{ item.created_at }}</td>
                  <td>
                    <p class="m-0">
                      {{ item.full_name }}
                    </p>
                    <p class="m-0">
                      {{ item.phone }}
                    </p>
                  </td>
                  <td>
                    <p
                      class="m-0"
                      v-for="(cart, index) in item.carts"
                      :key="`${index}item`"
                    >
                      {{
                        cart[
                          selectedLocale.locale == "en" ? "en_name" : "ar_name"
                        ]
                      }}({{ cart.quantity }})
                    </p>
                  </td>
                  <td>
                    {{ $t("message.currency") }}
                    {{ parseFloat(item.amount).toFixed(2) }}
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
                        info: item.state == 'delivered',
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
                        <v-btn
                          text
                          block
                          @click="deliveredOrder(item)"
                          v-if="item.state == 'pending'"
                          class="mt-1"
                          >{{ $t("message.delivered") }}</v-btn
                        >
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
                <tr>
                  <td v-for="header in headers" :key="`total_${header.value}`">
                    <div v-if="'carts' == header.value">
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
  </div>
</template>

<script>
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import api from "Api";
import JsonExcel from "vue-json-excel";
import Vue from "vue";
export default {
  components: {
    downloadExcel: JsonExcel,
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),

    getFilteredOrders() {
      let orders = this.orders;
      if (this.vendor_value != "") {
        orders = orders.filter(
          (order) => order.vendor_en_name == this.vendor_value
        );
      }

      if (this.payment_status_value != "") {
        orders = orders.filter(
          (order) => order.payment_status == this.payment_status_value
        );
      }

      if (this.states_value != "") {
        orders = orders.filter((order) => order.state == this.states_value);
      }
      return orders;
    },

    getVendors() {
      let vendors = [{ en_name: "None", ar_name: "None", value: "" }];
      this.orders.forEach((element) => {
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
  },
  data: function () {
    return {
      loading: false,
      orders: [],
      search: "",
      baseUrl: appConfig.baseUrl,
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
          text: this.$t("message.date"),
          value: "created_at",
        },
        {
          text: this.$t("message.client"),
          value: "full_name",
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
        {
          text: this.$t("message.settings"),
          value:"setting"
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
        Date: "created_at",

        "Client Name": "full_name",
        Item: {
          field: "carts",
          callback: (value) => {
            let stringValue = "";
            value.forEach((element) => {
              stringValue += element.en_name + "\n";
            });
            return stringValue;
          },
        },
        Amount: "amount",
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

      filterOrders: [],

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

      vendor_value: "",
      payment_type_value: "",
      payment_status_value: "",
      states_value: "",
    };
  },
  methods: {
    getOrders() {
      this.loading = true;
      api
        .get("getOrders", {
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

    getTotal(items) {
      let amount = 0;
      this.filterOrders = items;
      items.forEach((element) => {
        amount += parseFloat(element.amount);
      });
      return amount.toFixed(2);
    },

    deliveredOrder(item){
      this.loading = true;
      let model = {
        id : item.id
      }
      api
        .post("deliveredOrder", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getOrders()
          }
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {},
  beforeMount() {
    this.getOrders();
  },
};
</script>
