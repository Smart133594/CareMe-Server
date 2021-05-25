<template>
  <div>
    <page-title-bar @actionClick="dialog = true"></page-title-bar>
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
            v-bind:items="workers"
            v-bind:search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`worker${item.id}`">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <v-img
                      class="my-2"
                      :src="
                        item.image
                          ? `${baseUrl}uploads/workers/${item.image}`
                          : '/static/avatars/male.png'
                      "
                      aspect-ratio="2"
                      contain
                    ></v-img>
                  </td>
                  <td>{{ item.first_name }}</td>
                  <td>{{ item.last_name }}</td>

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
                    <v-btn class="ma-2" color="primary" @click="edit(item)">{{
                      $t("message.edit")
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
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          {{ $t("message.worker") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid">
            <div class="user-image text-center mb-4 center">
              <img
                @click="chooseFiles"
                :src="image ? image : '/static/avatars/male.png'"
                class="img-responsive rounded-circle"
                alt="user images"
                style="width: 100px; height: 100px"
              />
              <input
                id="fileUpload"
                type="file"
                hidden
                :accept="['.jpg', '.jpeg', '.gif', '.png']"
                @change="uploadImageFile"
              />
            </div>
            <v-text-field
              :label="$t('message.firstName')"
              v-model="first_name"
              :rules="requireRule"
              required
            ></v-text-field>
            <v-text-field
              :label="$t('message.lastName')"
              v-model="last_name"
              :rules="requireRule"
              required
            ></v-text-field>
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
            <v-row style="margin-top: 10px">
              <h5>{{ $t("message.selectServicies") }}</h5>
              <v-col
                cols="12"
                sm="6"
                v-for="(service, index) in totalServicies"
                :key="`service${index}`"
              >
                <v-checkbox
                  :style="`margin-top:${index < 2 ? -5 : -30}px`"
                  color="primary"
                  :label="
                    service[
                      selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'
                    ]
                  "
                  v-model="servicies"
                  :value="service.id"
                />
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
            @click.stop="deleteWorker"
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
import api from "Api";
import Vue from "vue";
import appConfig from "Constants/AppConfig";
export default {
  components: {},
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  data: function () {
    return {
      dialog: false,
      valid: false,
      loading: false,
      requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
      country: "om",
      search: "",
      id: -1,
      first_name: "",
      last_name: "",
      image: null,
      active: true,
      servicies: [],
      workers: [],
      selectedItem: null,
      deleteDialog: false,
      headers: [
        {
          text: this.$t("message.no"),
          value: "no",
          align: "center",
        },
        {
          text: this.$t("message.image"),
          value: "image",
          align: "center",
        },
        {
          text: this.$t("message.firstName"),
          value: "first_name",
          align: "center",
        },
        {
          text: this.$t("message.lastName"),
          value: "last_name",
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
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      totalServicies: [],
    };
  },
  methods: {
    getWorkers() {
      this.loading = true;
      api
        .get("getWorkers", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            let workers = response.data.data.workers;
            workers.forEach(worker => {
                let servicies = worker.servicies
                worker.servicies = JSON.parse(servicies)
            });
            this.workers = workers
            this.totalServicies = response.data.data.servicies;
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
        this.loading = true;
        const model = {
          id: this.id,
          first_name: this.first_name,
          last_name: this.last_name,
          image: this.image,
          active: this.active,
          servicies: this.servicies,
        };
        api
          .post("addWorker", JSON.stringify(model), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              this.cancel();
              this.getWorkers();
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
      this.active = true;
      this.image = null;
      this.id = -1;
      this.last_name = "";
      this.first_name = "";
      this.servicies = [];
      this.dialog = false;
    },

    chooseFiles() {
      document.getElementById("fileUpload").click();
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
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    askDelete(item) {
      this.selectedItem = item;
      this.deleteDialog = true;
    },

    edit(item) {
      this.id = item.id;
      this.first_name = item.first_name;
      this.last_name = item.last_name;
      this.image = item.image
        ? this.baseUrl + "uploads/workers/" + item.image
        : item.image;
      this.active = item.active == 1;
      this.servicies = item.servicies;
      this.dialog = true;
    },

    deleteWorker() {
      this.loading = true;
      let model = {
        id: this.selectedItem.id,
      };
      api
        .post("deleteWorker", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getWorkers();
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
  },
  mounted() {
    this.getWorkers();
  },
};
</script>


<style lang="scss" scoped>
@import "../../assets/scss/_app.variables.scss";

.form-country-flag {
  display: flex;
  flex-direction: row;
  align-items: center;
  .flag-form {
    flex: 1;
  }
}
</style>
