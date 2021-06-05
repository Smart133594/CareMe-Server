<template>
  <app-card customClasses="product-item" :footer="true" class="border">
    <div @click.stop="go2Profile">
      <div class="overlay-wrap pos-relative mb-5">
        <figure class="img-wrapper mb-0">
          <img
            :src="`${baseUrl}uploads/products/${product.image}`"
            :height="small ? '200px' : '230px'"
            width="100%"
          />
          <figcaption>
            <h6
              class="font-weight--bold mt-2 text-purple item-title"
              :class="{ small: small }"
            >
              {{
                product[selectedLocale.locale == "en" ? "en_name" : "ar_name"]
              }}
            </h6>
            <v-rating
              readonly
              v-model="product.rating"
              background-color="orange"
              color="orange"
              :small="small"
            ></v-rating>
          </figcaption>
        </figure>
      </div>
      <div class="product-info px-1">
        <h6 class="font-weight--bold mt-2 text-purple item-title">
          {{ product[selectedLocale.locale == "en" ? "en_name" : "ar_name"] }}
        </h6>
        <p class="fs-14 mb-4 product-description" v-if="!small">
          {{
            textTruncate(
              product[
                selectedLocale.locale == "en"
                  ? "en_description"
                  : "ar_description"
              ]
            )
          }}
        </p>
        <div
          class="price-box discount d-custom-flex justify-space-between align-items-center mt-2"
          v-if="parseFloat(product.price) > 7"
        >
          <div style="height: 100%">
            <span class="fw-semi-bold d-block price"
              >{{$t('message.currency')}} {{ get2DecimalPoint(product.price) }}</span
            >
            <span class="fw-semi-bold d-block discount-price"
              >{{$t('message.currency')}}
              {{get2DecimalPoint(product.old_price)}}</span
            >
          </div>
          <span class="tag align-items-center" :class="{'discountpercent-before':selectedLocale.locale == 'en', 'discountpercent-after':selectedLocale.locale == 'ar'}">
            {{ product.discount_price }}%
          </span>
        </div>
        <div class="price-box" v-else>
          <span class="fw-semi-bold d-block"
            >{{$t('message.currency')}} {{ get2DecimalPoint(product.price) }}</span
          >
        </div>
      </div>
    </div>
    <div
      slot="footer"
      class="justify-space-between d-custom-flex align-items-center"
    >
      <v-btn text class="action-button" @click="add2Cart">{{
        itemExistOnCart ? $t("message.added2Cart") : $t("message.add2Cart")
      }}</v-btn>
      <v-tooltip top v-if="itemExist">
        <template v-slot:activator="{ on }">
          <v-icon
            class="wish-list-button"
            @click="removeWish"
            :disabled="loading"
            v-on="on"
            >favorite</v-icon
          >
        </template>
        <span>{{ $t("message.removefromwishlist") }}</span>
      </v-tooltip>
      <v-tooltip top v-else>
        <template v-slot:activator="{ on }">
          <v-icon
            class="wish-list-button"
            @click="addWish"
            v-on="on"
            :disabled="loading"
            >ti-heart</v-icon
          >
        </template>
        <span>{{ $t("message.add2wishlist") }}</span>
      </v-tooltip>
      <!-- favorite -->
    </div>
  </app-card>
</template>

<script>
import { mapGetters } from "vuex";
import {
  textTruncate,
  getCurrentAppLayout,
  get2DecimalPoint,
  getBeforePrice,
} from "Helpers/helpers";
import appConfig from "Constants/AppConfig";
import Vue from "vue";
import api from "Api";

export default {
  props: ["product", "small"],
  data() {
    return {
      loading: false,
      baseUrl: appConfig.testMode ? appConfig.localhost : appConfig.domain,
    };
  },
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
  methods: {
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },
    textTruncate(text) {
      if (this.small) {
        return textTruncate(text, 28);
      }
      return textTruncate(text, 34);
    },

    get2DecimalPoint(number) {
      return get2DecimalPoint(number);
    },

    getBeforePrice(price, discount) {
      return getBeforePrice(price, discount);
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
          service_id: -1,
          product_id: this.product.id,
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
    removeWish() {
      if (this.getUser == null) {
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.youNeedToLoginFirst"),
        });
      } else {
        this.loading = true;
        let model = {
          service_id: -1,
          product_id: this.product.id,
        };
        api
          .post("removeWish", JSON.stringify(model), {
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
                text: this.$t("message.removedFWishList"),
              });
              this.getUser.wishes = this.getUser.wishes.filter(
                (wish) => parseInt(wish.product_id) != parseInt(this.product.id)
              );
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
        Vue.notify({
          group: "center",
          type: "error",
          text: this.$t("message.alreadyAddedToCart"),
        });
        return;
      }
      this.product.quantity = 1;
      this.$store.dispatch("addProductToCart", this.product);
    },

    go2Profile() {
      this.$router.push(`/product/${this.product.id}`);
    },
  },
};
</script>

