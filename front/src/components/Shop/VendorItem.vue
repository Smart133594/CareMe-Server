<template>
  <div
    class="single-flexible-slider wow move-up border"
    style="cursor: pointer"
    @click="itemClicked(vendor)"
  >
    <figure class="img-wrapper mb-0">
      <v-img
        :src="`${baseUrl}uploads/vendors/${vendor.image}`"
        alt="project-1"
        style="height: 200px"
      >
      </v-img>
      <figcaption>
        <h6
          class="font-weight--bold mt-2 text-purple item-title"
          :class="{ small: small }"
        >
          {{ vendor[selectedLocale.locale == "en" ? "en_name" : "ar_name"] }}
        </h6>
        <v-rating
          readonly
          v-model="vendor.rating"
          background-color="orange"
          color="orange"
          :small="small"
        ></v-rating>
      </figcaption>
    </figure>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import appConfig from "Constants/AppConfig";

export default {
  props: ["vendor", "small"],
  data() {
    return {
      loading: false,
      baseUrl: appConfig.baseUrl,
    };
  },
  computed: {
    ...mapGetters(["cart", "getUser", "selectedLocale"]),
  },
  methods: {
    itemClicked(item) {
      this.$router.push(`/vendor-details/${item.id}`);
    },
  },
};
</script>

