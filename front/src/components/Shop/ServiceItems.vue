<template>
  <v-row>
    <v-col
      xl="3"
      lg="3"
      md="3"
      sm="12"
      cols="12"
      v-for="(service, index) in servicies"
      :key="`${index}_service`"
      class="shop-content-wrap px-2"
    >
      <service-item :service="service" :small="small"></service-item>
    </v-col>
  </v-row>
</template>
<script>
import ServiceItem from "./ServiceItem";

export default {

  components: {
    ServiceItem,
  },
  props: ["servicies", "small"],
  methods: {},
};
</script>
