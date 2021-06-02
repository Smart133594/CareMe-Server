<template>
  <v-container fluid grid-list-xl py-0 my-3>
    <app-card :fullBlock="true" class="title-bar">
      <v-breadcrumbs :items="breadcrumbItems" v-if="breadcrumbItems != null">
        <template slot="item" slot-scope="props">
          <h2 class="text-capitalize mb-0">{{ $t(props.item.title) }}</h2>
          <div class="spacer"></div>
          <v-btn @click="actionClick" v-if="!hide" color="primary">{{
            $t("message.add")
          }}</v-btn>
        </template>
      </v-breadcrumbs>
    </app-card>
  </v-container>
</template>

<script>
export default {
  props: {
    hide: {
      default:false
    },
  },
  data() {
    return {
      breadcrumbItems: [],
      projectId: null,
    };
  },
  created() {
    this.breadcrumbItems[0] = this.$breadcrumbs[0].meta;
  },
  mounted() {
    this.projectId = this.$route.params.id;
  },
  methods: {
    actionClick() {
      this.$emit("actionClick");
    },
  },
};
</script>
