<template>
  <div class="chat-wrapper">
    <vue-perfect-scrollbar :style="getScrollHeight()">
      <v-row class="p-5 m-0">
        <template v-for="(vendor, index) in vendors">
          <v-col
            xl="6"
            lg="4"
            md="6"
            sm="12"
            cols="12"
            :key="`${index}_vendor`"
          >
            <v-checkbox
              color="primary"
              :label="vendor[selectedLocale.locale == 'en' ? 'en_name' : 'ar_name']"
              v-model="user.roles"
              :value="vendor.id"
            ></v-checkbox>
          </v-col>
        </template>
      </v-row>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getCurrentAppLayout } from "Helpers/helpers";

export default {
  props: {
    user: {
      require: true,
    },
    vendors: {
      require: true,
    },
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  data() {
    return {

    };
  },
  components: {},
  mounted() {},
  methods: {
    getScrollHeight() {
      let layout = getCurrentAppLayout(this.$router);
      switch (layout) {
        case "default":
          return "height: calc(100vh - 180px)";
        case "horizontal":
          return "height: calc(100vh - 180px)";
        case "boxed":
          return "height: calc(100vh - 305px)";
        case "boxed-v2":
          return "height: calc(100vh - 305px)";
        default:
          return "height: calc(100vh - 180px)";
      }
    },
  },

  watch: {

  },
};
</script>
