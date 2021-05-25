<template>
  <div>
    <page-title-bar :hide="true"></page-title-bar>
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
            v-bind:items="clients"
            v-bind:search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`vendor${item.id}`">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.first_name }}</td>
                  <td>{{ item.last_name }}</td>
                  <td>{{ item.phone }}</td>
                  <td>{{ item.email }}</td>
                  <td>
                    <v-img
                      class="my-2"
                      :src="
                        item.avatar
                          ? `${baseUrl}uploads/avatars/${item.avatar}`
                          : '/static/avatars/male.png'
                      "
                      aspect-ratio="2"
                      contain
                    ></v-img>
                  </td>
                  <td>
                    <v-chip
                      class="ma-2"
                      :color="item.active ? 'success' : 'error'"
                    >
                      <v-icon>{{
                        item.active ? "check_circle" : "zmdi-close-circle"
                      }}</v-icon>
                    </v-chip>
                  </td>
                  <td>
                    <v-btn class="ma-2" color="info" @click="manage(item)">{{
                      item.active?$t("message.deActive"):$t("message.active")
                    }}</v-btn>
                    <v-btn
                      class="ma-2"
                      color="error"
                      @click="askDelete(item)"
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
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">{{
          $t("message.deleteItemTitle")
        }}</v-card-title>
        <v-card-text>{{ $t("message.deleteItemContent") }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            text="text"
            @click.stop="deleteClient"
            :disabled="loading"
            >Delete</v-btn
          >
          <v-btn
            color="error"
            text="text"
            @click.stop="deleteDialog = false"
            :disabled="loading"
            >Cancel</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import api from "Api";
import appConfig from "Constants/AppConfig";
export default {
  data: function () {
    return {
      loading: false,
      clients: [],
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      search: "",
      headers: [
        {
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

      deleteDialog: false,
      deleteItem: null,
    };
  },

  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  methods: {
    getClients() {
      this.loading = true;
      api
        .get("getClients", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.clients = response.data.data;
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

    manage(item) {
      this.loading = true;
      let model = {
        id: item.id,
      };
      api
        .post("manageClient", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getClients();
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


    askDelete(item) {
      this.deleteItem = item;
      this.deleteDialog = true;
    },

    deleteClient() {
      this.loading = true;
      let model = {
        id: this.deleteItem.id,
      };
      api
        .post("deleteClient", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getClients();
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
  },
  mounted() {
    this.getClients();
  },
};
</script>
