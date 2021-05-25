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
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            >
            </v-text-field>
          </v-card-title>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="bookings"
            v-bind:search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`booking${item.id}`">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <a :href="`${baseUrl}${item.invoice}`" target="_blank">{{$t("message.invoice")}}</a>
                  </td>
                  <td>{{item.full_name}}</td>
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
                      v-for="(time, index) in item.times"
                      :key="`${index}item`"
                    >
                      {{ time.from_time }} ~ {{ time.to_time }}
                    </p>
                  </td>
                  <td>
                    {{ $t("message.currency") }}
                    {{ parseFloat(item.amount).toFixed(2) }}
                  </td>
                  <td>
                    <p style="text-transform: uppercase">{{ item.type }}</p>
                  </td>
                  <td>
                    <v-badge
                      :value="false"
                      class="p-2"
                      :class="{
                        error: item.payment != 'paid',
                        info: item.payment == 'paid',
                      }"
                      >{{ item.payment }}</v-badge
                    >
                  </td>
                  <td>
                    <v-badge
                      :value="false"
                      class="p-2"
                      :class="{
                        info:
                          item.state == 'accepted' || item.state == 'completed',
                        error:
                          item.state == 'pending' || item.state == 'rejected',
                      }"
                      >{{ item.state }}</v-badge
                    >
                    <v-btn
                      :value="false"
                      class="p-2 error ml-2"
                      small
                      @click="cancelBooking(item)"
                      v-if="item.state == 'pending'"
                      :disabled="loading"
                      >{{ $t("message.cancel") }}</v-btn
                    >
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
import Vue from "vue";
export default {
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  data: function () {
    return {
      loading: false,
      bookings: [],
      search: "",
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      headers: [
        {
          text: this.$t("message.no"),
          value: "no",
        },
        {
          text: this.$t("message.invoice"),
          value: "invoice",
        },
        {
          text: this.$t("message.worker"),
          value: "worker",
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
          value: "payment",
        },
        {
          text: this.$t("message.state"),
        },
      ],
    };
  },
  methods: {
    getMyBookings() {
      this.loading = true;
      api
        .get("getMyBookings", {
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

    cancelBooking(item) {
      this.loading = true;
      api
        .post("cancelBooking", JSON.stringify({ id: item.id }), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
          } else {
            Vue.notify({
              group: "center",
              type: "error",
              text: this.$t("message.alreadyAccepted"),
            });
          }
          this.getMyBookings();
        })
        .catch((error) => {})
        .finally(() => {
          this.loading = false;
        });
    },

    setting(value) {},
  },
  mounted() {},
  beforeMount() {
    this.getMyBookings();
  },
};
</script>
