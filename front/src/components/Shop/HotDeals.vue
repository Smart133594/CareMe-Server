<template>
  <div class="shop-wrapper">
    <service-items :servicies="servicies"></service-items>
    <product-items :products="products"></product-items>
  </div>
</template>

<script>
import ServiceItems from "Components/Shop/ServiceItems";
import ProductItems from "Components/Shop/ProductItems";
import { mapGetters } from "vuex";

export default {
  props: ["servicies", "products"],
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

