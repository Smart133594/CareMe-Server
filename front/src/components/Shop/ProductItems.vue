<template>
  <v-row>
    <v-col
      xl="3"
      lg="3"
      md="3"
      sm="12"
      cols="12"
      v-for="(product, index) in products"
      :key="`${index}_product`"
      class="shop-content-wrap px-2"
    >
      <product-item :product="product" :small="small"></product-item>
    </v-col>
  </v-row>
</template>
<script>
import ProductItem from "./ProductItem";

export default {
  components: {
    ProductItem,
  },
  props: ["products", "small"],
  methods: {},
};
</script>
