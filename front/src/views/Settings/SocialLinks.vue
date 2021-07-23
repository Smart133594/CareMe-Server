<template>
  <div>
    <page-title-bar :hide="true"></page-title-bar>
    <v-container>
      <v-form>
        <v-text-field
          :label="$t('message.instagram')"
          v-model="social.instagram"
        ></v-text-field>
        <v-text-field
          :label="$t('message.facebook')"
          v-model="social.instagram"
        ></v-text-field>
        <v-text-field
          :label="$t('message.twitter')"
          v-model="social.instagram"
        ></v-text-field>
        <v-text-field
          :label="$t('message.pinterest')"
          v-model="social.instagram"
        ></v-text-field>
      </v-form>
      <v-btn color="success" @click="save()">{{ $t("message.save") }}</v-btn>
    </v-container>
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
      social : {
        instagram:"",
        facebook:"",
        twitter:"",
        pinterest:""
      }
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },

  methods: {
    getSocialLinks() {
      this.loading = true;
      api
        .get("getSocialLinks", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            if(response.data.data != null){
              this.social = response.data.data
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false;
        });
    },

    save() {
      this.loading = true;
      api
        .post("saveSocialLinks", JSON.stringify(this.social), {
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
              text: "Setting Saved",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getSocialLinks();
  },
  beforeMount() {},
};
</script>



