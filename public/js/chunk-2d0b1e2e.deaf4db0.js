(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b1e2e"],{2280:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("page-title-bar",{attrs:{hide:!0}}),e("v-container",{staticClass:"grid-list-xl pt-0 mt-n3",attrs:{fluid:""}},[e("v-row",[e("app-card",{attrs:{heading:"English About Us",colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[e("quill-editor",{ref:"enEditor",attrs:{options:t.editorOption},on:{change:function(n){return t.onEnEditorChange(n)}},model:{value:t.aboutUS.en_name,callback:function(n){t.$set(t.aboutUS,"en_name",n)},expression:"aboutUS.en_name"}})],1)],1),e("v-row",[e("app-card",{attrs:{heading:"Arabic About Us",colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[e("quill-editor",{ref:"arEditor",attrs:{options:t.editorOption},on:{change:function(n){return t.onArEditorChange(n)}},model:{value:t.aboutUS.ar_name,callback:function(n){t.$set(t.aboutUS,"ar_name",n)},expression:"aboutUS.ar_name"}})],1)],1),e("v-btn",{staticClass:"ma-2",attrs:{color:"success"},on:{click:function(n){return t.saveItem()}}},[t._v(t._s(t.$t("message.save")))])],1)],1)},o=[],s=e("5530"),i=(e("d3b7"),e("e065")),c=e("2f62"),l=e("365c"),r=e("2b0e"),u={components:{},data:function(){return{loading:!1,editorOption:{},baseUrl:i["a"].baseUrl,aboutUS:{id:-1,en_name:"",ar_name:""}}},computed:Object(s["a"])({},Object(c["b"])(["getUser","selectedLocale"])),methods:{getItems:function(){var t=this;this.loading=!0,console.log("this.aboutUS"),l["a"].get("getAboutUs",{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(n){n.data.success&&null!=n.data.data&&(t.aboutUS=n.data.data)})).catch((function(t){console.log(t)})).finally((function(){t.loading=!1}))},saveItem:function(){var t=this;""!=this.aboutUS.en_name&&""!=this.aboutUS.ar_name?l["a"].post("saveAboutUs",JSON.stringify(this.aboutUS),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(n){n.data.success&&(null!=n.data.data&&(t.aboutUS.id=n.data.data.id),r["default"].notify({group:"loggedIn",type:"success",text:"Saved successfully"}))})).catch((function(t){console.log(t)})).finally((function(){t.loading=!1})):r["default"].notify({group:"loggedIn",type:"error",text:"Input all text correctly"})},onEnEditorChange:function(t){},onArEditorChange:function(t){}},mounted:function(){this.getItems()},beforeMount:function(){}},d=u,f=e("2877"),g=e("6544"),b=e.n(g),p=e("8336"),h=e("a523"),m=e("0fd9"),U=Object(f["a"])(d,a,o,!1,null,null,null);n["default"]=U.exports;b()(U,{VBtn:p["a"],VContainer:h["a"],VRow:m["a"]})}}]);