<template>
  <div>
    <app-section-loader :status="loading"></app-section-loader>
    <v-container fluid grid-list-xl py-0> </v-container>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
        loading:false,
    };
  },
  methods: {},
  computed: {},
  mounted() {},
};
</script>
