<template>
   <v-card class="chat-content">
      <v-toolbar color="primary" dark>
         <v-toolbar-title>{{$t('message.providers')}}</v-toolbar-title>
         <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
         <vue-perfect-scrollbar class="chat-sidebar-scroll" :style="getScrollHeight()" :settings="settings">
            <template v-for="(item, index) in users">
					<v-list-item
						:key="index"
						@click="openVendor(item)"
						:class="{'grayish-blue': item.selected }"
					>
						<v-list-item-avatar class="my-0 mr-4">
							<img :src="item.avatar?`${baseUrl}uploads/avatars/${item.avatar}`:'/static/avatars/male.png'">
						</v-list-item-avatar>
						<v-list-item-content class="py-0">
							<h6 class="mb-1" v-html="item.full_name"></h6>
						</v-list-item-content>
					</v-list-item>
            </template>
         </vue-perfect-scrollbar>
      </v-list>
   </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { getCurrentAppLayout } from "Helpers/helpers";

export default {
  computed: {
    ...mapGetters(["selectedUser"])
  },
  props:{
    users :{
        require:true,
    },
    baseUrl:{
        require:true
    }
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 160
      },
    };
  },
  methods: {
    openVendor(user) {
      this.users.forEach(element => {
        element.selected = false;
      });
      user.selected = true
      this.$emit('openVendor', user);
    },
    getScrollHeight() {
      let layout = getCurrentAppLayout(this.$router);
      switch (layout) {
        case "default":
          return "height: calc(100vh - 180px)";
        case "horizontal":
          return "height: calc(100vh - 180px)";
        case "boxed":
          return "height: calc(100vh - 305px)";
        case "boxed-v2":
          return "height: calc(100vh - 305px)";
        default:
          return "height: calc(100vh - 180px)";
      }
    }
  }
};
</script>
