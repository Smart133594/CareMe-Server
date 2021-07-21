<template>
  <div>
    <page-title-bar :hide="true"></page-title-bar>
    <v-container fluid class="grid-list-xl pt-0 mt-n3">
      <v-row>
        <app-card
          heading="English About Us"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <quill-editor v-model="item.en_name"
            ref="enEditor"
            @change="onEnEditorChange($event)"
            :options="editorOption"
          >
          </quill-editor>
        </app-card>
      </v-row>
      <v-row>
        <app-card
          heading="Arabic About Us"
          colClasses="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        >
          <quill-editor v-model="item.ar_name"
            ref="arEditor"
            :options="editorOption"
            @change="onArEditorChange($event)"
          >
          </quill-editor>
        </app-card>
      </v-row>
      <v-btn
        class="ma-2"
        color="success"
        @click="saveItem()"
        >{{$t('message.save')}}</v-btn
      >
		</v-container>
  </div>
</template>
<script>
import appConfig from "Constants/AppConfig";
import { mapGetters } from "vuex";
import api from "Api";
import Vue from "vue";
export default {
  components: {},
  data: function () {
    return {
      loading: false,
      editorOption: {
      },
      baseUrl: appConfig.baseUrl,
      item:{
        id:-1,
        en_name:"",
        ar_name:""
      }
    };
  },
  computed: {
    ...mapGetters(["getUser", "selectedLocale"]),
  },

  methods: {
    getItems() {
      this.loading = true;
      api
        .get("getPolicy", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            if(response.data.data != null){
              this.item = response.data.data;
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false;
        });
    },

    saveItem(){
      if (this.item.en_name == "" || this.item.ar_name == "") {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Input all text correctly",
        });
        return;
      }

      api
        .post("savePolicy", JSON.stringify(this.item),{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getUser.token}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            if(response.data.data != null){
              this.item.id = response.data.data.id;
            }
            Vue.notify({
              group: "loggedIn",
              type: "success",
              text: "Saved successfully",
            });
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onEnEditorChange($event){
    },

    onArEditorChange($event){
    },
  },
  mounted() {
    this.getItems();
  },
  beforeMount() {},
};
</script>



