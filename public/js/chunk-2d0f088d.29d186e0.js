(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f088d"],{"9d7c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("page-title-bar",{attrs:{hide:!0}}),n("v-container",{staticClass:"grid-list-xl pt-0 mt-n3",attrs:{fluid:""}},[n("v-row",[n("app-card",{attrs:{heading:"English About Us",colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[n("quill-editor",{ref:"enEditor",attrs:{options:t.editorOption},on:{change:function(e){return t.onEnEditorChange(e)}},model:{value:t.item.en_name,callback:function(e){t.$set(t.item,"en_name",e)},expression:"item.en_name"}})],1)],1),n("v-row",[n("app-card",{attrs:{heading:"Arabic About Us",colClasses:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"}},[n("quill-editor",{ref:"arEditor",attrs:{options:t.editorOption},on:{change:function(e){return t.onArEditorChange(e)}},model:{value:t.item.ar_name,callback:function(e){t.$set(t.item,"ar_name",e)},expression:"item.ar_name"}})],1)],1),n("v-btn",{staticClass:"ma-2",attrs:{color:"success"},on:{click:function(e){return t.saveItem()}}},[t._v(t._s(t.$t("message.save")))])],1)],1)},o=[],i=n("5530"),s=(n("d3b7"),n("e065")),c=n("2f62"),r=n("365c"),l=n("2b0e"),d={components:{},data:function(){return{loading:!1,editorOption:{},baseUrl:s["a"].baseUrl,item:{id:-1,en_name:"",ar_name:""}}},computed:Object(i["a"])({},Object(c["b"])(["getUser","selectedLocale"])),methods:{getItems:function(){var t=this;this.loading=!0,r["a"].get("getTermsAndConditions",{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(e){e.data.success&&null!=e.data.data&&(t.item=e.data.data)})).catch((function(t){console.log(t)})).finally((function(){t.loading=!1}))},saveItem:function(){var t=this;""!=this.item.en_name&&""!=this.item.ar_name?r["a"].post("saveTermsAndConditions",JSON.stringify(this.item),{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.getUser.token)}}).then((function(e){e.data.success&&(null!=e.data.data&&(t.item.id=e.data.data.id),l["default"].notify({group:"loggedIn",type:"success",text:"Saved successfully"}))})).catch((function(t){console.log(t)})).finally((function(){t.loading=!1})):l["default"].notify({group:"loggedIn",type:"error",text:"Input all text correctly"})},onEnEditorChange:function(t){},onArEditorChange:function(t){}},mounted:function(){this.getItems()},beforeMount:function(){}},u=d,m=n("2877"),f=n("6544"),g=n.n(f),p=n("8336"),h=n("a523"),b=n("0fd9"),v=Object(m["a"])(u,a,o,!1,null,null,null);e["default"]=v.exports;g()(v,{VBtn:p["a"],VContainer:h["a"],VRow:b["a"]})}}]);