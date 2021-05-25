<!-- Side Structure -->
<template>
  <div class="sidebar" :class="sidebarSelectedFilter.class">
    <vue-perfect-scrollbar class="scroll-area" :settings="settings">
      <div class="transparent navigation">
        <v-list>
          <app-logo></app-logo>
          <user-block></user-block>
          <template v-for="(category, key) in menus">
            <div :key="key">
              <div class="sidebar-title px-4">
                <span>{{ $t(key) }}</span>
              </div>
              <template v-for="item in category">
                <template v-if="item.items != null">
                  <v-list-group
                    :ripple="false"
                    :key="item.title"
                    prepend-icon="arrow_right"
                    append-icon=""
                    no-action
                    v-model="item.active"
                  >
                    <v-list-item slot="activator" :ripple="false">
                      <v-list-item-content>
                        <v-list-item-title v-if="item.items != null">
                          <i class="mr-3 zmdi" :class="item.action"></i>
                          <span>{{ textTruncate($t(item.title)) }}</span>
                          <template v-if="item.label == 'New'">
                            <span class="sidebar-label">{{ item.label }}</span>
                          </template>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      :ripple="false"
                      v-for="subItem in item.items"
                      v-bind:key="subItem.title"
                      :to="
                        !subItem.exact
                          ? `/${getCurrentAppLayoutHandler() + subItem.path}`
                          : subItem.path
                      "
                    >
                      <template v-if="subItem !== null">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ textTruncate($t(subItem.title)) }}
                            <template v-if="subItem.label == 'New'">
                              <span class="sidebar-label">New</span>
                            </template>
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-group>
                </template>
                <template v-else>
                  <v-list-group
                    :ripple="false"
                    class="not-submenu"
                    :key="item.title"
                    prepend-icon="arrow_right"
                    append-icon=""
                    no-action
                    v-model="item.active"
                  >
                    <v-list-item slot="activator" :ripple="false">
                      <v-list-item-content>
                        <v-list-item-title>
                          <router-link style="text-decoration:none"
                            :to="
                              !item.exact
                                ? `/${getCurrentAppLayoutHandler() + item.path}`
                                : item.path
                            "
                          >
                            <i class="mr-3 zmdi" :class="item.action"></i>
                            <span>{{ textTruncate($t(item.title)) }}</span>
                            <template v-if="item.label == 'New'">
                              <span class="sidebar-label">New</span>
                            </template>
                          </router-link>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </template>
              </template>
            </div>
          </template>
        </v-list>
      </div>
    </vue-perfect-scrollbar>
  </div>
</template>

<script>
import UserBlock from "./UserBlock";
import { textTruncate, getCurrentAppLayout } from "Helpers/helpers";
import { mapGetters } from "vuex";
import AppLogo from "Components/AppLogo/AppLogo";

export default {
  data() {
    return {
      settings: {
        maxScrollbarLength: 160,
      },
    };
  },
  components: {
    UserBlock,
    AppLogo,
  },
  computed: {
    ...mapGetters(["sidebarSelectedFilter", "menus", "getUser"]),
  },
  methods: {
    textTruncate(text) {
      return textTruncate(text, 18);
    },
    getCurrentAppLayoutHandler() {
      return getCurrentAppLayout(this.$router);
    },
  },
  beforeMount() {
    this.$store.dispatch("setRoleMenus", { role: this.getUser.role });
  },
};
</script>
