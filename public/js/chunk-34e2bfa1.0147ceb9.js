(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34e2bfa1"],{"17fd":function(t,a,e){"use strict";var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-form"},[e("div",{staticClass:"card-list"},[e("Card",{attrs:{fields:t.fields,labels:t.formData,isCardNumberMasked:t.isCardNumberMasked,randomBackgrounds:t.randomBackgrounds,backgroundImage:t.backgroundImage}})],1),e("div",{staticClass:"card-form__inner"},[e("div",{staticClass:"card-form__row"},[e("div",{staticClass:"card-form__col"},[e("div",{staticClass:"card-input"},[e("label",{staticClass:"card-input__label",attrs:{for:"cardNumber"}},[t._v(t._s(t.$t("message.cardNumber")))]),e("input",{staticClass:"card-input__input",attrs:{type:"tel",id:t.fields.cardNumber,maxlength:t.cardNumberMaxLength,"data-card-field":"",autocomplete:"off"},domProps:{value:t.formData.cardNumber},on:{input:t.changeNumber,focus:t.focusCardNumber,blur:t.blurCardNumber}}),e("button",{staticClass:"card-input__eye",class:{"-active":!t.isCardNumberMasked},attrs:{title:"Show/Hide card number",tabindex:"-1",disabled:""===t.formData.cardNumber},on:{click:t.toggleMask}})])]),e("div",{staticClass:"card-form__col"},[e("div",{staticClass:"card-input"},[e("label",{staticClass:"card-input__label",attrs:{for:"cardName"}},[t._v(t._s(t.$t("message.cardName")))]),e("input",{directives:[{name:"letter-only",rawName:"v-letter-only"}],staticClass:"card-input__input",attrs:{type:"text",id:t.fields.cardName,"data-card-field":"",autocomplete:"off"},domProps:{value:t.formData.cardName},on:{input:t.changeName}})])])]),e("div",{staticClass:"card-form__row"},[e("div",{staticClass:"card-form__col"},[e("div",{staticClass:"card-form__group"},[e("label",{staticClass:"card-input__label",attrs:{for:"cardMonth"}},[t._v(t._s(t.$t("message.expirationDate")))]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.formData.cardMonth,expression:"formData.cardMonth"}],staticClass:"card-input__input -select",attrs:{id:t.fields.cardMonth,"data-card-field":""},on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.formData,"cardMonth",a.target.multiple?e:e[0])},t.changeMonth]}},[e("option",{attrs:{value:"",disabled:"",selected:""}},[t._v(t._s(t.$t("message.month")))]),t._l(12,(function(a){return e("option",{key:a,attrs:{disabled:a<t.minCardMonth},domProps:{value:a<10?"0"+a:a}},[t._v(" "+t._s(t.generateMonthValue(a))+" ")])}))],2),e("select",{directives:[{name:"model",rawName:"v-model",value:t.formData.cardYear,expression:"formData.cardYear"}],staticClass:"card-input__input -select",attrs:{id:t.fields.cardYear,"data-card-field":""},on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.formData,"cardYear",a.target.multiple?e:e[0])},t.changeYear]}},[e("option",{attrs:{value:"",disabled:"",selected:""}},[t._v(t._s(t.$t("message.year")))]),t._l(12,(function(a,r){return e("option",{key:a,domProps:{value:r+t.minCardYear}},[t._v(" "+t._s(r+t.minCardYear)+" ")])}))],2)])]),e("div",{staticClass:"card-form__col -cvv"},[e("div",{staticClass:"card-input"},[e("label",{staticClass:"card-input__label",attrs:{for:"cardCvv"}},[t._v(t._s(t.$t("message.CVV")))]),e("input",{directives:[{name:"number-only",rawName:"v-number-only"}],staticClass:"card-input__input",attrs:{type:"tel",id:t.fields.cardCvv,maxlength:"4","data-card-field":"",autocomplete:"off"},domProps:{value:t.formData.cardCvv},on:{input:t.changeCvv}})])])])]),t.submitButton?e("v-btn",{staticClass:"card-form__button",attrs:{loading:t.loading},on:{click:t.invaildCard}},[t._v(" "+t._s(t.$t("message.submit"))+" ")]):t._e()],1)},s=[],c=(e("ac1f"),e("5319"),e("1276"),e("159b"),e("498a"),e("a15b"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-item",class:{"-active":t.isCardFlipped}},[e("div",{staticClass:"card-item__side -front"},[e("div",{ref:"focusElement",staticClass:"card-item__focus",class:{"-active":t.focusElementStyle},style:t.focusElementStyle}),e("div",{staticClass:"card-item__cover"},[t.currentCardBackground?e("img",{staticClass:"card-item__bg",attrs:{src:t.currentCardBackground}}):t._e()]),e("div",{staticClass:"card-item__wrapper"},[e("div",{staticClass:"card-item__top"},[e("img",{staticClass:"card-item__chip",attrs:{src:"https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"}}),e("div",{staticClass:"card-item__type"},[e("transition",{attrs:{name:"slide-fade-up"}},[t.cardType?e("img",{key:t.cardType,staticClass:"card-item__typeImg",attrs:{src:"https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/"+t.cardType+".png",alt:""}}):t._e()])],1)]),e("label",{ref:t.fields.cardNumber,staticClass:"card-item__number",attrs:{for:t.fields.cardNumber}},[t._l(t.currentPlaceholder,(function(a,r){return e("span",{key:r},[e("transition",{attrs:{name:"slide-fade-up"}},[t.getIsNumberMasked(r,a)?e("div",{staticClass:"card-item__numberItem"},[t._v("*")]):t.labels.cardNumber.length>r?e("div",{key:t.currentPlaceholder,staticClass:"card-item__numberItem",class:{"-active":""===a.trim()}},[t._v(t._s(t.labels.cardNumber[r]))]):e("div",{key:t.currentPlaceholder+1,staticClass:"card-item__numberItem",class:{"-active":""===a.trim()}},[t._v(t._s(a))])])],1)}))],2),e("div",{staticClass:"card-item__content"},[e("label",{ref:t.fields.cardName,staticClass:"card-item__info",attrs:{for:t.fields.cardName}},[e("div",{staticClass:"card-item__holder"},[t._v(t._s(t.$t("message.cardHolder")))]),e("transition",{attrs:{name:"slide-fade-up"}},[t.labels.cardName.length?e("div",{key:"1",staticClass:"card-item__name"},[e("transition-group",{attrs:{name:"slide-fade-right"}},t._l(t.labels.cardName.replace(/\s\s+/g," "),(function(a,r){return e("span",{key:r+1,staticClass:"card-item__nameItem"},[t._v(t._s(a))])})),0)],1):e("div",{key:"2",staticClass:"card-item__name"},[t._v(t._s(t.$t("message.fullName")))])])],1),e("div",{ref:"cardDate",staticClass:"card-item__date"},[e("label",{staticClass:"card-item__dateTitle",attrs:{for:t.fields.cardMonth}},[t._v(t._s(t.$t("message.expires")))]),e("label",{staticClass:"card-item__dateItem",attrs:{for:t.fields.cardMonth}},[e("transition",{attrs:{name:"slide-fade-up"}},[t.labels.cardMonth?e("span",{key:t.labels.cardMonth},[t._v(t._s(t.labels.cardMonth))]):e("span",{key:"2"},[t._v(t._s(t.$t("message.MM")))])])],1),t._v(" / "),e("label",{staticClass:"card-item__dateItem",attrs:{for:"cardYear"}},[e("transition",{attrs:{name:"slide-fade-up"}},[t.labels.cardYear?e("span",{key:t.labels.cardYear},[t._v(t._s(String(t.labels.cardYear).slice(2,4)))]):e("span",{key:"2"},[t._v(t._s(t.$t("message.YY")))])])],1)])])])]),e("div",{staticClass:"card-item__side -back"},[e("div",{staticClass:"card-item__cover"},[t.currentCardBackground?e("img",{staticClass:"card-item__bg",attrs:{src:t.currentCardBackground}}):t._e()]),e("div",{staticClass:"card-item__band"}),e("div",{staticClass:"card-item__cvv"},[e("div",{staticClass:"card-item__cvvTitle"},[t._v("CVV")]),e("div",{staticClass:"card-item__cvvBand"},t._l(t.labels.cardCvv,(function(a,r){return e("span",{key:r},[t._v("*")])})),0),e("div",{staticClass:"card-item__type"},[t.cardType?e("img",{staticClass:"card-item__typeImg",attrs:{src:"https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/"+t.cardType+".png"}}):t._e()])])])])}),i=[],n=(e("4d63"),e("25f0"),e("466d"),e("99af"),{name:"Card",props:{labels:Object,fields:Object,isCardNumberMasked:Boolean,randomBackgrounds:{type:Boolean,default:!0},backgroundImage:[String,Object]},data:function(){return{focusElementStyle:null,currentFocus:null,isFocused:!1,isCardFlipped:!1,amexCardPlaceholder:"#### ###### #####",dinersCardPlaceholder:"#### ###### ####",defaultCardPlaceholder:"#### #### #### ####",currentPlaceholder:""}},watch:{currentFocus:function(){this.currentFocus?this.changeFocus():this.focusElementStyle=null},cardType:function(){this.changePlaceholder()}},mounted:function(){var t=this;this.changePlaceholder();var a=this,e=document.querySelectorAll("[data-card-field]");e.forEach((function(e){e.addEventListener("focus",(function(){t.isFocused=!0,e.id===t.fields.cardYear||e.id===t.fields.cardMonth?t.currentFocus="cardDate":t.currentFocus=e.id,t.isCardFlipped=e.id===t.fields.cardCvv})),e.addEventListener("blur",(function(){t.isCardFlipped=!e.id===t.fields.cardCvv,setTimeout((function(){a.isFocused||(a.currentFocus=null)}),300),a.isFocused=!1}))}))},computed:{cardType:function(){var t=this.labels.cardNumber,a=new RegExp("^4");return null!=t.match(a)?"visa":(a=new RegExp("^(34|37)"),null!=t.match(a)?"amex":(a=new RegExp("^5[1-5]"),null!=t.match(a)?"mastercard":(a=new RegExp("^6011"),null!=t.match(a)?"discover":(a=new RegExp("^62"),null!=t.match(a)?"unionpay":(a=new RegExp("^9792"),null!=t.match(a)?"troy":(a=new RegExp("^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}"),null!=t.match(a)?"dinersclub":(a=new RegExp("^35(2[89]|[3-8])"),null!=t.match(a)?"jcb":"")))))))},currentCardBackground:function(){if(this.randomBackgrounds&&!this.backgroundImage){var t=Math.floor(25*Math.random()+1);return"https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/".concat(t,".jpeg")}return this.backgroundImage?this.backgroundImage:null}},methods:{changeFocus:function(){var t=this.$refs[this.currentFocus];this.focusElementStyle=t?{width:"".concat(t.offsetWidth,"px"),height:"".concat(t.offsetHeight,"px"),transform:"translateX(".concat(t.offsetLeft,"px) translateY(").concat(t.offsetTop,"px)")}:null},getIsNumberMasked:function(t,a){return t>4&&t<14&&this.labels.cardNumber.length>t&&""!==a.trim()&&this.isCardNumberMasked},changePlaceholder:function(){var t=this;"amex"===this.cardType?this.currentPlaceholder=this.amexCardPlaceholder:"dinersclub"===this.cardType?this.currentPlaceholder=this.dinersCardPlaceholder:this.currentPlaceholder=this.defaultCardPlaceholder,this.$nextTick((function(){t.changeFocus()}))}}}),o=n,l=e("2877"),d=Object(l["a"])(o,c,i,!1,null,null,null),u=d.exports,m=e("2b0e"),p={name:"CardForm",directives:{"number-only":{bind:function(t){function a(t){if(t.target.value=t.target.value.replace(/[^0-9]/g,""),t.charCode>=48&&t.charCode<=57)return!0;t.preventDefault()}t.addEventListener("keypress",a)}},"letter-only":{bind:function(t){function a(t){return t.charCode>=48&&t.charCode<=57&&t.preventDefault(),!0}t.addEventListener("keypress",a)}}},props:{formData:{type:Object,default:function(){return{cardName:"",cardNumber:"",cardNumberNotMask:"",cardMonth:"",cardYear:"",cardCvv:""}}},backgroundImage:[String,Object],randomBackgrounds:{type:Boolean,default:!0},loading:{type:Boolean,default:!1},submitButton:{type:Boolean,default:!1}},components:{Card:u},data:function(){return{fields:{cardNumber:"v-card-number",cardName:"v-card-name",cardMonth:"v-card-month",cardYear:"v-card-year",cardCvv:"v-card-cvv"},minCardYear:(new Date).getFullYear(),isCardNumberMasked:!0,mainCardNumber:this.cardNumber,cardNumberMaxLength:19}},computed:{minCardMonth:function(){return this.formData.cardYear===this.minCardYear?(new Date).getMonth()+1:1}},watch:{cardYear:function(){this.formData.cardMonth<this.minCardMonth&&(this.formData.cardMonth="")}},mounted:function(){this.maskCardNumber()},methods:{generateMonthValue:function(t){return t<10?"0".concat(t):t},changeName:function(t){this.formData.cardName=t.target.value,this.$emit("input-card-name",this.formData.cardName)},changeNumber:function(t){this.formData.cardNumber=t.target.value;var a=this.formData.cardNumber.replace(/\D/g,"");if(/^3[47]\d{0,13}$/.test(a)?(this.formData.cardNumber=a.replace(/(\d{4})/,"$1 ").replace(/(\d{4}) (\d{6})/,"$1 $2 "),this.cardNumberMaxLength=17):/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(a)?(this.formData.cardNumber=a.replace(/(\d{4})/,"$1 ").replace(/(\d{4}) (\d{6})/,"$1 $2 "),this.cardNumberMaxLength=16):/^\d{0,16}$/.test(a)&&(this.formData.cardNumber=a.replace(/(\d{4})/,"$1 ").replace(/(\d{4}) (\d{4})/,"$1 $2 ").replace(/(\d{4}) (\d{4}) (\d{4})/,"$1 $2 $3 "),this.cardNumberMaxLength=19),"deleteContentBackward"==t.inputType){var e=this.formData.cardNumber.substring(this.formData.cardNumber.length,this.formData.cardNumber.length-1);" "==e&&(this.formData.cardNumber=this.formData.cardNumber.substring(0,this.formData.cardNumber.length-1))}this.$emit("input-card-number",this.formData.cardNumber)},changeMonth:function(){this.$emit("input-card-month",this.formData.cardMonth)},changeYear:function(){this.$emit("input-card-year",this.formData.cardYear)},changeCvv:function(t){this.formData.cardCvv=t.target.value,this.$emit("input-card-cvv",this.formData.cardCvv)},invaildCard:function(){for(var t=this.formData.cardNumberNotMask.replace(/ /g,""),a=0,e=0;e<t.length;e++){var r=parseInt(t.substr(e,1));e%2===0&&(r*=2,r>9&&(r=1+r%10)),a+=r}a%10!==0||""==this.formData.cardNumber?m["default"].notify({group:"center",type:"error",text:this.$t("message.invalidCardNumber")}):""==this.formData.cardMonth?m["default"].notify({group:"center",type:"error",text:this.$t("message.invalidCardMonth")}):""==this.formData.cardYear?m["default"].notify({group:"center",type:"error",text:this.$t("message.invalidCardYear")}):""==this.formData.cardCvv?m["default"].notify({group:"center",type:"error",text:this.$t("message.invalidCardCVV")}):this.$emit("submit")},blurCardNumber:function(){this.isCardNumberMasked&&this.maskCardNumber()},maskCardNumber:function(){this.formData.cardNumberNotMask=this.formData.cardNumber,this.mainCardNumber=this.formData.cardNumber;var t=this.formData.cardNumber.split("");t.forEach((function(a,e){e>4&&e<14&&""!==a.trim()&&(t[e]="*")})),this.formData.cardNumber=t.join("")},unMaskCardNumber:function(){this.formData.cardNumber=this.mainCardNumber},focusCardNumber:function(){this.unMaskCardNumber()},toggleMask:function(){this.isCardNumberMasked=!this.isCardNumberMasked,this.isCardNumberMasked?this.maskCardNumber():this.unMaskCardNumber()}}},f=p,h=e("6544"),v=e.n(h),g=e("8336"),_=Object(l["a"])(f,r,s,!1,null,null,null);a["a"]=_.exports;v()(_,{VBtn:g["a"]})},"25e7":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("app-section-loader",{attrs:{status:t.loading}}),!t.loading&&t.cart.length>0?e("v-container",[e("v-row",{staticClass:"cart-wrapper"},[e("v-col",{attrs:{xl:"6",lg:"6",md:"6",sm:"12",xs:"12"}},[e("v-row",t._l(t.cart,(function(t,a){return e("div",{key:a+"_product",class:{"mt-5":0!=a}},[e("cart-item",{attrs:{product:t}})],1)})),0)],1),e("v-col",{attrs:{xl:"6",lg:"6",md:"6",sm:"12",xs:"12"}},[e("check-out")],1)],1)],1):t._e()],1)},s=[],c=e("5530"),i=(e("d3b7"),e("2f62")),n=e("365c"),o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("app-card",{staticClass:"border p-0",attrs:{customClasses:"product-item"}},[e("div",{staticClass:"d-custom-flex align-items-center"},[e("img",{attrs:{src:t.baseUrl+"uploads/products/"+t.product.image,height:"100px",width:"100px"}}),e("div",{staticClass:"d-flex flex-column px-2",staticStyle:{flex:"1"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(t.product["en"==t.selectedLocale.locale?"en_name":"ar_name"]))]),e("h6",{staticClass:"text-purple item-title mt-2"},[t._v(t._s(t.$t("message.currency"))+" "+t._s(t.product["price"]))]),e("div",{staticClass:"control-box d-flex justify-content-between mt-2"},[e("div",{staticClass:"d-flex flex-row align-items-center"},[e("v-btn",{staticClass:"control-button border",attrs:{text:"",small:""},on:{click:t.decreaseQuantity}},[e("v-icon",{attrs:{dark:""}},[t._v("remove")])],1),e("div",{staticClass:"input-quantity"},[e("p",[t._v(t._s(t.product.quantity))])]),e("v-btn",{staticClass:"control-button border",attrs:{text:"",small:""},on:{click:t.increaseQuantity}},[e("v-icon",{attrs:{dark:""}},[t._v("add")])],1)],1),e("v-btn",{staticClass:"control-button border",attrs:{text:"",small:""},on:{click:t.deleteCart}},[e("v-icon",{attrs:{dark:"",small:""}},[t._v("ti-trash")])],1)],1)])])])},l=[],d=e("e065"),u={props:["product"],data:function(){return{loading:!1,baseUrl:d["a"].testMode?d["a"].localhost:d["a"].domain}},computed:Object(c["a"])(Object(c["a"])({},Object(i["b"])(["cart","getUser","selectedLocale"])),{},{itemExist:function(){var t=this.getUser;if(null==t)return!1;for(var a=t.wishes,e=0;e<a.length;e++)if(parseInt(this.product.id)==parseInt(a[e].product_id))return!0;return!1},itemExistOnCart:function(){for(var t=this.cart,a=0;a<t.length;a++){var e=t[a];if(e.id==this.product.id)return!0}return!1}}),methods:{decreaseQuantity:function(){this.$store.dispatch("changeQuantityHandler",{product:this.product,quantity:-1})},increaseQuantity:function(){this.$store.dispatch("changeQuantityHandler",{product:this.product,quantity:1})},deleteCart:function(){this.$store.dispatch("onDeleteProductFromCart",{product:this.product})}}},m=u,p=e("2877"),f=e("6544"),h=e.n(f),v=e("8336"),g=e("132d"),_=Object(p["a"])(m,o,l,!1,null,null,null),b=_.exports;h()(_,{VBtn:v["a"],VIcon:g["a"]});var C=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("app-card",{staticClass:"border",attrs:{customClasses:"product-item"}},[e("div",{staticClass:"d-flex flex-column"},[e("div",{staticClass:"d-flex flex-direction-row"},[e("v-text-field",{attrs:{color:"warning",rules:t.requireRule,required:"",label:t.$t("message.couponCode"),solo:"",disabled:t.loading||t.coupon_percent>0},model:{value:t.coupon,callback:function(a){t.coupon=a},expression:"coupon"}}),e("v-btn",{staticClass:"ml-2",attrs:{color:"warning",height:"48px",disabled:t.coupon_percent>0},on:{click:t.applyCoupon}},[t._v(t._s(t.$t("message.apply")))])],1),e("h5",{staticClass:"text-purple"},[t._v(" "+t._s(1==t.cart.length?t.$t("message.thereIs")+" 1 "+t.$t("message.item"):t.$t("message.thereAre")+" "+t.cart.length+" "+t.$t("message.items"))+" ")]),e("v-row",[e("v-col",{attrs:{cols:"5"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(t.$t("message.name")))])]),e("v-col",{attrs:{cols:"2"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(t.$t("message.quantity")))])]),e("v-col",{attrs:{cols:"2"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(t.$t("message.price")))])]),e("v-col",{attrs:{cols:"3"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(t.$t("message.total")))])])],1),t._l(t.cart,(function(a,r){return e("div",{key:r+"_cart",staticClass:"mt-2"},[e("v-row",{staticClass:"align-items-center"},[e("v-col",{attrs:{cols:"5"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(a["en"==t.selectedLocale.locale?"en_name":"ar_name"])+" ")])]),e("v-col",{attrs:{cols:"2"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(a.quantity))])]),e("v-col",{attrs:{cols:"2"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(t._s(a.price))])]),e("v-col",{attrs:{cols:"3"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.currency"))+" "+t._s((a.price*a.quantity).toFixed(2))+" ")])])],1)],1)})),e("v-divider"),e("v-row",{staticClass:"align-items-center"},[e("v-col",{attrs:{cols:"9"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.subTotal"))+" ")])]),e("v-col",{attrs:{cols:"3"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.currency"))+" "+t._s(t.getSubTotal)+" ")])])],1),e("v-row",{staticClass:"align-items-center"},[e("v-col",{attrs:{cols:"9"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.tax"))+" ")])]),e("v-col",{attrs:{cols:"3"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.currency"))+" "+t._s(t.getTax)+" ")])])],1),e("v-row",{staticClass:"align-items-center"},[e("v-col",{attrs:{cols:"9"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.coupons"))+" ")])]),e("v-col",{attrs:{cols:"3"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" - "+t._s(t.$t("message.currency"))+" "+t._s(t.getCoupons)+" ")])])],1),e("v-row",{staticClass:"align-items-center"},[e("v-col",{attrs:{cols:"9"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.total"))+" ")])]),e("v-col",{attrs:{cols:"3"}},[e("h6",{staticClass:"text-purple item-title"},[t._v(" "+t._s(t.$t("message.currency"))+" "+t._s(t.getTotal)+" ")])])],1),e("div",{staticClass:"mt-5"},[e("v-btn",{staticClass:"checkout-button",attrs:{block:"",loading:t.loading,disabled:t.loading},on:{click:t.checkOut}},[t._v(t._s(t.$t("message.checkout")))])],1)],2)]),e("v-dialog",{attrs:{persistent:"","max-width":"700","content-class":"step-dialog"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("div",{staticClass:"d-flex justify-content-end"},[e("v-btn",{staticStyle:{"background-color":"black",position:"relative",bottom:"-20px","z-index":"999",right:"0"},attrs:{color:"white",icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("close")])],1)],1),e("v-card",[e("div",{staticClass:"p-4"},[e("CardForm",{attrs:{submitButton:!0,"form-data":t.formData,randomBackgrounds:!1,loading:t.loading},on:{submit:t.submit}})],1)])],1)],1)},y=[],x=(e("159b"),e("b680"),e("2b0e")),N=e("17fd"),k={components:{CardForm:N["a"]},data:function(){var t=this;return{loading:!1,baseUrl:d["a"].testMode?d["a"].localhost:d["a"].domain,coupon:"",coupon_percent:0,requireRule:[function(a){return!!a||t.$t("message.fieldRequired")}],formData:{cardName:"",cardNumber:"",cardMonth:"",cardYear:"",cardCvv:""},dialog:!1}},computed:Object(c["a"])(Object(c["a"])({},Object(i["b"])(["cart","getUser","selectedLocale"])),{},{getSubTotal:function(){var t=0;return this.cart.forEach((function(a){t+=a.price*a.quantity})),t=t.toFixed(2),t},getTax:function(){var t=0;return this.cart.forEach((function(a){t+=a.price*a.quantity*a.tax/100})),t=t.toFixed(2),t},getCoupons:function(){return 0==this.coupon_percent?parseFloat(0).toFixed(2):parseFloat(this.getSubTotal*this.coupon_percent/100).toFixed(2)},getTotal:function(){var t=0;return t=(parseFloat(this.getSubTotal)+parseFloat(this.getTax)-parseFloat(this.getCoupons)).toFixed(2),t}}),methods:{checkOut:function(){null==this.getUser?x["default"].notify({group:"center",type:"error",text:this.$t("message.youNeedToLoginFirst")}):this.dialog=!0},applyCoupon:function(){var t=this;null!=this.getUser?""!=this.coupon&&(this.loading=!0,n["a"].post("checkCoupon",JSON.stringify({coupon:this.coupon,type:"service"}),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(a){a.data.success?(t.coupon_percent=a.data.data,x["default"].notify({group:"center",type:"success",text:t.$t("message.couponApplied")})):x["default"].notify({group:"center",type:"error",text:t.$t("message.invalidCoupon")})})).finally((function(){t.loading=!1}))):x["default"].notify({group:"center",type:"error",text:this.$t("message.youNeedToLoginFirst")})},submit:function(){var t=this,a={type:"product",lang:"ar"==this.selectedLocale.locale?"ar":"en",coupon:this.coupon_percent>0?this.coupon:"",carts:this.cart};this.loading=!0,n["a"].post("orderingWithCard",JSON.stringify(a),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(a){if(a.data.success){x["default"].notify({group:"center",type:"success",text:t.$t("message.orderingSuccess")}),t.formData={cardName:"",cardNumber:"",cardMonth:"",cardYear:"",cardCvv:""};var e=[];t.$store.dispatch("updateCart",e),t.$router.push("/products/-1/-1/-1/0,0/0,0")}else x["default"].notify({group:"center",type:"error",text:t.$t("message.orderingFailed")});t.coupon="",t.coupon_percent=0})).catch((function(t){x["default"].notify({group:"center",type:"error",text:t})})).finally((function(){t.loading=!1}))}}},$=k,M=(e("540b"),e("b0af")),D=e("62ad"),w=e("169a"),F=e("ce7e"),E=e("0fd9"),T=e("8654"),Y=Object(p["a"])($,C,y,!1,null,null,null),O=Y.exports;h()(Y,{VBtn:v["a"],VCard:M["a"],VCol:D["a"],VDialog:w["a"],VDivider:F["a"],VIcon:g["a"],VRow:E["a"],VTextField:T["a"]});var j={computed:Object(c["a"])({},Object(i["b"])(["getUser","selectedLocale","cart"])),components:{CartItem:b,CheckOut:O},data:function(){return{loading:!1}},methods:{getCarts:function(){var t=this;this.loading=!0,n["a"].post("getCarts",JSON.stringify(this.cart),{headers:{"Content-Type":"application/json"}}).then((function(a){if(a.data.success){var e=a.data.data;t.$store.dispatch("updateCart",e)}})).finally((function(){t.loading=!1}))}},mounted:function(){},beforeMount:function(){this.getCarts()}},B=j,I=e("a523"),P=Object(p["a"])(B,r,s,!1,null,null,null);a["default"]=P.exports;h()(P,{VCol:D["a"],VContainer:I["a"],VRow:E["a"]})},"4d63":function(t,a,e){var r=e("83ab"),s=e("da84"),c=e("94ca"),i=e("7156"),n=e("9bf2").f,o=e("241c").f,l=e("44e7"),d=e("ad6d"),u=e("9f7f"),m=e("6eeb"),p=e("d039"),f=e("69f3").enforce,h=e("2626"),v=e("b622"),g=v("match"),_=s.RegExp,b=_.prototype,C=/a/g,y=/a/g,x=new _(C)!==C,N=u.UNSUPPORTED_Y,k=r&&c("RegExp",!x||N||p((function(){return y[g]=!1,_(C)!=C||_(y)==y||"/a/i"!=_(C,"i")})));if(k){var $=function(t,a){var e,r=this instanceof $,s=l(t),c=void 0===a;if(!r&&s&&t.constructor===$&&c)return t;x?s&&!c&&(t=t.source):t instanceof $&&(c&&(a=d.call(t)),t=t.source),N&&(e=!!a&&a.indexOf("y")>-1,e&&(a=a.replace(/y/g,"")));var n=i(x?new _(t,a):_(t,a),r?this:b,$);if(N&&e){var o=f(n);o.sticky=!0}return n},M=function(t){t in $||n($,t,{configurable:!0,get:function(){return _[t]},set:function(a){_[t]=a}})},D=o(_),w=0;while(D.length>w)M(D[w++]);b.constructor=$,$.prototype=b,m(s,"RegExp",$)}h("RegExp")},"540b":function(t,a,e){"use strict";e("a62d")},a62d:function(t,a,e){}}]);