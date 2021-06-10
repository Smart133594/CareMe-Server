<template>
  <div>
    <page-title-bar @actionClick="dialog = true"></page-title-bar>
    <app-section-loader :status="loading"></app-section-loader>
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
            v-bind:items="banners"
            v-bind:search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`service${item.id}`">
                  <td>{{ index + 1 }}</td>
                  <td>
                    {{ item.title }}
                  </td>
                  <td>
                    {{ item.start_date }}
                  </td>
                  <td>
                    {{ item.expire_date }}
                  </td>

                  <td>
                    <v-img
                      class="my-2"
                      :src="`${baseUrl}uploads/banners/${item.image}`"
                      aspect-ratio="2"
                    ></v-img>
                  </td>

                  <td>
                    {{
                      item.creator
                    }}
                  </td>

                  <td>
                    <v-chip
                      class="ma-2"
                      :color="item.active ? 'success' : 'error'"
                      text-color="white"
                    >
                      <v-icon>{{
                        item.active ? "check_circle" : "zmdi-close-circle"
                      }}</v-icon>
                    </v-chip>
                  </td>

                  <td>
                    <!-- <v-btn class="ma-2" color="primary" @click="edit(item)">{{
                      $t("message.edit")
                    }}</v-btn> -->
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

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          {{ $t("message.banners") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-text-field
                :label="$t('message.title')"
                v-model="title"
                :rules="requireRule"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-menu
                ref="start_date"
                :close-on-content-click="false"
                transition="scale-transition"
                v-model="startingMenu"
                offset-y
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="start_date"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :label="$t('message.startingDate')"
                    v-model="start_date"
                    prepend-icon="event"
                    readonly
                    :rules="requireRule"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="start_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="startingMenu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="warning"
                    @click="$refs.start_date.save(start_date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-row>
            <v-row>
              <v-menu
                ref="expire_date"
                :close-on-content-click="false"
                transition="scale-transition"
                v-model="expireMenu"
                offset-y
                :nudge-right="40"
                min-width="290px"
                :return-value.sync="expire_date"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-on="on"
                    :label="$t('message.endingDate')"
                    v-model="expire_date"
                    prepend-icon="event"
                    readonly
                    :rules="requireRule"
                    required
                  ></v-text-field>
                </template>
                <v-date-picker v-model="expire_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="expireMenu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    color="warning"
                    @click="$refs.expire_date.save(expire_date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-row>
            <v-row>
              <v-radio-group
                v-model="active"
                row
                class="pt-0"
                :label="$t('message.active')"
              >
                <v-radio
                  color="primary"
                  :label="$t('message.yes')"
                  :value="true"
                ></v-radio>
                <v-radio
                  color="primary"
                  :label="$t('message.no')"
                  :value="false"
                ></v-radio>
              </v-radio-group>
            </v-row>
            <v-row>
              <v-img
                @click="chooseFiles"
                class="my-2"
                :src="image ? image : '/static/img/gallery.png'"
                aspect-ratio="1"
                style="height: 200px"
                contain
              ></v-img>
              <input
                id="fileUpload"
                type="file"
                hidden
                :accept="['.jpg', '.jpeg', '.gif', '.png']"
                @change="uploadImageFile"
              />
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="spacer"></div>
          <v-btn
            color="info"
            @click.stop="save"
            :disabled="!valid || loading || !image"
            :loading="loading"
            >{{ $t("message.save") }}</v-btn
          >
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
          <v-btn
            color="warning"
            text="text"
            @click.stop="deleteBanner"
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
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import api from "Api";
import Vue from "vue";
export default {
  components: {},

  data: function () {
    return {
      loading: false,
      banners: [],
      baseUrl: appConfig.baseUrl,
      dialog: false,
      valid: false,

      title: "",
      image: null,
      start_date: null,
      expire_date: null,
      active: true,
      id :-1,

      startingMenu: false,
      expireMenu: false,
      requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
      search: "",
      headers: [
        {
          text: this.$t("message.no"),
          value: "no",
          align: "center",
        },
        {
          text: this.$t("message.title"),
          value: "title",
          align: "center",
        },
        {
          text: this.$t("message.startingDate"),
          value: "start_date",
          align: "center",
        },
        {
          text: this.$t("message.endingDate"),
          value: "expire_date",
          align: "center",
        },
        {
          text: this.$t("message.image"),
          value: "image",
          align: "center",
        },
        {
          text: this.$t("message.creator"),
          value: "creator",
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
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },

  methods: {
    getBanners() {
      this.loading = true;
      api
        .get("getBanners", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.banners = response.data.data;
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

    deleteBanner() {
      this.loading = true;
      let model = {
        id: this.selectedItem.id,
      };
      api
        .post("deleteBanner", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getBanners();
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

    cancel() {
        this.id = -1,
      this.title = "";
      this.image = null;
      this.start_date = null;
      this.expire_date = null;
      this.active = true;
      this.dialog = false;
    },

    save() {
      if (this.start_date > this.expire_date) {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: this.$t("message.dateInvalid"),
        });
        return;
      }

      let model = {
        id: this.id,
        title: this.title,
        start_date: this.start_date,
        expire_date: this.expire_date,
        image: this.image,
        active: this.active,
      };

      this.loading = true;
      api
        .post("addBanner", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
              this.cancel();
            this.getBanners();
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
    askDelete(item) {
      this.selectedItem = item;
      this.deleteDialog = true;
    },
  },
  mounted() {
    this.getBanners();
  },
  beforeMount() {},
};
</script>



