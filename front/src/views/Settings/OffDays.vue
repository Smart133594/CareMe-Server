<template>
  <div>
    <page-title-bar :hide="true"></page-title-bar>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid p-5>
      <v-select
        :label="$t('message.vendor')"
        :item-text="selectedLocale.locale == 'en' ? 'en_name' : 'ar_name'"
        v-model="vendor_id"
        item-value="id"
        :items="vendors"
      ></v-select>
      <v-checkbox
        v-for="(day, index) in weeks"
        :key="`day${index}`"
        color="primary"
        :label="day.name"
        v-model="off_days"
        :value="day.value"
      />
      <v-btn
        color="info"
        @click.stop="setOffDays"
        :disabled="loading || vendor_id == null"
        :loading="loading"
        >{{ $t("message.save") }}</v-btn
      >
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import api from "Api";
import Vue from "vue";
// import appConfig from "Constants/AppConfig";

export default {
  data: function () {
    return {
      loading: false,
      id: -1,
      off_days: [],
      weeks: [
        { value: 0, name: "Sunday" },
        { value: 1, name: "Monday" },
        { value: 2, name: "Tuesday" },
        { value: 3, name: "Wednesday" },
        { value: 4, name: "Thursday" },
        { value: 5, name: "Friday" },
        { value: 6, name: "Saturday" },
      ],
      vendor_id: null,
      vendors: [],
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },

  methods: {
    getOffDays() {
      this.loading = true;
      api
        .get("getOffDays", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.vendors = response.data.data;
            if (this.vendors.length > 0 && this.vendor_id == null) {
              this.vendor_id = this.vendors[0].id;
            }
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

    setOffDays() {
      this.loading = true;
      let model = {
        vendor_id: this.vendor_id,
        off_days: this.off_days,
      };
      api
        .post("setOffDays", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            this.getOffDays();
            Vue.notify({
              group: "loggedIn",
              type: "success",
              text: this.$t("message.saveSuccess"),
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

  mounted() {
    this.getOffDays();
  },

  watch: {
    vendor_id(new_value) {
      let vendor = null;
      this.vendors.forEach((element) => {
        if (element.id == new_value) vendor = element;
      });

      if (vendor.offday) {
        if (vendor.offday.off_days) {
          this.off_days = vendor.offday.off_days;
        }else{
            this.off_days = []
        }
      }else{
          this.off_days = []
      }
    },
  },
};
</script>
