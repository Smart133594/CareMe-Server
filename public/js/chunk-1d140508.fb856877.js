(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d140508"],{"0283":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("app-section-loader",{attrs:{status:e.loading}}),a("v-container",{attrs:{fluid:"","grid-list-xl":"","py-0":""}},[a("v-row",[a("app-card",{attrs:{fullBlock:!0,colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[a("v-card-title",[a("v-text-field",{attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("v-spacer"),a("download-excel",{attrs:{data:e.filterOrders,fields:e.excel_headers}},[a("v-btn",{attrs:{text:""}},[e._v("Export")])],1)],1),a("v-card-title",[a("v-select",{attrs:{label:e.$t("message.vendors"),"item-text":"en"==e.selectedLocale.locale?"en_name":"ar_name",items:e.getVendors,"item-value":"value"},model:{value:e.vendor_value,callback:function(t){e.vendor_value=t},expression:"vendor_value"}}),a("v-spacer"),a("v-select",{attrs:{label:e.$t("message.payment"),"item-text":"text",items:e.payment_status,"item-value":"value"},model:{value:e.payment_status_value,callback:function(t){e.payment_status_value=t},expression:"payment_status_value"}}),a("v-spacer"),a("v-select",{attrs:{label:e.$t("message.state"),"item-text":"text",items:e.states,"item-value":"value"},model:{value:e.states_value,callback:function(t){e.states_value=t},expression:"states_value"}})],1),a("v-data-table",{attrs:{headers:e.headers,items:e.getFilteredOrders,search:e.search},scopedSlots:e._u([{key:"body",fn:function(t){var n=t.items;return[a("tbody",[e._l(n,(function(t,n){return a("tr",{key:"ordering"+t.id},[a("td",[e._v(e._s(n+1))]),a("td",[e._v(" "+e._s(t["en"==e.selectedLocale.locale?"vendor_en_name":"vendor_ar_name"])+" ")]),a("td",[a("a",{attrs:{href:""+e.baseUrl+t.invoice,target:"_blank"}},[e._v(e._s(e.$t("message.invoice")))])]),a("td",[e._v(e._s(t.created_at))]),a("td",[a("p",{staticClass:"m-0"},[e._v(" "+e._s(t.full_name)+" ")]),a("p",{staticClass:"m-0"},[e._v(" "+e._s(t.phone)+" ")])]),a("td",e._l(t.carts,(function(t,n){return a("p",{key:n+"item",staticClass:"m-0"},[e._v(" "+e._s(t["en"==e.selectedLocale.locale?"en_name":"ar_name"])+"("+e._s(t.quantity)+") ")])})),0),a("td",[e._v(" "+e._s(e.$t("message.currency"))+" "+e._s(parseFloat(t.amount).toFixed(2))+" ")]),a("td",[a("v-badge",{staticClass:"p-2",class:{error:"paid"!=t.payment,success:"paid"==t.payment},attrs:{value:!1}},[e._v(e._s(t.payment_status))])],1),a("td",[a("v-badge",{staticClass:"p-2",class:{info:"confirmed"==t.state,error:"pending"==t.state||"rejected"==t.state},attrs:{value:!1}},[e._v(e._s(t.state))])],1)])})),a("tr",e._l(e.headers,(function(t){return a("td",{key:"total_"+t.value},["carts"==t.value?a("div",[a("h6",[e._v(e._s(e.$t("message.total"))+":")])]):e._e(),"amount"==t.value?a("div",[a("h6",[e._v(e._s(e.getTotal(n)))])]):e._e()])})),0)],2)]}}])})],1)],1)],1)],1)},s=[],r=a("5530"),o=(a("4de4"),a("159b"),a("99af"),a("d3b7"),a("b680"),a("e065")),i=a("2f62"),l=a("365c"),c=a("f2d9"),u={components:{downloadExcel:c["a"]},computed:Object(r["a"])(Object(r["a"])({},Object(i["b"])(["getUser","selectedLocale"])),{},{getFilteredOrders:function(){var e=this,t=this.orders;return""!=this.vendor_value&&(t=t.filter((function(t){return t.vendor_en_name==e.vendor_value}))),""!=this.payment_status_value&&(t=t.filter((function(t){return t.payment_status==e.payment_status_value}))),""!=this.states_value&&(t=t.filter((function(t){return t.state==e.states_value}))),t},getVendors:function(){var e=[{en_name:"None",ar_name:"None",value:""}];return this.orders.forEach((function(t){var a=e.filter((function(e){return e.en_name==t.en_name}));0==a.length&&e.push({en_name:t.vendor_en_name,ar_name:t.vendor_ar_name,value:t.vendor_en_name})})),e}}),data:function(){var e=this;return{loading:!1,orders:[],search:"",baseUrl:o["a"].testMode?o["a"].localhost:o["a"].domain,headers:[{text:this.$t("message.no"),value:"no"},{text:this.$t("message.vendorName"),value:"vendor_en_name",align:"center"},{text:this.$t("message.invoice"),value:"invoice"},{text:this.$t("message.date"),value:"created_at"},{text:this.$t("message.client"),value:"full_name"},{text:this.$t("message.item"),value:"carts"},{text:this.$t("message.amount"),value:"amount"},{text:this.$t("message.payment"),value:"payment_status"},{text:this.$t("message.state")}],excel_headers:{"Vendor Name":"vendor_en_name","Invoice Url":{field:"invoice",callback:function(t){return"".concat(e.baseUrl).concat(t)}},Date:"created_at","Client Name":"full_name",Item:{field:"carts",callback:function(e){var t="";return e.forEach((function(e){t+=e.en_name+"\n"})),t}},Amount:"amount",Payment:{field:"payment_status",callback:function(e){var t=e.toUpperCase();return t}},Status:{field:"state",callback:function(e){var t=e.toUpperCase();return t}}},filterOrders:[],vendors:[],payment_type:[{text:"None",value:""},{text:"CARD",value:"card"},{text:"INSURANCE",value:"insurance"}],payment_status:[{text:"None",value:""},{text:"UNPAID",value:"unpaid"},{text:"PAID",value:"paid"},{text:"REFUND",value:"refund"}],states:[{text:"None",value:""},{text:"PENDING",value:"pending"},{text:"CONFIRMED",value:"confirmed"},{text:"REJECTED",value:"rejected"}],vendor_value:"",payment_type_value:"",payment_status_value:"",states_value:""}},methods:{getOrders:function(){var e=this;this.loading=!0,l["a"].get("getOrders",{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(t){if(t.data.success){var a=t.data.data;e.orders=a}})).catch((function(e){})).finally((function(){e.loading=!1}))},getTotal:function(e){var t=0;return this.filterOrders=e,e.forEach((function(e){t+=parseFloat(e.amount)})),t.toFixed(2)}},mounted:function(){},beforeMount:function(){this.getOrders()}},d=u,f=a("2877"),h=a("6544"),p=a.n(h),m=a("4ca6"),v=a("8336"),g=a("99d9"),b=a("a523"),_=a("8fea"),y=a("0fd9"),x=a("b974"),w=a("2fa4"),C=a("8654"),$=Object(f["a"])(d,n,s,!1,null,null,null);t["default"]=$.exports;p()($,{VBadge:m["a"],VBtn:v["a"],VCardTitle:g["c"],VContainer:b["a"],VDataTable:_["a"],VRow:y["a"],VSelect:x["a"],VSpacer:w["a"],VTextField:C["a"]})},"4ca6":function(e,t,a){"use strict";var n=a("15fd"),s=a("5530"),r=(a("a9e3"),a("ff44"),a("132d")),o=a("a9ad"),i=a("7560"),l=a("f2e7"),c=a("2b0e"),u=c["default"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),d=a("fe6c"),f=a("58df"),h=a("80d2");t["a"]=Object(f["a"])(o["a"],Object(d["b"])(["left","bottom"]),i["a"],l["a"],u).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return Object(s["a"])({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(e){return"calc(100% - ".concat(Object(h["g"])(e||this.offset),")")},genBadge:function(){var e=this.$vuetify.lang,t=this.$attrs["aria-label"]||e.t(this.label),a=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":t,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),n=this.$createElement("span",a,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[n]):n},genBadgeContent:function(){if(!this.dot){var e=Object(h["s"])(this,"badge");return e||(this.content?String(this.content):this.icon?this.$createElement(r["a"],this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(e){var t=[this.genBadgeWrapper()],a=[Object(h["s"])(this)],s=this.$attrs,r=(s["aria-atomic"],s["aria-label"],s["aria-live"],s.role,s.title,Object(n["a"])(s,["aria-atomic","aria-label","aria-live","role","title"]));return this.inline&&this.left?a.unshift(t):a.push(t),e("span",{staticClass:"v-badge",attrs:r,class:this.classes},a)}})},f2d9:function(e,t,a){"use strict";(function(e){"undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof e||"undefined"!==typeof self&&self;function a(e,t){return t={exports:{}},e(t,t.exports),t.exports}var n=a((function(e,t){(function(t,a){e.exports=a()})(0,(function(){return function e(t,a,n){var s,r,o=window,i="application/octet-stream",l=n||i,c=t,u=!a&&!n&&c,d=document.createElement("a"),f=function(e){return String(e)},h=o.Blob||o.MozBlob||o.WebKitBlob||f,p=a||"download";if(h=h.call?h.bind(o):Blob,"true"===String(this)&&(c=[c,l],l=c[0],c=c[1]),u&&u.length<2048&&(p=u.split("/").pop().split("?")[0],d.href=u,-1!==d.href.indexOf(u))){var m=new XMLHttpRequest;return m.open("GET",u,!0),m.responseType="blob",m.onload=function(t){e(t.target.response,p,i)},setTimeout((function(){m.send()}),0),m}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(c)){if(!(c.length>2096103.424&&h!==f))return navigator.msSaveBlob?navigator.msSaveBlob(_(c),p):y(c);c=_(c),l=c.type||i}else if(/([\x80-\xff])/.test(c)){var v=0,g=new Uint8Array(c.length),b=g.length;for(v;v<b;++v)g[v]=c.charCodeAt(v);c=new h([g],{type:l})}function _(e){var t=e.split(/[:;,]/),a=t[1],n="base64"==t[2]?atob:decodeURIComponent,s=n(t.pop()),r=s.length,o=0,i=new Uint8Array(r);for(o;o<r;++o)i[o]=s.charCodeAt(o);return new h([i],{type:a})}function y(e,t){if("download"in d)return d.href=e,d.setAttribute("download",p),d.className="download-js-link",d.innerHTML="downloading...",d.style.display="none",document.body.appendChild(d),setTimeout((function(){d.click(),document.body.removeChild(d),!0===t&&setTimeout((function(){o.URL.revokeObjectURL(d.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,i)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var a=document.createElement("iframe");document.body.appendChild(a),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,i)),a.src=e,setTimeout((function(){document.body.removeChild(a)}),333)}if(s=c instanceof h?c:new h([c],{type:l}),navigator.msSaveBlob)return navigator.msSaveBlob(s,p);if(o.URL)y(o.URL.createObjectURL(s),!0);else{if("string"===typeof s||s.constructor===f)try{return y("data:"+l+";base64,"+o.btoa(s))}catch(x){return y("data:"+l+","+encodeURIComponent(s))}r=new FileReader,r.onload=function(e){y(this.result)},r.readAsDataURL(s)}return!0}}))})),s={props:{type:{type:String,default:"xls"},data:{type:Array,required:!1,default:null},fields:{type:Object,default:()=>null},exportFields:{type:Object,default:()=>null},defaultValue:{type:String,required:!1,default:""},header:{default:null},footer:{default:null},name:{type:String,default:"data.xls"},fetch:{type:Function},meta:{type:Array,default:()=>[]},worksheet:{type:String,default:"Sheet1"},beforeGenerate:{type:Function},beforeFinish:{type:Function},escapeCsv:{type:Boolean,default:!0},stringifyLongNum:{type:Boolean,default:!1}},computed:{idName(){var e=(new Date).getTime();return"export_"+e},downloadFields(){return this.fields?this.fields:this.exportFields?this.exportFields:void 0}},methods:{async generate(){"function"===typeof this.beforeGenerate&&await this.beforeGenerate();let e=this.data;if("function"!==typeof this.fetch&&e||(e=await this.fetch()),!e||!e.length)return;let t=this.getProcessedJson(e,this.downloadFields);return"html"===this.type?this.export(this.jsonToXLS(t),this.name.replace(".xls",".html"),"text/html"):"csv"===this.type?this.export(this.jsonToCSV(t),this.name.replace(".xls",".csv"),"application/csv"):this.export(this.jsonToXLS(t),this.name,"application/vnd.ms-excel")},export:async function(e,t,a){let s=this.base64ToBlob(e,a);"function"===typeof this.beforeFinish&&await this.beforeFinish(),n(s,t,a)},jsonToXLS(e){let t='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>',a="<thead>";const n=Object.keys(e[0]).length;let s=this;const r=this.header||this.$attrs.title;r&&(a+=this.parseExtraData(r,'<tr><th colspan="'+n+'">${data}</th></tr>')),a+="<tr>";for(let o in e[0])a+="<th>"+o+"</th>";return a+="</tr>",a+="</thead>",a+="<tbody>",e.map((function(e,t){a+="<tr>";for(let n in e)a+="<td>"+s.preprocessLongNum(s.valueReformattedForMultilines(e[n]))+"</td>";a+="</tr>"})),a+="</tbody>",null!=this.footer&&(a+="<tfoot>",a+=this.parseExtraData(this.footer,'<tr><td colspan="'+n+'">${data}</td></tr>'),a+="</tfoot>"),t.replace("${table}",a).replace("${worksheet}",this.worksheet)},jsonToCSV(e){let t=this;var a=[];const n=this.header||this.$attrs.title;n&&a.push(this.parseExtraData(n,"${data}\r\n"));for(let s in e[0])a.push(s),a.push(",");return a.pop(),a.push("\r\n"),e.map((function(e){for(let n in e){let s=e[n]+"";t.escapeCsv&&(s='="'+s+'"',s.match(/[,"\n]/)&&(s='"'+s.replace(/\"/g,'""')+'"')),a.push(s),a.push(",")}a.pop(),a.push("\r\n")})),null!=this.footer&&a.push(this.parseExtraData(this.footer,"${data}\r\n")),a.join("")},getProcessedJson(e,t){let a=this.getKeys(e,t),n=[],s=this;return e.map((function(e,t){let r={};for(let n in a){let t=a[n];r[n]=s.getValue(t,e)}n.push(r)})),n},getKeys(e,t){if(t)return t;let a={};for(let n in e[0])a[n]=n;return a},parseExtraData(e,t){let a="";if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]&&(a+=t.replace("${data}",e[n]));else a+=t.replace("${data}",e);return a},getValue(e,t){const a="object"!==typeof e?e:e.field;let n="string"!==typeof a?[]:a.split("."),s=this.defaultValue;return s=a?n.length>1?this.getValueFromNestedItem(t,n):this.parseValue(t[a]):t,e.hasOwnProperty("callback")&&(s=this.getValueFromCallback(s,e.callback)),s},valueReformattedForMultilines(e){return"string"==typeof e?e.replace(/\n/gi,"<br/>"):e},preprocessLongNum(e){if(this.stringifyLongNum){if(String(e).startsWith("0x"))return e;if(!isNaN(e)&&""!=e&&(e>99999999999||e<1e-13))return'="'+e+'"'}return e},getValueFromNestedItem(e,t){let a=e;for(let n of t)a&&(a=a[n]);return this.parseValue(a)},getValueFromCallback(e,t){if("function"!==typeof t)return this.defaultValue;const a=t(e);return this.parseValue(a)},parseValue(e){return e||0===e||"boolean"===typeof e?e:this.defaultValue},base64ToBlob(e,t){let a=window.btoa(window.unescape(encodeURIComponent(e))),n=atob(a),s=n.length,r=new Uint8ClampedArray(s);while(s--)r[s]=n.charCodeAt(s);return new Blob([r],{type:t})}}};function r(e,t,a,n,s,r,o,i,l,c){"boolean"!==typeof o&&(l=i,i=o,o=!1);var u,d="function"===typeof a?a.options:a;if(e&&e.render&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0,s&&(d.functional=!0)),n&&(d._scopeId=n),r?(u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,l(e)),e&&e._registeredComponents&&e._registeredComponents.add(r)},d._ssrRegister=u):t&&(u=o?function(){t.call(this,c(this.$root.$options.shadowRoot))}:function(e){t.call(this,i(e))}),u)if(d.functional){var f=d.render;d.render=function(e,t){return u.call(t),f(e,t)}}else{var h=d.beforeCreate;d.beforeCreate=h?[].concat(h,u):[u]}return a}var o=r;const i=s;var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:e.idName},on:{click:e.generate}},[e._t("default",[e._v(" Download "+e._s(e.name)+" ")])],2)},c=[];l._withStripped=!0;const u=void 0,d=void 0,f=void 0,h=!1;var p=o({render:l,staticRenderFns:c},u,i,d,h,f,void 0,void 0);t["a"]=p}).call(this,a("c8ba"))},ff44:function(e,t,a){}}]);