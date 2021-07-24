(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22202e"],{cd90:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("app-section-loader",{attrs:{status:e.loading}}),a("v-container",{attrs:{fluid:"","grid-list-xl":"","p-5":""}},[a("app-card",{attrs:{colClasses:"col-12 col-sm-6 col-md-6"}},[null!=e.tempUser?a("v-form",{staticClass:"mb-5",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-row",{staticClass:"px-3 input-row"},[a("div",{staticClass:"user-image text-sm-center mb-4"},[a("img",{staticClass:"img-responsive rounded-circle",attrs:{src:e.getAvatar,alt:"user images",width:"95",height:"95"},on:{click:e.chooseFiles}}),a("input",{attrs:{id:"fileUpload",type:"file",hidden:"",accept:[".jpg",".jpeg",".gif",".png"]},on:{change:e.uploadImageFile}})])]),a("v-row",{staticClass:"px-3 input-row"},[a("v-text-field",{attrs:{"prepend-icon":"check",label:e.$t("message.phone"),readonly:""},model:{value:e.tempUser.phone,callback:function(t){e.$set(e.tempUser,"phone",t)},expression:"tempUser.phone"}}),a("v-text-field",{attrs:{rules:e.requireRule,"prepend-icon":"perm_identity",label:e.$t("message.firstName"),required:""},model:{value:e.tempUser.first_name,callback:function(t){e.$set(e.tempUser,"first_name",t)},expression:"tempUser.first_name"}}),a("v-text-field",{attrs:{rules:e.requireRule,"prepend-icon":"perm_identity",label:e.$t("message.lastName"),required:""},model:{value:e.tempUser.last_name,callback:function(t){e.$set(e.tempUser,"last_name",t)},expression:"tempUser.last_name"}}),a("v-text-field",{attrs:{rules:e.emailRules,"prepend-icon":"mail",label:e.$t("message.email"),required:""},model:{value:e.tempUser.email,callback:function(t){e.$set(e.tempUser,"email",t)},expression:"tempUser.email"}}),a("v-text-field",{attrs:{label:"Password","prepend-icon":"ti-lock",rules:e.requireRule,type:"password",required:""},model:{value:e.tempUser.password,callback:function(t){e.$set(e.tempUser,"password",t)},expression:"tempUser.password"}})],1)],1):e._e(),a("v-card-actions",[a("div",{staticClass:"spacer"}),a("v-btn",{attrs:{color:"info",disabled:!e.valid,loading:e.loading},on:{click:function(t){return t.stopPropagation(),e.save(t)}}},[e._v(e._s(e.$t("message.save")))])],1)],1)],1)],1)},r=[],i=a("5530"),n=(a("caad"),a("2532"),a("99af"),a("d3b7"),a("2f62")),l=a("365c"),o=a("2b0e"),c=a("e065"),d={components:{},data:function(){var e=this;return{loading:!1,valid:!1,baseUrl:c["a"].baseUrl,tempUser:null,requireRule:[function(t){return!!t||e.$t("message.fieldRequired")}],emailRules:[function(t){return!!t||e.$t("message.fieldRequired")},function(e){return/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(e)||"E-mail must be valid"}]}},computed:Object(i["a"])(Object(i["a"])({},Object(n["b"])(["getUser","selectedLocale"])),{},{getAvatar:function(){return null==this.tempUser||null==this.tempUser.avatar?"/static/avatars/male.png":this.tempUser.avatar.includes("data:image")?this.tempUser.avatar:"".concat(this.baseUrl,"uploads/avatars/").concat(this.tempUser.avatar)}}),methods:{chooseFiles:function(){document.getElementById("fileUpload").click()},uploadImageFile:function(e){var t=e.target.files||e.dataTransfer.files;t.length||(this.tempUser.avatar=null);var a=t[0],s=a["type"],r=["image/gif","image/jpeg","image/png","image/jpg"];r.includes(s)?this.createImage(a):o["default"].notify({group:"loggedIn",type:"error",text:this.$t("message.selectValidImage")})},createImage:function(e){var t=this,a=new FileReader;a.onload=function(e){t.tempUser.avatar=e.target.result},a.readAsDataURL(e)},save:function(){var e=this;this.loading=!0,l["a"].post("changedProfile",JSON.stringify(this.tempUser),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(t){if(t.data.success){var a=t.data.data;e.tempUser.avatar=a.avatar;var s=e.tempUser;e.$store.dispatch("changedUser",{model:s})}else o["default"].notify({group:"loggedIn",type:"error",text:e.$t("message.registerFailed")})})).catch((function(e){o["default"].notify({group:"loggedIn",type:"error",text:e})})).finally((function(){e.loading=!1}))}},mounted:function(){},beforeMount:function(){this.tempUser=Object(i["a"])({},this.getUser)}},p=d,u=a("2877"),m=a("6544"),g=a.n(m),f=a("8336"),v=a("99d9"),h=a("a523"),U=a("4bd4"),b=a("0fd9"),w=a("8654"),x=Object(u["a"])(p,s,r,!1,null,null,null);t["default"]=x.exports;g()(x,{VBtn:f["a"],VCardActions:v["a"],VContainer:h["a"],VForm:U["a"],VRow:b["a"],VTextField:w["a"]})}}]);