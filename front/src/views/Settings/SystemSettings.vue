<template>
  <div>
    <page-title-bar :hide="true"></page-title-bar>
    <v-container>
      <v-form>
        <v-text-field
          :label="getDeliveryLabel"
          v-model="delivery_fee"
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
      delivery_fee: "2.00",
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),

    getDeliveryLabel() {
      return (
        this.$t("message.deliveryFee") +
        " (" +
        this.$t("message.currency") +
        ")"
      );
    },
  },

  methods: {
    getSettings() {
      this.loading = true;
      api
        .get("getSystemSettings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            response.data.data.forEach((element) => {
              if (element.key == "delivery_fee") {
                this.delivery_fee = element.value;
              }
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

    save() {
      this.loading = true;

      let model = [];
      let item = { key: "delivery_fee", value:this.delivery_fee };
      model.push(item);
      api
        .post("saveSystemSettings", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getSettings();
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
    this.getSettings();
  },
  beforeMount() {},
};
</script>



