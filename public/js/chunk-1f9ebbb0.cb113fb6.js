(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f9ebbb0"],{"2ef1":function(e,n,t){"use strict";t("db32")},a0e8:function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-container",[t("div",{staticClass:"exchange",domProps:{innerHTML:e._s(e.content)}})])},c=[],o=t("5530"),i=(t("d3b7"),t("365c")),s=t("2f62"),u={components:{},data:function(){return{loading:!1,item:{id:-1,en_name:"",ar_name:""}}},computed:Object(o["a"])(Object(o["a"])({},Object(s["b"])(["getUser","selectedLocale"])),{},{content:function(){return"en"==this.selectedLocale.locale?this.item.en_name:this.item.ar_name}}),methods:{getItems:function(){var e=this;i["a"].get("getExchangeAndReturns",{headers:{"Content-Type":"application/json"}}).then((function(n){n.data.success&&null!=n.data.data&&(e.item=n.data.data)})).catch((function(e){console.log(e)})).finally((function(){e.loading=!1}))}},beforeMount:function(){this.getItems()},mounted:function(){}},l=u,d=(t("2ef1"),t("2877")),r=t("6544"),f=t.n(r),m=t("a523"),b=Object(d["a"])(l,a,c,!1,null,null,null);n["default"]=b.exports;f()(b,{VContainer:m["a"]})},db32:function(e,n,t){}}]);