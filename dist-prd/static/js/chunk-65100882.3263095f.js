(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65100882"],{"0c4e":function(t,a,e){},2204:function(t,a,e){"use strict";var i=e("0c4e"),n=e.n(i);n.a},"604f":function(t,a,e){},"69c2":function(t,a,e){"use strict";var i=e("604f"),n=e.n(i);n.a},8752:function(t,a,e){},9406:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-container"},[e(t.currentRole,{tag:"component"})],1)},n=[],s=(e("6762"),e("2fdb"),e("cebc")),r=e("2f62"),o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("浏览情况")])]),t._v(" "),e("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(a){t.activeName=a},expression:"activeName"}},[e("el-tab-pane",{attrs:{label:"7天",name:"seven"}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.lineChartData.isInit,expression:"!lineChartData.isInit"}]},[e("div",{staticClass:"totalCount"},[t._v(t._s(t.lineChartData.totalCount)),e("span",[t._v("浏览量(次)")])]),t._v(" "),e("el-row",{staticStyle:{background:"#fff",padding:"16px 16px 0","margin-bottom":"32px"}},[e("line-chart",{attrs:{"chart-data":t.lineChartData}})],1)],1)]),t._v(" "),e("el-tab-pane",{attrs:{label:"30天",name:"thirty"}},[e("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.lineChartThirtyData.isInit,expression:"!lineChartThirtyData.isInit"}]},[e("div",{staticClass:"totalCount"},[t._v(t._s(t.lineChartThirtyData.totalCount)),e("span",[t._v("浏览量(次)")])]),t._v(" "),e("el-row",{staticStyle:{background:"#fff",padding:"16px 16px 0","margin-bottom":"32px"}},[t.lineChartThirtyData.isInit?e("line-chart",{attrs:{"chart-data":t.lineChartThirtyData}}):t._e()],1)],1)])],1)],1),t._v(" "),e("el-card",{staticClass:"box-card",staticStyle:{"margin-top":"20px"}},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("小程序二维码")])]),t._v(" "),e("img",{staticClass:"ercode",attrs:{src:t.weappCodeUrl}})])],1)},l=[],c=(e("7f7f"),e("28a5"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{class:t.className,style:{height:t.height,width:t.width}})}),d=[],h=e("313e"),u=e.n(h),p=e("ed08");e("817d");var f={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"350px"},autoResize:{type:Boolean,default:!0},chartData:{type:Object,required:!0}},data:function(){return{chart:null,sidebarElm:null}},watch:{chartData:{deep:!0,handler:function(t){this.setOptions(t)}}},mounted:function(){var t=this;this.initChart(),this.autoResize&&(this.__resizeHandler=Object(p["b"])(function(){t.chart&&t.chart.resize()},100),window.addEventListener("resize",this.__resizeHandler)),this.sidebarElm=document.getElementsByClassName("sidebar-container")[0],this.sidebarElm&&this.sidebarElm.addEventListener("transitionend",this.sidebarResizeHandler)},beforeDestroy:function(){this.chart&&(this.autoResize&&window.removeEventListener("resize",this.__resizeHandler),this.sidebarElm&&this.sidebarElm.removeEventListener("transitionend",this.sidebarResizeHandler),this.chart.dispose(),this.chart=null)},methods:{sidebarResizeHandler:function(t){"width"===t.propertyName&&this.__resizeHandler()},setOptions:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.xAxis,e=t.data;this.chart.setOption({xAxis:{data:a,boundaryGap:!1,axisTick:{show:!1}},grid:{left:10,right:10,bottom:20,top:30,containLabel:!0},tooltip:{trigger:"axis",axisPointer:{type:"cross"},padding:[5,10]},yAxis:{axisTick:{show:!1},minInterval:1},legend:{data:[]},series:[{name:"浏览数",itemStyle:{normal:{color:"#03AEF9",lineStyle:{color:"#03AEF9",width:2}}},smooth:!0,type:"line",data:e,animationDuration:2800,animationEasing:"cubicInOut"}]})},initChart:function(){this.chart=u.a.init(this.$el,"macarons"),this.setOptions(this.chartData)}}},m=f,v=e("2877"),b=Object(v["a"])(m,c,d,!1,null,null,null),C=b.exports,g=e("c4c8");function _(){return(new Date).getTime()}function x(){return w(-7)}function y(){return w(-30)}function w(t){var a=new Date;a.setDate(a.getDate()+t);var e=a.getTime();return e+""}var D={name:"DashboardAdmin",components:{LineChart:C},data:function(){return{activeName:"seven",lineChartData:{xAxis:[],data:[],totalCount:0,isInit:!1},lineChartThirtyData:{xAxis:[],data:[],totalCount:0,isInit:!1},data:null,weappCodeUrl:""}},created:function(){var t=this;this.$store.dispatch("product/getProductInfo",function(a){t.data=a,t.weappCodeUrl=a.weappCodeUrl,t.getLineChartData("seven")})},methods:{getLineChartData:function(t){var a=this.lineChartData,e=x()/1e3;console.log("type",t),"thirty"===t&&(a=this.lineChartThirtyData,e=y()/1e3),a.isInit||Object(g["m"])({id:this.data.id,start_time:e,end_time:_()/1e3}).then(function(t){var e=t.data.list;for(var i in a.totalCount=0,a.isInit=!0,e){var n=e[i].ref_date.split("");n.splice(4,0,"."),n.splice(7,0,"."),a.xAxis.push(n.join("")),a.data.push(e[i].value),a.totalCount+=e[i].value}})},handleClick:function(t,a){this.getLineChartData(t.name)}}},E=D,O=(e("9868"),Object(v["a"])(E,o,l,!1,null,"43c62d46",null)),z=O.exports,L=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"dashboard-editor-container"},[e("div",{staticClass:" clearfix"},[e("pan-thumb",{staticStyle:{float:"left"},attrs:{image:t.avatar}},[t._v("\n      Your roles:\n      "),t._l(t.roles,function(a){return e("span",{key:a,staticClass:"pan-info-roles"},[t._v(t._s(a))])})],2),t._v(" "),e("github-corner",{staticStyle:{position:"absolute",top:"0px",border:"0",right:"0"}}),t._v(" "),e("div",{staticClass:"info-container"},[e("span",{staticClass:"display_name"},[t._v(t._s(t.name))]),t._v(" "),e("span",{staticStyle:{"font-size":"20px","padding-top":"20px",display:"inline-block"}},[t._v("Editor's Dashboard")])])],1),t._v(" "),e("div",[e("img",{staticClass:"emptyGif",attrs:{src:t.emptyGif}})])])},S=[],I=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"pan-item",style:{zIndex:t.zIndex,height:t.height,width:t.width}},[e("div",{staticClass:"pan-info"},[e("div",{staticClass:"pan-info-roles-container"},[t._t("default")],2)]),t._v(" "),e("img",{staticClass:"pan-thumb",attrs:{src:t.image}})])},j=[],k=(e("c5f6"),{name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:1},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}}),T=k,N=(e("2204"),Object(v["a"])(T,I,j,!1,null,"be3d0b3e",null)),A=N.exports,R=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("a",{staticClass:"github-corner",attrs:{href:"https://github.com/PanJiaChen/vue-element-admin",target:"_blank","aria-label":"View source on Github"}},[e("svg",{staticStyle:{fill:"#40c9c6",color:"#fff"},attrs:{width:"80",height:"80",viewBox:"0 0 250 250","aria-hidden":"true"}},[e("path",{attrs:{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}}),t._v(" "),e("path",{staticClass:"octo-arm",staticStyle:{"transform-origin":"130px 106px"},attrs:{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor"}}),t._v(" "),e("path",{staticClass:"octo-body",attrs:{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor"}})])])},$=[],H=(e("96f2"),{}),G=Object(v["a"])(H,R,$,!1,null,"09fe1acc",null),P=G.exports,U={name:"DashboardEditor",components:{PanThumb:A,GithubCorner:P},data:function(){return{emptyGif:"https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3"}},computed:Object(s["a"])({},Object(r["b"])(["name","avatar","roles"]))},B=U,J=(e("69c2"),Object(v["a"])(B,L,S,!1,null,"e3426062",null)),M=J.exports,q={name:"Dashboard",components:{adminDashboard:z,editorDashboard:M},data:function(){return{currentRole:"adminDashboard"}},computed:Object(s["a"])({},Object(r["b"])(["roles"])),created:function(){this.roles.includes("admin")||(this.currentRole="editorDashboard")}},F=q,Z=Object(v["a"])(F,i,n,!1,null,null,null);a["default"]=Z.exports},"96f2":function(t,a,e){"use strict";var i=e("d990"),n=e.n(i);n.a},9868:function(t,a,e){"use strict";var i=e("8752"),n=e.n(i);n.a},d990:function(t,a,e){}}]);