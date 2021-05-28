(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e2c94"],{"7fd3":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("app-section-loader",{attrs:{status:t.loading}}),t.product?e("v-container",[e("v-row",{staticClass:"px-0"},[e("v-col",{staticClass:"shop-wrapper px-5",attrs:{xl:"6",lg:"6",md:"6",sm:"12",xs:"12"}},[e("img",{staticClass:"border",attrs:{src:t.baseUrl+"uploads/products/"+t.product.image,height:"100%",width:"100%"}})]),e("v-col",{staticClass:"shop-wrapper px-5",attrs:{xl:"6",lg:"6",md:"6",sm:"12",cols:"12"}},[e("h5",{staticClass:"mt-2 text-purple",staticStyle:{"font-size":"26px","font-weight":"700"}},[t._v(" "+t._s(t.product["en"==t.selectedLocale.locale?"en_name":"ar_name"])+" ")]),e("h6",{staticClass:"font-weight--bold mt-2 text-purple"},[t._v(" "+t._s(t.$t("message.currency"))+" "+t._s(t.product.price)+" ")]),e("v-rating",{staticStyle:{"margin-left":"-10px"},attrs:{readonly:"","background-color":"orange",color:"orange"},model:{value:t.product.rating,callback:function(s){t.$set(t.product,"rating",s)},expression:"product.rating"}}),e("div",{staticClass:"cart-wrapper"},[e("div",{staticClass:"control-box d-flex flex-row align-items-center product-item"},[e("v-btn",{staticClass:"control-button border",attrs:{text:"",small:""},on:{click:t.decreaseQuantity}},[e("v-icon",{attrs:{dark:""}},[t._v("remove")])],1),e("div",{staticClass:"input-quantity"},[e("p",[t._v(t._s(t.quantity))])]),e("v-btn",{staticClass:"control-button border",attrs:{text:"",small:""},on:{click:t.increaseQuantity}},[e("v-icon",{attrs:{dark:""}},[t._v("add")])],1)],1)]),e("div",{staticClass:"d-custom-flex align-items-center mt-5"},[e("v-btn",{staticStyle:{flex:"1"},attrs:{color:"secondary mr-1",disabled:t.itemExist},on:{click:t.addWish}},[t._v(t._s(t.itemExist?t.$t("message.added2wishlist"):t.$t("message.add2wishlist")))]),e("v-btn",{staticStyle:{flex:"1"},attrs:{color:"info ml-1"},on:{click:t.add2Cart}},[t._v(t._s(t.itemExistOnCart?t.$t("message.viewCart"):t.$t("message.add2Cart")))])],1),e("div",{staticClass:"d-custom-flex align-items-center mt-5"},[e("span",{staticClass:"icon-style",staticStyle:{"font-size":"20px"}},[e("i",{staticClass:"ti-location-pin"})]),e("h6",{staticClass:"text-purple pl-5"},[t._v(" "+t._s(t.product["en"==t.selectedLocale.locale?"en_address":"ar_address"])+" ")])]),e("div",{staticClass:"d-custom-flex align-items-center mt-2"},[e("span",{staticClass:"icon-style",staticStyle:{"font-size":"20px"}},[e("i",{staticClass:"zmdi zmdi-phone"})]),e("h6",{staticClass:"text-purple pl-5"},[t._v(" "+t._s(t.product.phone)+" ")])]),e("h5",{staticClass:"font-weight--bold mt-2 text-purple mt-5"},[t._v(" "+t._s(t.$t("message.description"))+" ")]),e("div",{staticClass:"font-weight--bold mt-2 text-purple"},[t._v(t._s(t.product["en"==t.selectedLocale.locale?"en_description":"ar_description"]))])],1)],1)],1):t._e()],1)},i=[],r=e("5530"),n=(e("d3b7"),e("365c")),o=e("e065"),c=e("2f62"),d=e("2b0e"),l={computed:Object(r["a"])(Object(r["a"])({},Object(c["b"])(["cart","getUser","selectedLocale"])),{},{itemExist:function(){var t=this.getUser;if(null==t)return!1;for(var s=t.wishes,e=0;e<s.length;e++)if(parseInt(this.product.id)==parseInt(s[e].product_id))return!0;return!1},itemExistOnCart:function(){for(var t=this.cart,s=0;s<t.length;s++){var e=t[s];if(e.id==this.product.id)return!0}return!1}}),data:function(){return{loading:!1,baseUrl:o["a"].testMode?o["a"].localhost:o["a"].domain,product_id:-1,product:null,quantity:1}},methods:{getProduct:function(){var t=this;this.loading=!0,n["a"].get("getProduct/".concat(this.product_id),{headers:{"Content-Type":"application/json"}}).then((function(s){if(s.data.success){var e=s.data.data;t.product=e}})).finally((function(){t.loading=!1}))},addWish:function(){var t=this;if(null==this.getUser)d["default"].notify({group:"center",type:"error",text:this.$t("message.youNeedToLoginFirst")});else{this.loading=!0;var s={product_id:this.product.id,service_id:-1};n["a"].post("addWish",JSON.stringify(s),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(s){s.data.success&&(d["default"].notify({group:"center",type:"success",text:t.$t("message.added2WishList")}),t.getUser.wishes.push(s.data.data),localStorage.setItem("user",JSON.stringify(t.getUser)))})).finally((function(){t.loading=!1}))}},add2Cart:function(){this.itemExistOnCart?this.$router.push("/carts"):(this.product.quantity=this.quantity,this.$store.dispatch("addProductToCart",this.product))},increaseQuantity:function(){this.quantity++},decreaseQuantity:function(){1!=this.quantity&&this.quantity--}},mounted:function(){},beforeMount:function(){var t=this.$route.params.product_id;this.product_id=t,this.getProduct()}},u=l,p=e("2877"),h=e("6544"),f=e.n(h),g=e("8336"),m=e("62ad"),v=e("a523"),_=e("132d"),x=e("1d4d"),y=e("0fd9"),C=Object(p["a"])(u,a,i,!1,null,null,null);s["default"]=C.exports;f()(C,{VBtn:g["a"],VCol:m["a"],VContainer:v["a"],VIcon:_["a"],VRating:x["a"],VRow:y["a"]})}}]);