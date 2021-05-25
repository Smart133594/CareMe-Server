<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid grid-list-xl p-5>
      <app-card colClasses="col-12 col-sm-6 col-md-6">
        <v-form v-model="valid" class="mb-5" v-if="tempUser != null">
          <v-row class="px-3 input-row">
            <div class="user-image text-sm-center mb-4">
              <img
                :src="getAvatar"
                @click="chooseFiles"
                class="img-responsive rounded-circle"
                alt="user images"
                width="95"
                height="95"
              />
              <input
                id="fileUpload"
                type="file"
                hidden
                :accept="['.jpg', '.jpeg', '.gif', '.png']"
                @change="uploadImageFile"
              />
            </div>
          </v-row>
          <v-row class="px-3 input-row">
            <v-text-field
              v-model="tempUser.phone"
              prepend-icon="check"
              :label="$t('message.phone')"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="tempUser.first_name"
              :rules="requireRule"
              prepend-icon="perm_identity"
              :label="$t('message.firstName')"
              required
            ></v-text-field>
            <v-text-field
              v-model="tempUser.last_name"
              :rules="requireRule"
              prepend-icon="perm_identity"
              :label="$t('message.lastName')"
              required
            ></v-text-field>
            <v-text-field
              v-model="tempUser.email"
              :rules="emailRules"
              prepend-icon="mail"
              :label="$t('message.email')"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="tempUser.password"
              prepend-icon="ti-lock"
              :rules="requireRule"
              type="password"
              required
            ></v-text-field>
          </v-row>
        </v-form>
        <v-card-actions>
          <div class="spacer"></div>
          <v-btn
            color="info"
            @click.stop="save"
            :disabled="!valid"
            :loading="loading"
            >{{ $t("message.save") }}</v-btn
          >
        </v-card-actions>
      </app-card>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "Api";
import Vue from "vue";
import appConfig from "Constants/AppConfig";
export default {
  components: {},

  data: function () {
    return {
      loading: false,
      valid: false,
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      tempUser: null,
      requireRule: [(v) => !!v || this.$t("message.fieldRequired")],
      emailRules: [
        (v) => !!v || this.$t("message.fieldRequired"),
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
    getAvatar() {
      if (this.tempUser == null) {
        return "/static/avatars/male.png";
      } else {
        if (this.tempUser.avatar == null) {
          return "/static/avatars/male.png";
        } else {
          if (this.tempUser.avatar.includes("data:image")) {
            return this.tempUser.avatar;
          }
          return `${this.baseUrl}uploads/avatars/${this.tempUser.avatar}`;
        }
      }
    },
  },

  methods: {
    chooseFiles: function () {
      document.getElementById("fileUpload").click();
    },

    uploadImageFile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.tempUser.avatar = null;
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
        this.tempUser.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    save() {
      this.loading = true;
      api
        .post("changedProfile", JSON.stringify(this.tempUser), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            let user = response.data.data;
            this.tempUser.avatar = user.avatar;
            let model = this.tempUser;
            this.$store.dispatch("changedUser", { model });
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
        });
    },
  },

  mounted() {},
  beforeMount() {
    this.tempUser = { ...this.getUser };
  },
};
</script>
