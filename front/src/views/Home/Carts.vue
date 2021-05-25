<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container v-if="!loading && cart.length > 0">
      <v-row class="cart-wrapper">
        <v-col xl="6" lg="6" md="6" sm="12" xs="12">
          <v-row>
            <div
              v-for="(product, index) in cart"
              :key="`${index}_product`"
              :class="{ 'mt-5': index != 0 }"
            >
              <cart-item :product="product"></cart-item>
            </div>
          </v-row>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="12" xs="12">
          <check-out></check-out>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "Api";
import CartItem from "Components/Shop/CartItem";
import CheckOut from "Components/Shop/CheckOut";
// import Vue from "vue";

export default {
  computed: {
    ...mapGetters(["getUser", "selectedLocale", "cart"]),
  },
  components: {
    CartItem,
    CheckOut,
  },

  data: function () {
    return {
      loading: false,
    };
  },

  methods: {
    getCarts() {
      this.loading = true;
      api
        .post(`getCarts`, JSON.stringify(this.cart), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            let products = response.data.data;
            this.$store.dispatch("updateCart", products);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

  },

  mounted() {},
  beforeMount() {
    this.getCarts();
  },
};
</script>

