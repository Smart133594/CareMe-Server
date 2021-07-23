<template>
  <div class="card center">
    <div id="main-image" :style="{ backgroundImage: `url(${this.imageUrl})` }">
      <div id="inner-div"></div>
    </div>
    <div id="content-container">
      <div class="app-title bold">CareMe</div>
      <div class="card-title light">CareMe</div>
      <div class="app-content light">
        #1 Social Commerce platform in the Middle East
      </div>
      <div class="input-container">
        <div v-if="!mobile">
          <div class="input-label light">
            Enter your phone number to download the app
          </div>
          <form>
            <input
              placeholder="+96887654321"
              v-model="phone"
              type="text"
              class="light"
            />
            <button type="button" @click="submit()" class="light">Send</button>
          </form>

          <p class="input-footnote light">
            By entering your phone number, you consent to the use of your phone
            number to send you a link to the app, and to the use of your phone
            number in accordance with the app's privacy policy. Standard rates
            apply.
          </p>
        </div>
        <div v-else>
            <div class="app-title bold">See this content immediately after install</div>
            <button style="width:100%; margin-top:10px"  type="button" @click="openApp()" class="light">Get The App</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appConfig from "Constants/AppConfig";
import api from "Api";
import Vue from "vue";
import device from "vue-device-detector";
Vue.use(device);
export default {
  components: {},

  data() {
    return {
      loading: false,
      baseUrl: appConfig.baseUrl,
      imageUrl: "",
      phone: "",
      mobile: true,
    };
  },
  computed: {},
  methods: {
    submit() {
      let model = {
        phone: this.phone,
      };
      if (this.phone == "") {
        Vue.notify({
          group: "loggedIn",
          type: "error",
          text: "Please try again with a valid phone number",
        });
        return;
      }
      api
        .post("sendAppUrl", JSON.stringify(model), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data.success) {
            Vue.notify({
              group: "loggedIn",
              type: "success",
              text: "Message sent correctly",
            });
          } else {
            Vue.notify({
              group: "loggedIn",
              type: "error",
              text: "Message failed to send, please try again with a valid phone number",
            });
          }
        })
        .catch((error) => {
          Vue.notify({
            group: "loggedIn",
            type: "error",
            text: "Message failed to send, please try again with a valid phone number",
          });
        })
        .finally(() => {});
    },

    openApp(){
      window.open(" https://play.google.com/store/apps/details?id=com.spokko.witchermonsterslayer","_self")
     
    }
  },

  beforeMount() {
    this.mobile = this.$device.mobile;
    let query = this.$route.query;
    let type = query.t;
    let name = query.n;
    let extension = query.e;
    let image = type + name + "." + extension;
    if (type == "product") {
      type = "products";
    } else if (type == "service"){
      type = "servicies";
    }else{
      type = "vendors";
    }
    this.imageUrl = `${this.baseUrl}uploads/${type}/${image}`;
  },
  mounted() {},
};
</script>

<style scoped>
body {
  background-color: #fff;
  margin: 0;
  line-height: 2;
}
/* Elements */
.card {
  background-color: #fcfcfc;
  width: 830px;
  display: flex;
  display: -webkit-flex;
  display: -ms-flex;
  display: -moz-flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  -moz-flex-direction: row;
}
@media (max-width: 767px) {
  .card {
    width: 100%;
    flex-direction: column !important;
    -webkit-flex-direction: column !important;
    -ms-flex-direction: column !important;
    -moz-flex-direction: column !important;
  }
}
#main-image {
  width: 360px;
  height: 360px;
  background-size: cover;
  background-position: center;
}
#content-container {
  position: relative;
  float: right;
  flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  -moz-flex: 1;
  padding: 24px;
}
.app-title {
  font-size: 14px;
  line-height: 19px;
  padding-bottom: 20px;
  border-bottom: 3px solid #cecece;
  text-transform: uppercase;
}
.card-title {
  margin: 16px 0;
  font-size: 32px;
  line-height: 32px;
}
.app-content {
  margin: 10px 0;
  max-height: 50px;
}
.input-container {
  bottom: 10px;
  left: 24px;
  right: 24px;
  background-color: #fcfcfc;
  -webkit-box-shadow: 0px -20px 20px -8px rgba(252, 252, 252, 1);
  -moz-box-shadow: 0px -20px 20px -8px rgba(252, 252, 252, 1);
  box-shadow: 0px -20px 20px -8px rgba(252, 252, 252, 1);
}

form > input {
  margin-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  -moz-flex: 1;
  background-color: #fff;
  border: 1px solid #979797;
  border-radius: 2px;
  font-size: 18px;
  color: #444;
  line-height: 24px;
  padding-left: 20px;
}
button {
  background-color: #444;
  border: 1px solid #444;
  border-radius: 2px;
  font-size: 20px;
  color: #fff;
  line-height: 27px;
  cursor: pointer;
  padding: 8px;
}
.input-container > form {
  flex-direction: row;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: flex;
}
.input-label {
  padding-bottom: 10px;
}
.input-footnote {
  font-size: 12px;
}
/* No-Data */
.card--no-data {
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  -moz-flex-direction: column;
}
.card--no-data #main-image {
  width: 100%;
  height: 70px;
  padding-top: 25px;
  padding-bottom: 25px;
  background-image: url("https://cdn.branch.io/deepview-no-data-stripes.png");
}
.card--no-data #inner-div {
  padding-left: 25px;
  padding-right: 25px;
}
.card--no-data .input-container {
  position: static;
}
.card--no-data .app-content {
  height: 170px;
  overflow-y: auto;
}
.card--no-data #main-image img {
  float: left;
  width: 60px;
  margin-top: -25px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: -1px 2px 3px 0px rgba(102, 102, 102, 1);
  -moz-box-shadow: -1px 2px 3px 0px rgba(102, 102, 102, 1);
  box-shadow: -1px 2px 3px 0px rgba(102, 102, 102, 1);
}
.card--no-data #main-image .app-title {
  margin-left: 75px;
  margin-top: 35px;
  border: 0;
}
.card--no-data .card-title {
  padding: 0;
}
/* Reusables */
.center {
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: fixed;
}
.bold {
  font-family: "Open Sans", Helvetica, serif;
  font-weight: 700;
}
.light {
  font-family: "Open Sans", Helvetica, serif;
  font-weight: 300;
}
.error {
  color: #ff7878;
}
</style>
