<template>
  <div>
    <page-title-bar @actionClick="addNew"></page-title-bar>
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
            v-bind:items="categories"
            v-bind:search="search"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.en_name }}</td>
                  <td>{{ item.ar_name }}</td>
                  <td>
                    <v-img
                      class="my-2"
                      :src="`${baseUrl}uploads/categories/${item.image}`"
                      aspect-ratio="2"
                    ></v-img>
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
                      <!-- {{ item.active ? $t("actived") : $t("disabled") }} -->
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
          {{ $t("message.category") }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form v-model="valid">
            <div class="user-image text-center my-4">
              <img
                @click="chooseFiles"
                :src="image ? image : '/static/img/gallery.png'"
                class="img-responsive"
                alt="user images"
                style="height: 200px"
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
              :label="$t('message.enName')"
              v-model="en_name"
              :rules="enNameRules"
              required
            ></v-text-field>
            <v-text-field
              :label="$t('message.arName')"
              v-model="ar_name"
              :rules="arNameRules"
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
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="spacer"></div>
          <v-btn
            color="info"
            @click.stop="save"
            :disabled="!valid || image == '' || loading"
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
            @click.stop="deleteCategory"
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
  components: {},
  data() {
    return {
      valid: false,
      dialog: false,
      search: "",
      image: "",
      en_name: "",
      enNameRules: [(v) => !!v || this.$t("message.fieldRequired")],
      ar_name: "",
      arNameRules: [(v) => !!v || this.$t("message.fieldRequired")],
      active: true,
      id: -1,
      loading: false,

      headers: [
        {
          text: this.$t("message.no"),
          value: "no",
          align: "center",
        },
        {
          text: this.$t("message.enName"),
          value: "en_name",
          align: "center",
        },
        {
          text: this.$t("message.arName"),
          value: "ar_name",
          align: "center",
        },
        {
          text: this.$t("message.image"),
          value: "image",
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

      categories: [],
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      deleteDialog: false,
      deleteItem: null,
    };
  },

  computed: {
    ...mapGetters(["getUser"]),
  },

  methods: {
    addNew() {
      this.dialog = true;
    },

    save() {
      if (this.valid) {
        let model = {
          id: this.id,
          en_name: this.en_name,
          ar_name: this.ar_name,
          active: this.active,
          image: this.image,
        };
        this.loading = true;
        api
          .post("addCategory", JSON.stringify(model), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              Vue.notify({
                group: "loggedIn",
                type: "success",
                text: this.$t("message.registeredSuccessfully"),
              });
              this.cancel()
              this.getCategories()
            } else {
              Vue.notify({
                group: "loggedIn",
                type: "error",
                text: this.$t("message.registerFailed"),
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
            this.cancel();
          });
      }
    },

    cancel() {
      this.image = "";
      this.en_name = "";
      this.ar_name = "";
      this.active = true;
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

    getCategories() {
      this.loading = true;
      api
        .get("getCategories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.categories = response.data.data;
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

    deleteCategory() {
      this.loading = true;
      let model = {
        id: this.deleteItem.id,
      };
      api
        .post("deleteCategory", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getCategories();
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
      this.en_name = item.en_name;
      this.ar_name = item.ar_name;
      this.image = this.baseUrl + "uploads/categories/" + item.image;
      this.active = item.active == 1;
      this.dialog = true;
    },
  },

  mounted() {
    this.getCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/_app.variables.scss";
</style>
