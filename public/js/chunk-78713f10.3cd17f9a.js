(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78713f10"],{"020c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("app-section-loader",{attrs:{status:t.loading}}),a("v-container",{attrs:{fluid:"","grid-list-xl":"","py-0":""}},[a("v-row",[a("app-card",{attrs:{fullBlock:!0,colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[a("v-card-title",[a("v-spacer"),a("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{attrs:{headers:t.headers,items:t.bookings,search:t.search},scopedSlots:t._u([{key:"body",fn:function(e){var s=e.items;return[a("tbody",t._l(s,(function(e,s){return a("tr",{key:"booking"+e.id},[a("td",[t._v(t._s(s+1))]),a("td",[a("a",{attrs:{href:""+t.baseUrl+e.invoice,target:"_blank"}},[t._v(t._s(t.$t("message.invoice")))])]),a("td",[t._v(t._s(e.full_name))]),a("td",[t._v(t._s(e["en"==t.selectedLocale.locale?"en_name":"ar_name"])+" ")]),a("td",[t._v(" "+t._s(e.date)+" ")]),a("td",t._l(e.times,(function(e,s){return a("p",{key:s+"item",staticClass:"m-0"},[t._v(" "+t._s(e.from_time)+" ~ "+t._s(e.to_time)+" ")])})),0),a("td",[t._v(" "+t._s(t.$t("message.currency"))+" "+t._s(parseFloat(e.amount).toFixed(2))+" ")]),a("td",["insurance"==e.type?a("div",{staticClass:"d-flex flex-direction-row"},[a("v-img",{staticClass:"m-0",attrs:{width:"50",height:"50",src:t.baseUrl+"uploads/bookings/"+e.image},on:{click:function(a){return t.showImage(t.baseUrl+"uploads/bookings/"+e.image)}}}),a("v-img",{staticClass:"m-0 ml-1",attrs:{width:"50",height:"50",src:t.baseUrl+"uploads/bookings/"+e.image1},on:{click:function(a){return t.showImage(t.baseUrl+"uploads/bookings/"+e.image1)}}})],1):a("div",[a("p",{staticClass:"m-0",staticStyle:{"text-transform":"uppercase"}},[t._v(t._s(e.type))])])]),a("td",[a("v-badge",{staticClass:"p-2",class:{error:"paid"!=e.payment_status,success:"paid"==e.payment_status},attrs:{value:!1}},[t._v(t._s(e.payment_status))])],1),a("td",[a("v-badge",{staticClass:"p-2",class:{info:"confirmed"==e.state||"completed"==e.state,error:"pending"==e.state||"rejected"==e.state},attrs:{value:!1}},[t._v(t._s(e.state))]),"pending"==e.state?a("v-btn",{staticClass:"p-2 error ml-2",attrs:{value:!1,small:"",disabled:t.loading},on:{click:function(a){return t.cancelBooking(e)}}},[t._v(t._s(t.$t("message.cancel")))]):t._e()],1)])})),0)]}}])})],1)],1)],1)],1)},i=[],n=a("5530"),o=(a("d3b7"),a("159b"),a("e065")),r=a("2f62"),l=a("365c"),c=a("2b0e"),d={computed:Object(n["a"])({},Object(r["b"])(["getUser","selectedLocale"])),data:function(){return{loading:!1,bookings:[],search:"",baseUrl:o["a"].testMode?o["a"].localhost:o["a"].domain,headers:[{text:this.$t("message.no"),value:"no"},{text:this.$t("message.invoice"),value:"invoice"},{text:this.$t("message.worker"),value:"full_name"},{text:this.$t("message.service"),value:"en_name"},{text:this.$t("message.date"),value:"date"},{text:this.$t("message.times")},{text:this.$t("message.amount"),value:"amount"},{text:this.$t("message.type"),value:"type"},{text:this.$t("message.payment"),value:"payment_status"},{text:this.$t("message.state")}]}},methods:{getMyBookings:function(){var t=this;this.loading=!0,l["a"].get("getMyBookings",{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(e){if(e.data.success){var a=e.data.data;a.forEach((function(t){var e=t.times;null!=e&&(t.times=JSON.parse(e))})),t.bookings=a}})).catch((function(t){})).finally((function(){t.loading=!1}))},cancelBooking:function(t){var e=this;this.loading=!0,l["a"].post("cancelBooking",JSON.stringify({id:t.id}),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(t){t.data.success||c["default"].notify({group:"center",type:"error",text:e.$t("message.alreadyAccepted")}),e.getMyBookings()})).catch((function(t){})).finally((function(){e.loading=!1}))},setting:function(t){},showImage:function(t){window.open(t,"_blank")}},mounted:function(){},beforeMount:function(){this.getMyBookings()}},u=d,h=a("2877"),f=a("6544"),g=a.n(f),m=a("4ca6"),p=a("8336"),v=a("99d9"),b=a("a523"),_=a("8fea"),y=a("adda"),k=a("0fd9"),$=a("2fa4"),B=a("8654"),x=Object(h["a"])(u,s,i,!1,null,null,null);e["default"]=x.exports;g()(x,{VBadge:m["a"],VBtn:p["a"],VCardTitle:v["c"],VContainer:b["a"],VDataTable:_["a"],VImg:y["a"],VRow:k["a"],VSpacer:$["a"],VTextField:B["a"]})},"4ca6":function(t,e,a){"use strict";var s=a("15fd"),i=a("5530"),n=(a("a9e3"),a("ff44"),a("132d")),o=a("a9ad"),r=a("7560"),l=a("f2e7"),c=a("2b0e"),d=c["default"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),u=a("fe6c"),h=a("58df"),f=a("80d2");e["a"]=Object(h["a"])(o["a"],Object(u["b"])(["left","bottom"]),r["a"],l["a"],d).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return Object(i["a"])({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(t){return"calc(100% - ".concat(Object(f["g"])(t||this.offset),")")},genBadge:function(){var t=this.$vuetify.lang,e=this.$attrs["aria-label"]||t.t(this.label),a=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":e,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),s=this.$createElement("span",a,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[s]):s},genBadgeContent:function(){if(!this.dot){var t=Object(f["s"])(this,"badge");return t||(this.content?String(this.content):this.icon?this.$createElement(n["a"],this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(t){var e=[this.genBadgeWrapper()],a=[Object(f["s"])(this)],i=this.$attrs,n=(i["aria-atomic"],i["aria-label"],i["aria-live"],i.role,i.title,Object(s["a"])(i,["aria-atomic","aria-label","aria-live","role","title"]));return this.inline&&this.left?a.unshift(e):a.push(e),t("span",{staticClass:"v-badge",attrs:n,class:this.classes},a)}})},ff44:function(t,e,a){}}]);