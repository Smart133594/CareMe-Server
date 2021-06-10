<template>
  <app-card customClasses="product-item" class="border p-0">
    <div class="d-custom-flex align-items-center">
      <img
        :src="`${baseUrl}uploads/products/${product.image}`"
        height="100px"
        width="100px"
      />
      <div class="d-flex flex-column px-2" style="flex:1">
            <h6 class="text-purple item-title">{{product[selectedLocale.locale == "en" ? "en_name" : "ar_name"]}}</h6>
            <h6 class="text-purple item-title mt-2">{{$t('message.currency')}} {{product['price']}}</h6>
            <div class="control-box d-flex justify-content-between mt-2">
                <div class="d-flex flex-row align-items-center" >
                    <v-btn text class="control-button border" :disabled="product.quantity == 1" small @click="decreaseQuantity">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                    <div class="input-quantity">
                        <p>{{product.quantity}}</p>
                    </div>
                    <v-btn text class="control-button border" small @click="increaseQuantity">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                </div>
                <v-btn text class="control-button border" small @click="deleteCart">
                    <v-icon dark small>ti-trash</v-icon>
                </v-btn>
            </div>
      </div>
    </div>
  </app-card>
</template>

<script>
import { mapGetters } from "vuex";
import appConfig from "Constants/AppConfig";

export default {
  props: ["product"],
  data() {
    return {
      loading: false,
      baseUrl: appConfig.baseUrl,
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
      decreaseQuantity(){
        if(this.product.quantity == 1){
          return
        }
        this.$store.dispatch('changeQuantityHandler', {product:this.product, quantity:-1})
      },

      increaseQuantity(){
        this.$store.dispatch('changeQuantityHandler', {product:this.product, quantity:1})
      },

      deleteCart(){
        this.$store.dispatch('onDeleteProductFromCart', {product:this.product})
      }
  },
};
</script>

