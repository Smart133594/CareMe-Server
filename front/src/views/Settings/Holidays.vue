<template>
  <div>
    <page-title-bar @actionClick="addNew"></page-title-bar>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid grid-list-xl p-5>
      <v-row>
        <app-card
          :fullBlock="true"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <v-data-table v-bind:headers="headers" v-bind:items="holidays">
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`holiday${item.id}`">
                  <td>{{ index + 1 }}</td>
                  <td>{{ getVendorName(item) }}</td>
                  <td>{{ item.starting_date }}</td>
                  <td>{{ item.ending_date }}</td>
                  <td>
                    <v-btn
                      class="ma-2"
                      color="primary"
                      @click="editHoliday(item)"
                      >{{ $t("message.edit") }}</v-btn
                    >
                    <v-btn
                      class="ma-2"
                      color="error"
                      @click="deleteHoliday(item)"
                      >{{ $t("message.delete") }}</v-btn
                    >
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
          {{ $t("message.service") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12" sm="12">
                <v-select
                  :label="$t('message.vendor')"
                  :item-text="
                    selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'
                  "
                  v-model="vendor_id"
                  item-value="id"
                  :items="vendors"
                  :rules="requireRule"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="starting_date"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  v-model="startingMenu"
                  offset-y
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="starting_date"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      :label="$t('message.startingDate')"
                      v-model="starting_date"
                      prepend-icon="event"
                      readonly
                      :rules="requireRule"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="starting_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="startingMenu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="warning"
                      @click="$refs.starting_date.save(starting_date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="ending_date"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  v-model="endingMenu"
                  offset-y
                  :nudge-right="40"
                  min-width="290px"
                  :return-value.sync="ending_date"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-on="on"
                      :label="$t('message.endingDate')"
                      v-model="ending_date"
                      prepend-icon="event"
                      readonly
                      :rules="requireRule"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="ending_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="endingMenu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="warning"
                      @click="$refs.ending_date.save(ending_date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="spacer"></div>
          <v-btn
            color="info"
            @click.stop="save"
            :disabled="!valid || loading"
            :loading="loading"
            >{{ $t("message.save") }}</v-btn
          >
          <v-btn color="secondary" @click.stop="cancel">{{
            $t("message.cancel")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "Api";
import Vue from "vue";

export default {
  data: function () {
    return {
      loading: false,
      holidays: [],
      vendors: [],
      vendor_id: null,
      dialog: false,
      valid: false,

      id: -1,
      starting_date: null,
      ending_date: null,

      requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
      startingMenu: false,
      endingMenu: false,

      headers: [
        {
          text: this.$t("message.no"),
          value: "no",
          align: "center",
        },
        {
          text: this.$t("message.vendor"),
          value: "vendor",
          align: "center",
        },
        {
          text: this.$t("message.startingDate"),
          value: "starting_date",
          align: "center",
        },
        {
          text: this.$t("message.endingDate"),
          value: "ending_date",
          align: "center",
        },
        {
          text: this.$t("message.settings"),
          value: "settings",
          align: "center",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },

  methods: {
    getHolidays() {
      this.loading = true;
      api
        .get("getHolidays", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.vendors = response.data.data.vendors;
            this.holidays = response.data.data.holidays;
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

    save() {
      if (this.valid) {
        if (this.starting_date > this.ending_date) {
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: this.$t("message.dateInvalid"),
          });
          return;
        }

        let model = {
          id: this.id,
          starting_date: this.starting_date,
          ending_date: this.ending_date,
          vendor_id : this.vendor_id
        };

        api
          .post("addHoliday", JSON.stringify(model), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              this.cancel();
              this.getHolidays();
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
      this.starting_date = null;
      this.ending_date = null;
      this.id = -1;
      this.dialog = false;
    },

    editHoliday(item) {
      this.starting_date = item.starting_date;
      this.ending_date = item.ending_date;
      this.vendor_id = item.vendor_id;
      this.id = item.id;
      this.dialog = true;
    },

    deleteHoliday(item) {
      let model = {
        id: item.id,
      };
      api
        .post("deleteHoliday", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.holidays = this.holidays.filter(holiday => holiday.id != item.id)
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
      if (this.vendors.length > 0) {
        this.vendor_id = this.vendors[0].id;
      }
      this.dialog = true;
    },

    getVendorName(item){
       for (let index = 0; index < this.vendors.length; index++) {
           const element = this.vendors[index];
           if(element.id == item.vendor_id){
               return element[this.selectedLocale.locale == 'en' ? 'en_name' : 'ar_name']
           }
       }
    }
  },

  mounted() {
    this.getHolidays();
  },
  watch: {},
};
</script>
