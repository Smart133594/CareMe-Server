<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container v-if="product">
      <v-row class="px-0">
        <v-col xl="6" lg="6" md="6" sm="12" xs="12" class="shop-wrapper px-5">
          <img
            :src="`${baseUrl}uploads/products/${product.image}`"
            height="100%"
            width="100%"
            class="border"
          />
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="12" cols="12" class="shop-wrapper px-5">
          <h5 class="mt-2 text-purple" style="font-size:26px; font-weight:700">
            {{ product[selectedLocale.locale == "en" ? "en_name" : "ar_name"] }}
          </h5>
          <h6 class="font-weight--bold mt-2 text-purple">
            {{ $t('message.currency') }}
            {{ product.price }}
          </h6>
          <v-rating
            style="margin-left: -10px"
            readonly
            v-model="product.rating"
            background-color="orange"
            color="orange"
          ></v-rating>
          <div class="cart-wrapper">
            <div class="control-box d-flex flex-row align-items-center product-item">
              <v-btn
                text
                class="control-button border"
                small
                @click="decreaseQuantity"
              >
                <v-icon dark>remove</v-icon>
              </v-btn>
              <div class="input-quantity">
                <p>{{ quantity }}</p>
              </div>
              <v-btn
                text
                class="control-button border"
                small
                @click="increaseQuantity"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="d-custom-flex align-items-center mt-5">
            <v-btn
              color="secondary mr-1"
              style="flex: 1"
              @click="addWish"
              :disabled="itemExist"
              >{{
                itemExist
                  ? $t("message.added2wishlist")
                  : $t("message.add2wishlist")
              }}</v-btn
            >
            <v-btn color="info ml-1" style="flex: 1" @click="add2Cart">{{
              itemExistOnCart ? $t("message.viewCart") : $t("message.add2Cart")
            }}</v-btn>
          </div>

          <div class="d-custom-flex align-items-center mt-5">
            <span class="icon-style" style="font-size: 20px">
              <i class="ti-location-pin"></i>
            </span>
            <h6 class="text-purple pl-5">
              {{
                product[
                  selectedLocale.locale == "en" ? "en_address" : "ar_address"
                ]
              }}
            </h6>
          </div>
          <div class="d-custom-flex align-items-center mt-2">
            <span class="icon-style" style="font-size: 20px">
              <i class="zmdi zmdi-phone"></i>
            </span>
            <h6 class="text-purple pl-5">
              {{ product.phone }}
            </h6>
          </div>
          <h5 class="font-weight--bold mt-2 text-purple mt-5">
            {{ $t("message.description") }}
          </h5>
          <div class="font-weight--bold mt-2 text-purple">{{
            product[
              selectedLocale.locale == "en"
                ? "en_description"
                : "ar_description"
            ]
          }}</div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "Api";
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import Vue from "vue";

export default {
  computed: {
    ...mapGetters(["cart", "getUser", "selectedLocale"]),
    itemExist() {
      let user = this.getUser;
      if (user == null) return false;
      let wishes = user.wishes;
      for (let index = 0; index < wishes.length; index++) {
        if (parseInt(this.product.id) == parseInt(wishes[index].product_id)) {
          return true;
        }
      }
      return false;
    },

    itemExistOnCart() {
      let carts = this.cart;
      for (let index = 0; index < carts.length; index++) {
        const element = carts[index];
        if (element.id == this.product.id) {
          return true;
        }
      }
      return false;
    },
  },
  data: function () {
    return {
      loading: false,
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
      product_id: -1,
      product: null,
      quantity: 1,
    };
  },
  methods: {
    getProduct() {
      this.loading = true;
      api
        .get(`getProduct/${this.product_id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            let product = response.data.data;
            this.product = product;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    addWish() {
      if (this.getUser == null) {
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.youNeedToLoginFirst"),
        });
      } else {
        this.loading = true;
        let model = {
          product_id: this.product.id,
          service_id: -1,
        };
        api
          .post("addWish", JSON.stringify(model), {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getUser.token}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              Vue.notify({
                group: "center",
                type: "success",
                text: this.$t("message.added2WishList"),
              });
              this.getUser.wishes.push(response.data.data);
              localStorage.setItem("user", JSON.stringify(this.getUser));
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    add2Cart() {
      if (this.itemExistOnCart) {
        this.$router.push("/carts");
        return;
      }
      this.product.quantity = this.quantity;
      this.$store.dispatch("addProductToCart", this.product);
    },

    increaseQuantity() {
        this.quantity ++;
    },

    decreaseQuantity() {
        if(this.quantity != 1){
            this.quantity --
        }
    },
  },
  mounted() {},
  beforeMount() {
    let product_id = this.$route.params.product_id;
    this.product_id = product_id;
    this.getProduct();
  },
};
</script>
