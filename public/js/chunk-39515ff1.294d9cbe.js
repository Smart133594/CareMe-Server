(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39515ff1"],{"2c64":function(e,t,a){},"3d86":function(e,t,a){},"43a66":function(e,t,a){"use strict";var i=a("5530"),n=(a("a9e3"),a("ec29"),a("3d86"),a("c37a")),s=a("604c"),o=a("8547"),r=a("58df"),l=Object(r["a"])(o["a"],s["a"],n["a"]);t["a"]=l.extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},n["a"].options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var e=n["a"].options.methods.genInputSlot.call(this);return delete e.data.on.click,e},genLabel:function(){var e=n["a"].options.methods.genLabel.call(this);return e?(e.data.attrs.id=this.computedId,delete e.data.attrs.for,e.tag="legend",e):null},onClick:s["a"].options.methods.onClick}})},"67b6":function(e,t,a){"use strict";var i=a("15fd"),n=a("5530"),s=(a("b0c0"),a("2c64"),a("ba87")),o=a("9d26"),r=a("c37a"),l=a("7e2b"),c=a("a9ad"),d=a("4e82"),u=a("5311"),p=a("7560"),h=a("fe09"),m=a("80d2"),f=a("58df"),g=a("d9f7"),v=Object(f["a"])(l["a"],c["a"],u["a"],Object(d["a"])("radioGroup"),p["a"]);t["a"]=v.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses),this.groupClasses)},computedColor:function(){return h["a"].options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return r["a"].options.computed.computedId.call(this)},hasLabel:r["a"].options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!this.radioGroup&&this.radioGroup.isDisabled},isReadonly:function(){return this.readonly||!!this.radioGroup&&this.radioGroup.isReadonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return h["a"].options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(e){return h["a"].options.methods.genInput.call(this,"radio",e)},genLabel:function(){return this.hasLabel?this.$createElement(s["a"],{on:{click:h["b"]},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(m["s"])(this,"label")||this.label):null},genRadio:function(){var e=this.attrs$,t=(e.title,Object(i["a"])(e,["title"]));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(o["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Object(n["a"])({name:this.computedName,value:this.value},t)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(e){this.isFocused=!0,this.$emit("focus",e)},onBlur:function(e){this.isFocused=!1,this.$emit("blur",e)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(e){var t={staticClass:"v-radio",class:this.classes,on:Object(g["c"])({click:this.onChange},this.listeners$),attrs:{title:this.attrs$.title}};return e("div",t,[this.genRadio(),this.genLabel()])}})},"6ca7":function(e,t,a){},ac7c:function(e,t,a){"use strict";var i=a("15fd"),n=a("5530"),s=(a("d3b7"),a("25f0"),a("6ca7"),a("ec29"),a("9d26")),o=a("c37a"),r=a("fe09");t["a"]=r["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},o["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var e=this.attrs$,t=(e.title,Object(i["a"])(e,["title"]));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(s["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},t),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},ec29:function(e,t,a){},f2d9:function(e,t,a){"use strict";(function(e){"undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof e||"undefined"!==typeof self&&self;function a(e,t){return t={exports:{}},e(t,t.exports),t.exports}var i=a((function(e,t){(function(t,a){e.exports=a()})(0,(function(){return function e(t,a,i){var n,s,o=window,r="application/octet-stream",l=i||r,c=t,d=!a&&!i&&c,u=document.createElement("a"),p=function(e){return String(e)},h=o.Blob||o.MozBlob||o.WebKitBlob||p,m=a||"download";if(h=h.call?h.bind(o):Blob,"true"===String(this)&&(c=[c,l],l=c[0],c=c[1]),d&&d.length<2048&&(m=d.split("/").pop().split("?")[0],u.href=d,-1!==u.href.indexOf(d))){var f=new XMLHttpRequest;return f.open("GET",d,!0),f.responseType="blob",f.onload=function(t){e(t.target.response,m,r)},setTimeout((function(){f.send()}),0),f}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(c)){if(!(c.length>2096103.424&&h!==p))return navigator.msSaveBlob?navigator.msSaveBlob(x(c),m):_(c);c=x(c),l=c.type||r}else if(/([\x80-\xff])/.test(c)){var g=0,v=new Uint8Array(c.length),b=v.length;for(g;g<b;++g)v[g]=c.charCodeAt(g);c=new h([v],{type:l})}function x(e){var t=e.split(/[:;,]/),a=t[1],i="base64"==t[2]?atob:decodeURIComponent,n=i(t.pop()),s=n.length,o=0,r=new Uint8Array(s);for(o;o<s;++o)r[o]=n.charCodeAt(o);return new h([r],{type:a})}function _(e,t){if("download"in u)return u.href=e,u.setAttribute("download",m),u.className="download-js-link",u.innerHTML="downloading...",u.style.display="none",document.body.appendChild(u),setTimeout((function(){u.click(),document.body.removeChild(u),!0===t&&setTimeout((function(){o.URL.revokeObjectURL(u.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,r)),window.open(e)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=e),!0;var a=document.createElement("iframe");document.body.appendChild(a),!t&&/^data:/.test(e)&&(e="data:"+e.replace(/^data:([\w\/\-\+]+)/,r)),a.src=e,setTimeout((function(){document.body.removeChild(a)}),333)}if(n=c instanceof h?c:new h([c],{type:l}),navigator.msSaveBlob)return navigator.msSaveBlob(n,m);if(o.URL)_(o.URL.createObjectURL(n),!0);else{if("string"===typeof n||n.constructor===p)try{return _("data:"+l+";base64,"+o.btoa(n))}catch(y){return _("data:"+l+","+encodeURIComponent(n))}s=new FileReader,s.onload=function(e){_(this.result)},s.readAsDataURL(n)}return!0}}))})),n={props:{type:{type:String,default:"xls"},data:{type:Array,required:!1,default:null},fields:{type:Object,default:()=>null},exportFields:{type:Object,default:()=>null},defaultValue:{type:String,required:!1,default:""},header:{default:null},footer:{default:null},name:{type:String,default:"data.xls"},fetch:{type:Function},meta:{type:Array,default:()=>[]},worksheet:{type:String,default:"Sheet1"},beforeGenerate:{type:Function},beforeFinish:{type:Function},escapeCsv:{type:Boolean,default:!0},stringifyLongNum:{type:Boolean,default:!1}},computed:{idName(){var e=(new Date).getTime();return"export_"+e},downloadFields(){return this.fields?this.fields:this.exportFields?this.exportFields:void 0}},methods:{async generate(){"function"===typeof this.beforeGenerate&&await this.beforeGenerate();let e=this.data;if("function"!==typeof this.fetch&&e||(e=await this.fetch()),!e||!e.length)return;let t=this.getProcessedJson(e,this.downloadFields);return"html"===this.type?this.export(this.jsonToXLS(t),this.name.replace(".xls",".html"),"text/html"):"csv"===this.type?this.export(this.jsonToCSV(t),this.name.replace(".xls",".csv"),"application/csv"):this.export(this.jsonToXLS(t),this.name,"application/vnd.ms-excel")},export:async function(e,t,a){let n=this.base64ToBlob(e,a);"function"===typeof this.beforeFinish&&await this.beforeFinish(),i(n,t,a)},jsonToXLS(e){let t='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>',a="<thead>";const i=Object.keys(e[0]).length;let n=this;const s=this.header||this.$attrs.title;s&&(a+=this.parseExtraData(s,'<tr><th colspan="'+i+'">${data}</th></tr>')),a+="<tr>";for(let o in e[0])a+="<th>"+o+"</th>";return a+="</tr>",a+="</thead>",a+="<tbody>",e.map((function(e,t){a+="<tr>";for(let i in e)a+="<td>"+n.preprocessLongNum(n.valueReformattedForMultilines(e[i]))+"</td>";a+="</tr>"})),a+="</tbody>",null!=this.footer&&(a+="<tfoot>",a+=this.parseExtraData(this.footer,'<tr><td colspan="'+i+'">${data}</td></tr>'),a+="</tfoot>"),t.replace("${table}",a).replace("${worksheet}",this.worksheet)},jsonToCSV(e){let t=this;var a=[];const i=this.header||this.$attrs.title;i&&a.push(this.parseExtraData(i,"${data}\r\n"));for(let n in e[0])a.push(n),a.push(",");return a.pop(),a.push("\r\n"),e.map((function(e){for(let i in e){let n=e[i]+"";t.escapeCsv&&(n='="'+n+'"',n.match(/[,"\n]/)&&(n='"'+n.replace(/\"/g,'""')+'"')),a.push(n),a.push(",")}a.pop(),a.push("\r\n")})),null!=this.footer&&a.push(this.parseExtraData(this.footer,"${data}\r\n")),a.join("")},getProcessedJson(e,t){let a=this.getKeys(e,t),i=[],n=this;return e.map((function(e,t){let s={};for(let i in a){let t=a[i];s[i]=n.getValue(t,e)}i.push(s)})),i},getKeys(e,t){if(t)return t;let a={};for(let i in e[0])a[i]=i;return a},parseExtraData(e,t){let a="";if(Array.isArray(e))for(var i=0;i<e.length;i++)e[i]&&(a+=t.replace("${data}",e[i]));else a+=t.replace("${data}",e);return a},getValue(e,t){const a="object"!==typeof e?e:e.field;let i="string"!==typeof a?[]:a.split("."),n=this.defaultValue;return n=a?i.length>1?this.getValueFromNestedItem(t,i):this.parseValue(t[a]):t,e.hasOwnProperty("callback")&&(n=this.getValueFromCallback(n,e.callback)),n},valueReformattedForMultilines(e){return"string"==typeof e?e.replace(/\n/gi,"<br/>"):e},preprocessLongNum(e){if(this.stringifyLongNum){if(String(e).startsWith("0x"))return e;if(!isNaN(e)&&""!=e&&(e>99999999999||e<1e-13))return'="'+e+'"'}return e},getValueFromNestedItem(e,t){let a=e;for(let i of t)a&&(a=a[i]);return this.parseValue(a)},getValueFromCallback(e,t){if("function"!==typeof t)return this.defaultValue;const a=t(e);return this.parseValue(a)},parseValue(e){return e||0===e||"boolean"===typeof e?e:this.defaultValue},base64ToBlob(e,t){let a=window.btoa(window.unescape(encodeURIComponent(e))),i=atob(a),n=i.length,s=new Uint8ClampedArray(n);while(n--)s[n]=i.charCodeAt(n);return new Blob([s],{type:t})}}};function s(e,t,a,i,n,s,o,r,l,c){"boolean"!==typeof o&&(l=r,r=o,o=!1);var d,u="function"===typeof a?a.options:a;if(e&&e.render&&(u.render=e.render,u.staticRenderFns=e.staticRenderFns,u._compiled=!0,n&&(u.functional=!0)),i&&(u._scopeId=i),s?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,l(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},u._ssrRegister=d):t&&(d=o?function(){t.call(this,c(this.$root.$options.shadowRoot))}:function(e){t.call(this,r(e))}),d)if(u.functional){var p=u.render;u.render=function(e,t){return d.call(t),p(e,t)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,d):[d]}return a}var o=s;const r=n;var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:e.idName},on:{click:e.generate}},[e._t("default",[e._v(" Download "+e._s(e.name)+" ")])],2)},c=[];l._withStripped=!0;const d=void 0,u=void 0,p=void 0,h=!1;var m=o({render:l,staticRenderFns:c},d,r,u,h,p,void 0,void 0);t["a"]=m}).call(this,a("c8ba"))},fe09:function(e,t,a){"use strict";a.d(t,"b",(function(){return r}));a("d3b7"),a("25f0"),a("4de4");var i=a("c37a"),n=a("5311"),s=a("8547"),o=a("58df");function r(e){e.preventDefault()}t["a"]=Object(o["a"])(i["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,a=this.internalValue;return this.isMultiple?!!Array.isArray(a)&&a.some((function(a){return e.valueComparator(a,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,a):Boolean(a):this.valueComparator(a,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=i["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:r},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:r},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,a=this.internalValue;if(this.isMultiple){Array.isArray(a)||(a=[]);var i=a.length;a=a.filter((function(a){return!e.valueComparator(a,t)})),a.length===i&&a.push(t)}else a=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(a,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(a,t)?null:t:!a;this.validate(!0,a),this.internalValue=a,this.hasColor=a}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}})},ff40:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("page-title-bar",{on:{actionClick:e.addNew}}),a("app-section-loader",{attrs:{status:e.loading}}),a("v-container",{attrs:{fluid:"","grid-list-xl":"","py-0":""}},[a("v-row",[a("app-card",{attrs:{fullBlock:!0,colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[a("v-card-title",[a("v-select",{attrs:{label:e.$t("message.department"),"item-text":"en"==e.selectedLocale.locale?"en_name":"ar_name","item-value":"id",items:e.departments,rules:e.requireRule,required:"",disabled:e.all},model:{value:e.department_id,callback:function(t){e.department_id=t},expression:"department_id"}}),a("v-checkbox",{staticClass:"mx-4",attrs:{label:e.$t("message.showAll")},model:{value:e.all,callback:function(t){e.all=t},expression:"all"}}),a("v-spacer"),a("v-text-field",{staticStyle:{"padding-top":"0px","margin-top":"0px"},attrs:{"append-icon":"search",label:"Search","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),a("download-excel",{staticStyle:{"margin-left":"20px"},attrs:{data:e.filteredProducts,fields:e.excel_headers}},[a("v-btn",{attrs:{text:""}},[e._v("Export")])],1)],1),a("v-data-table",{attrs:{headers:e.headers,items:e.getFilteredProducts,search:e.search},scopedSlots:e._u([{key:"body",fn:function(t){var i=t.items;return[e.setItems(i)?a("tbody",e._l(i,(function(t,i){return a("tr",{key:"product"+t.id},[a("td",[e._v(e._s(i+1))]),a("td",[e._v(" "+e._s(e.baseUrl+"product/"+t.id)+" ")]),a("td",[e._v(" "+e._s(t.department.vendor["en"==e.selectedLocale.locale?"en_name":"ar_name"])+" ")]),a("td",[e._v(" "+e._s(t.department["en"==e.selectedLocale.locale?"en_name":"ar_name"])+" ")]),a("td",[e._v(" "+e._s("en"==e.selectedLocale.locale?t.en_name:t.ar_name)+" ")]),a("td",[a("v-img",{staticClass:"my-2",attrs:{src:e.baseUrl+"uploads/products/"+t.image,"aspect-ratio":"2"}})],1),a("td",[a("v-chip",{staticClass:"ma-2",attrs:{color:t.active?"success":"error","text-color":"white"}},[a("v-icon",[e._v(e._s(t.active?"check_circle":"zmdi-close-circle"))])],1)],1),a("td",[a("v-btn",{staticClass:"ma-2",attrs:{color:"primary"},on:{click:function(a){return e.edit(t)}}},[e._v(e._s(e.$t("message.edit")))]),a("v-btn",{staticClass:"ma-2",attrs:{color:"error"},on:{click:function(a){return e.askDelete(t)}}},[e._v(e._s(e.$t("message.delete")))])],1)])})),0):e._e()]}}])})],1)],1)],1),a("v-dialog",{attrs:{persistent:"","max-width":"900px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[e._v(" "+e._s(e.$t("message.product"))+" ")]),a("v-divider"),a("v-card-text",[a("v-form",{model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-select",{attrs:{label:e.$t("message.department"),"item-text":"en"==e.selectedLocale.locale?"en_name":"ar_name",items:e.departments,"item-value":"id",rules:e.requireRule,required:""},model:{value:e.department_id,callback:function(t){e.department_id=t},expression:"department_id"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-checkbox",{attrs:{label:e.$t("message.recommended")},model:{value:e.recommended,callback:function(t){e.recommended=t},expression:"recommended"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:e.$t("message.enName"),rules:e.requireRule,required:""},model:{value:e.en_name,callback:function(t){e.en_name=t},expression:"en_name"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:e.$t("message.arName"),rules:e.requireRule,required:""},model:{value:e.ar_name,callback:function(t){e.ar_name=t},expression:"ar_name"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:e.$t("message.enDescription"),rules:e.requireRule,required:""},model:{value:e.en_description,callback:function(t){e.en_description=t},expression:"en_description"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:e.$t("message.arDescription"),rules:e.requireRule,required:""},model:{value:e.ar_description,callback:function(t){e.ar_description=t},expression:"ar_description"}})],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"4"}},[a("v-text-field",{attrs:{label:e.$t("message.price"),rules:e.requireRule,required:""},model:{value:e.old_price,callback:function(t){e.old_price=t},expression:"old_price"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("v-text-field",{attrs:{label:e.$t("message.discount")+"(%)",rules:e.requireRule,required:""},model:{value:e.discount_price,callback:function(t){e.discount_price=t},expression:"discount_price"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("v-text-field",{attrs:{label:e.$t("message.tax")+"(%)",rules:e.requireRule,required:""},model:{value:e.tax,callback:function(t){e.tax=t},expression:"tax"}})],1)],1),a("v-row",{staticStyle:{"align-items":"center"}},[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{label:e.$t("message.ratings"),rules:e.numberRule,required:""},model:{value:e.rating,callback:function(t){e.rating=t},expression:"rating"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-radio-group",{staticClass:"pt-0",attrs:{row:"",label:e.$t("message.active")},model:{value:e.active,callback:function(t){e.active=t},expression:"active"}},[a("v-radio",{attrs:{color:"primary",label:e.$t("message.yes"),value:!0}}),a("v-radio",{attrs:{color:"primary",label:e.$t("message.no"),value:!1}})],1)],1)],1),a("v-row",[a("v-img",{staticClass:"my-2",staticStyle:{height:"200px"},attrs:{src:e.image?e.image:"/static/img/gallery.png","aspect-ratio":"1",contain:""},on:{click:e.chooseFiles}}),a("input",{attrs:{id:"fileUpload",type:"file",hidden:"",accept:[".jpg",".jpeg",".gif",".png"]},on:{change:e.uploadImageFile}})],1)],1)],1),a("v-divider"),a("v-card-actions",[a("div",{staticClass:"spacer"}),a("v-btn",{attrs:{color:"info",disabled:!e.valid||e.loading||!e.image,loading:e.loading},on:{click:function(t){return t.stopPropagation(),e.save(t)}}},[e._v(e._s(e.$t("message.save")))]),a("v-btn",{attrs:{color:"secondary"},on:{click:function(t){return t.stopPropagation(),e.cancel(t)}}},[e._v(e._s(e.$t("message.cancel")))])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500"},model:{value:e.deleteDialog,callback:function(t){e.deleteDialog=t},expression:"deleteDialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v(e._s(e.$t("message.deleteItemTitle")))]),a("v-card-text",[e._v(e._s(e.$t("message.deleteItemContent")))]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"warning",text:"text",disabled:e.loading},on:{click:function(t){return t.stopPropagation(),e.deleteProduct(t)}}},[e._v("Delete")]),a("v-btn",{attrs:{color:"error",text:"text",disabled:e.loading},on:{click:function(t){t.stopPropagation(),e.deleteDialog=!1}}},[e._v("Cancel")])],1)],1)],1)],1)},n=[],s=a("5530"),o=(a("99af"),a("4de4"),a("d3b7"),a("caad"),a("2f62")),r=a("365c"),l=a("2b0e"),c=a("e065"),d=a("f2d9"),u={components:{downloadExcel:d["a"]},data:function(){var e=this;return{loading:!1,dialog:!1,valid:!1,search:"",all:!0,departments:[],products:[],requireRule:[function(t){return!!t||e.$t("message.fieldRequired")}],startingMenu:!1,endingMenu:!1,startingTimeMenu:!1,endingTimeMenu:!1,numberRule:[function(t){return!!t||e.$t("message.fieldRequired")},function(t){return parseFloat(t)>=0&&parseFloat(t)<=5||e.$t("message.ratingRule")}],id:-1,department_id:-1,en_name:"",ar_name:"",en_description:"",ar_description:"",recommended:!0,rating:"0",image:null,active:!0,tax:"5",old_price:"0",discount_price:"0",headers:[{text:this.$t("message.no"),value:"no",align:"center"},{text:this.$t("message.url"),value:"url",align:"center"},{text:this.$t("message.vendorName"),value:"department.vendor.en_name",align:"center"},{text:this.$t("message.departmentName"),value:"department.en_name",align:"center"},{text:this.$t("message.name"),value:"en_name",align:"center"},{text:this.$t("message.image"),value:"image",align:"center"},{text:this.$t("message.active"),value:"active",align:"center"},{text:this.$t("message.settings"),value:"settings",align:"center"}],excel_headers:{Url:{field:"id",callback:function(t){return"".concat(e.baseUrl,"product/").concat(t)}},"Vendor Name":{field:"department",callback:function(e){return e.vendor.en_name}},"Department Name":{field:"department",callback:function(e){return e.en_name}},Name:"en_name"},baseUrl:c["a"].baseUrl,selectedItem:null,deleteDialog:!1,filteredProducts:[]}},computed:Object(s["a"])(Object(s["a"])({},Object(o["b"])(["getUser","selectedLocale"])),{},{getFilteredProducts:function(){var e=this;return-1==this.department_id||this.all?this.products:this.products.filter((function(t){return t.department_id==e.department_id}))}}),methods:{getProducts:function(){var e=this;this.loading=!0,r["a"].get("getProducts",{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(t){t.data.success&&(e.products=t.data.data.products,e.departments=t.data.data.departments)})).catch((function(e){l["default"].notify({group:"loggedIn",type:"error",text:e})})).finally((function(){e.loading=!1}))},addNew:function(){this.dialog=!0},save:function(){var e=this;if(this.valid&&-1!=this.department_id&&null!=this.image){var t={id:this.id,department_id:this.department_id,en_name:this.en_name,ar_name:this.ar_name,en_description:this.en_description,ar_description:this.ar_description,recommended:this.recommended,rating:this.rating,image:this.image,tax:parseFloat(this.tax),old_price:parseFloat(this.old_price),price:parseFloat(this.old_price)-parseFloat(parseFloat(this.old_price)*parseFloat(this.discount_price)/100),discount_price:parseFloat(this.discount_price),active:this.active};this.loading=!0,r["a"].post("addProduct",JSON.stringify(t),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(t){t.data.success?(e.cancel(),e.getProducts()):l["default"].notify({group:"loggedIn",type:"error",text:e.$t("message.registerFailed")})})).catch((function(e){l["default"].notify({group:"loggedIn",type:"error",text:e})})).finally((function(){e.loading=!1}))}},cancel:function(){this.id=-1,this.department_id=-1,this.en_name="",this.ar_name="",this.en_description="",this.ar_description="",this.rating="",this.recommended=!0,this.image=null,this.active=!0,this.tax="5",this.old_price="0",this.discount_price="0",this.dialog=!1},chooseFiles:function(){document.getElementById("fileUpload").click()},uploadImageFile:function(e){var t=e.target.files||e.dataTransfer.files;if(t.length){var a=t[0],i=a["type"],n=["image/gif","image/jpeg","image/png","image/jpg"];n.includes(i)?this.createImage(a):l["default"].notify({group:"loggedIn",type:"error",text:this.$t("message.selectValidImage")})}},createImage:function(e){var t=this,a=new FileReader;a.onload=function(e){t.image=e.target.result},a.readAsDataURL(e)},edit:function(e){this.id=e.id,this.department_id=e.department_id,this.en_name=e.en_name,this.ar_name=e.ar_name,this.en_description=e.en_description,this.ar_description=e.ar_description,this.tax=e.tax,this.old_price=e.old_price,this.discount_price=e.discount_price,this.rating=e.rating+"",this.recommended=1==e.recommended,this.active=1==e.active,this.image=this.baseUrl+"uploads/products/"+e.image,this.dialog=!0},askDelete:function(e){this.selectedItem=e,this.deleteDialog=!0},deleteProduct:function(){var e=this;this.loading=!0;var t={id:this.selectedItem.id};r["a"].post("deleteProduct",JSON.stringify(t),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(t){t.data.success&&e.getProducts()})).catch((function(e){l["default"].notify({group:"loggedIn",type:"error",text:e})})).finally((function(){e.loading=!1,e.deleteDialog=!1,e.selectedItem=null}))},setItems:function(e){return this.filteredProducts=e,!0}},mounted:function(){this.getProducts()}},p=u,h=a("2877"),m=a("6544"),f=a.n(m),g=a("8336"),v=a("b0af"),b=a("99d9"),x=a("ac7c"),_=a("cc20"),y=a("62ad"),k=a("a523"),w=a("8fea"),C=a("169a"),$=a("ce7e"),S=a("4bd4"),I=a("132d"),V=a("adda"),F=a("67b6"),R=a("43a66"),j=a("0fd9"),D=a("b974"),T=a("2fa4"),O=a("8654"),A=Object(h["a"])(p,i,n,!1,null,null,null);t["default"]=A.exports;f()(A,{VBtn:g["a"],VCard:v["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VCheckbox:x["a"],VChip:_["a"],VCol:y["a"],VContainer:k["a"],VDataTable:w["a"],VDialog:C["a"],VDivider:$["a"],VForm:S["a"],VIcon:I["a"],VImg:V["a"],VRadio:F["a"],VRadioGroup:R["a"],VRow:j["a"],VSelect:D["a"],VSpacer:T["a"],VTextField:O["a"]})}}]);