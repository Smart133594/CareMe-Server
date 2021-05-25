<template>
  <v-dialog v-model="open" persistent max-width="600">
    <v-card class="pa-4">
      <v-btn style="margin-left:-10px" color="primary" text fab small @click="back">
        <v-icon>ti-arrow-left</v-icon>
      </v-btn>
      <CardForm
        :form-data="formData"
        @input-card-number="updateCardNumber"
        @input-card-name="updateCardName"
        @input-card-month="updateCardMonth"
        @input-card-year="updateCardYear"
        @input-card-cvv="updateCardCvv"
        :randomBackgrounds="false"
        :loading="loading"
        @submit="submit"
        @cancel="close"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import CardForm from "./components/CardForm";
export default {
  components: {
    CardForm,
  },
  props: [],
  data() {
    return {
      open: false,
      formData: {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      },
      loading: false,
    };
  },
  methods: {
    openDialog() {
      this.open = true;
    },
    close() {
      this.open = false;
    },
    flipCard(status) {
      this.isCardFlipped = status;
    },
    updateCardNumber(val) {},
    updateCardName(val) {},
    updateCardMonth(val) {},
    updateCardYear(val) {},
    updateCardCvv(val) {},
    submit() {
      this.loading = true;
      this.formData = {
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
      };
    },

    back() {
      this.$emit("back");
    },
  },

  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style lang="scss">
@import "./components/style.scss";
</style>
