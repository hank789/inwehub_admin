(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6981eb73"],{2017:function(e,t,n){"use strict";var o=n("3b76"),s=n.n(o);s.a},"3b76":function(e,t,n){},"9ed6":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[n("div",{staticClass:"title-container"},[n("h3",{staticClass:"title"},[e._v("\n        "+e._s(e.$t("login.title"))+"\n      ")])]),e._v(" "),n("el-form-item",{attrs:{prop:"username"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),n("el-input",{attrs:{placeholder:e.$t("login.username"),name:"username",type:"text","auto-complete":"on"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),e._v(" "),n("el-form-item",{attrs:{prop:"password"}},[n("span",{staticClass:"svg-container"},[n("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),n("el-input",{attrs:{type:e.passwordType,placeholder:e.$t("login.password"),name:"password","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),e._v(" "),n("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[n("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),n("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("\n      "+e._s(e.$t("login.logIn"))+"\n    ")])],1)],1)},s=[],r=n("61f7"),i={name:"Login",components:{},data:function(){var e=function(e,t,n){Object(r["d"])(t)?n():n(new Error("请输入正确的手机号"))},t=function(e,t,n){t.length<6?n(new Error("密码不能小于6位")):n()};return{loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}]},passwordType:"password",loading:!1,showDialog:!1,redirect:void 0,token:""}},watch:{$route:{handler:function(e){var t=this;this.redirect=e.query&&e.query.redirect,this.token=e.query&&e.query.token,this.token&&this.$store.dispatch("user/loginByToken",this.token).then(function(){t.$router.push({path:t.redirect||"/"}),t.loading=!1}).catch(function(){t.loading=!1})},immediate:!0}},created:function(){},destroyed:function(){},methods:{showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(t){if(!t)return console.log("error submit!!"),!1;e.loading=!0,e.$store.dispatch("user/login",e.loginForm).then(function(){e.$router.push({path:e.redirect||"/"}),e.loading=!1}).catch(function(){e.loading=!1})})}}},a=i,l=(n("2017"),n("b10e"),n("2877")),c=Object(l["a"])(a,o,s,!1,null,"5cf92281",null);t["default"]=c.exports},b10e:function(e,t,n){"use strict";var o=n("fcd4"),s=n.n(o);s.a},fcd4:function(e,t,n){}}]);