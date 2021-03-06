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
          <h5
            class="mt-2 text-purple"
            style="font-size: 26px; font-weight: 700"
          >
            {{ product[selectedLocale.locale == "en" ? "en_name" : "ar_name"] }}
          </h5>
          <h6 class="font-weight--bold mt-2 text-purple">
            {{ $t("message.currency") }}
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
            <div
              class="
                control-box
                d-flex
                flex-row
                align-items-center
                product-item
              "
            >
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
                  ? $t("message.added2wishes")
                  : $t("message.add2wishlist")
              }}</v-btn
            >
            <v-btn color="info ml-1" style="flex: 1" @click="add2Cart">{{
              itemExistOnCart ? $t("message.viewCart") : $t("message.add2Cart")
            }}</v-btn>
          </div>
          <a
            target="_blink"
            :href="`https://www.google.com/maps/dir/?api=1&origin=${getAddress}&destination=${location.address}&key=${google_key}`"
            class="d-custom-flex align-items-center mt-5"
          >
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
          </a>
          <div class="d-custom-flex align-items-center mt-2">
            <span class="icon-style" style="font-size: 20px">
              <i class="zmdi zmdi-phone"></i>
            </span>
            <h6 class="text-purple pl-5">
              {{ product.phone }}
            </h6>
          </div>
          <div class="shareOn mt-4 mb-3">
            <ul
              class="footer-widget__contact p-0"
              style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: between;
              "
            >
              <h4 class="my-4 mr-5">{{ $t("message.shareOn") }}</h4>
              <li style="margin-right: 0.55rem">
                <a
                  target="_blank"
                  :href="`https://www.facebook.com/sharer/sharer.php?u=${fullUrl}`"
                  style="color: black"
                >
                  <span class="icon-style" style="font-size: 26px">
                    <i class="ti-facebook"></i>
                  </span>
                </a>
              </li>
              <li style="margin-right: 0.55rem">
                <a
                  target="_blank"
                  :href="`https://twitter.com/home?status=${fullUrl}`"
                  style="color: black"
                >
                  <span class="icon-style" style="font-size: 26px">
                    <i class="ti-twitter-alt"></i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <h5 class="font-weight--bold mt-2 text-purple mt-5">
            {{ $t("message.description") }}
          </h5>
          <div class="font-weight--bold mt-2 text-purple">
            {{
              product[
                selectedLocale.locale == "en"
                  ? "en_description"
                  : "ar_description"
              ]
            }}
          </div>
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
    getAddress() {
      return this.product[
        this.selectedLocale.locale == "en" ? "en_address" : "ar_address"
      ];
    },
  },
  data: function () {
    return {
      loading: false,
      baseUrl: appConfig.baseUrl,
      product_id: -1,
      product: null,
      quantity: 1,
      fullUrl: "",
      location: {},
      google_key: appConfig.googleApiKey,
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
        this.$router.push("/carts/-1");
        return;
      }
      this.product.quantity = this.quantity;
      this.$store.dispatch("addProductToCart", this.product);
    },

    increaseQuantity() {
      this.quantity++;
    },

    decreaseQuantity() {
      if (this.quantity != 1) {
        this.quantity--;
      }
    },
  },
  mounted() {},
  beforeMount() {
    try {
      this.$getLocation(
        {
          enableHighAccuracy: false, //defaults to false
          timeout: Infinity, //defaults to Infinity
          maximumAge: 0, //defaults to 0
        },
        false
      ).then((coordinates) => {
        this.$geocoder.send(coordinates, (response) => {
          this.location = {
            lat: coordinates.lat,
            lng: coordinates.lng,
            address: response.results[0].formatted_address,
          };
        });

        console.log(coordinates);
      });
    } catch (error) {}
    let product_id = this.$route.params.product_id;
    this.product_id = product_id;
    this.fullUrl = this.baseUrl + this.$route.path;
    this.getProduct();
  },
};
</script>
