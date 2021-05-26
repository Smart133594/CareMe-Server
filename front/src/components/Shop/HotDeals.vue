<template>
  <div class="shop-wrapper">
    <service-items :small="small" :servicies="servicies"></service-items>
    <product-items :small="small" :products="products"></product-items>
  </div>
</template>
<script>
import ServiceItems from "Components/Shop/ServiceItems";
import ProductItems from "Components/Shop/ProductItems";
import { mapGetters } from "vuex";

export default {
  props: {
    small: {
      required: false,
      default: false,
    },
    servicies: {
      required: true,
    },
    products: {
      required: true,
    },
  },
  components: {
    ServiceItems,
    ProductItems,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },
  methods: {},
};
</script>

