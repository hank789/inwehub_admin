(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10021a31"],{"2a16":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-button",{staticClass:"add-latest-news",attrs:{type:"primary"},on:{click:t.addContent}},[t._v(t._s(t.addTitle))]),t._v(" "),i("el-dialog",{attrs:{title:"确定删除？",visible:t.centerDialogVisible,width:"30%",center:""},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[i("span",[t._v("删除后将不可恢复。")]),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.deleteNews}},[t._v("确 定")])],1)]),t._v(" "),i("el-dialog",{attrs:{title:t.title,visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{staticClass:"form-wrapper",attrs:{model:t.form,"label-position":"top"}},[i("el-form-item",{attrs:{label:"","label-width":t.formLabelWidth}},[i("el-input",{attrs:{autocomplete:"off",placeholder:t.placeholder},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}}),t._v(" "),i("div",{staticClass:"search",on:{click:t.search}},[t._v("搜索")]),t._v(" "),t.linkUrl?i("div",{staticClass:"urlInfoWrapper"},[i("div",{staticClass:"urlName"},[t._v(t._s(t.searchInfo.title))]),t._v(" "),i("div",{staticClass:"bottomInfo"},[i("span",[t._v(t._s(t.searchInfo.date))]),t._v(" "),i("i"),t._v(" "),i("span",[t._v(t._s(t.searchInfo.author))])])]):t._e(),t._v(" "),t.sourceTitle?i("div",{staticClass:"sourceTitle"},[t._v(t._s(t.weChatTitle))]):t._e()],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.submitPoint}},[t._v("确 定")])],1)],1),t._v(" "),i("el-tabs",{staticClass:"container-tabs",on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[i("el-tab-pane",{attrs:{label:"资讯管理",name:"first"}},[t._v("资讯管理")]),t._v(" "),i("el-tab-pane",{attrs:{label:"内容源管理",name:"second"}},[t._v("内容源管理")])],1),t._v(" "),"first"===t.activeName?i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"container-table",staticStyle:{width:"100%"},attrs:{data:t.list,border:!1,fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"标题","min-width":"440px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("a",{attrs:{href:e.ro.link_url,target:"_blank"}},[i("span",[t._v(t._s(e.row.title))])])]}}],null,!1,1801661748)}),t._v(" "),i("el-table-column",{attrs:{width:"300px",align:"center",label:"来源"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.author))])]}}],null,!1,1218899251)}),t._v(" "),i("el-table-column",{attrs:{width:"280px",align:"center",label:"收录时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.date))])]}}],null,!1,1531225394)}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"",width:"170"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-checkbox",{attrs:{"true-label":1,"false-label":0},on:{change:function(i){return t.selectTrigger(e.row,1)}},model:{value:e.row.status,callback:function(i){t.$set(e.row,"status",i)},expression:"scope.row.status"}},[t._v(t._s(e.row.status?"显示":"隐藏"))]),t._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:function(i){return t.selectTrigger(e.row,2)}}})]}}],null,!1,3548494873)})],1):t._e(),t._v(" "),"second"===t.activeName?i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticClass:"container-table",staticStyle:{width:"100%"},attrs:{data:t.list,border:!1,fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",label:"源名称","min-width":"300px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}],null,!1,2020036417)}),t._v(" "),i("el-table-column",{attrs:{width:"280px",align:"center",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.type))])]}}],null,!1,1406222782)}),t._v(" "),i("el-table-column",{attrs:{width:"180px",align:"center",label:"资讯数"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.news_count))])]}}],null,!1,1738676725)}),t._v(" "),i("el-table-column",{attrs:{width:"330px",align:"center",label:"最近更新"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.last_update))])]}}],null,!1,2384101282)}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",icon:"el-icon-delete"},on:{click:function(i){return t.deleSource(e.row)}}})]}}],null,!1,4260880401)})],1):t._e(),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1)},n=[],s=(i("7f7f"),i("c4c8")),l=i("333d"),o={name:"ArticleList",components:{Pagination:l["a"]},filters:{statusFilter:function(t){var e={published:"success",draft:"info",deleted:"danger"};return e[t]}},data:function(){return{dialogFormVisible:!1,form:{name:""},formLabelWidth:"120px",list:null,total:0,listLoading:!0,listQuery:{page:1,product_id:""},checked:!0,activeName:"first",searchInfo:{},title:"",weChatTitle:"",sourceTitle:!1,linkUrl:!1,placeholder:"",sourceId:"",centerDialogVisible:!1,item:{},addTitle:"添加资讯"}},watch:{activeName:function(){this.getList(),"first"===this.activeName?this.addTitle="添加资讯":"second"===this.activeName&&(this.addTitle="添加内容源")}},created:function(){var t=this;this.$store.dispatch("product/getProductInfo",function(e){t.listQuery.product_id=e.id,t.getList()})},methods:{addContent:function(){this.dialogFormVisible=!0,"first"===this.activeName?(this.title="添加资讯",this.placeholder="输入文章链接"):"second"===this.activeName&&(this.title="添加内容源",this.placeholder="请输入公众号名称或微信号")},search:function(){var t=this;"first"===this.activeName?Object(s["e"])({url:this.form.name}).then(function(e){1e3===e.code&&(t.linkUrl=!0,t.searchInfo=e.data)}):"second"===this.activeName&&Object(s["d"])({product_id:this.listQuery.product_id,source:this.form.name}).then(function(e){1e3===e.code&&(t.sourceTitle=!0,t.weChatTitle=e.data.title,t.sourceId=e.data.source_id)})},submitPoint:function(){var t=this;"first"===this.activeName?Object(s["q"])({url:this.form.name,product_id:this.listQuery.product_id}).then(function(e){1e3===e.code?(t.$message({message:"提交成功",type:"success"}),t.getList(),t.dialogFormVisible=!1,t.form.name="",t.linkUrl=!1):t.$message({message:e.message,type:"error"})}):"second"===this.activeName&&Object(s["r"])({id:this.listQuery.product_id,source:this.form.name,source_id:this.sourceId}).then(function(e){1e3===e.code?(t.$message({message:"提交成功",type:"success"}),t.getList(),t.dialogFormVisible=!1,t.form.name="",t.sourceTitle=!1):t.$message({message:e.message,type:"error"})})},deleSource:function(t){this.centerDialogVisible=!0,this.item=t},deleteNews:function(){var t=this;"first"===this.activeName?Object(s["y"])({product_id:this.listQuery.product_id,news_id:this.item.id,status:3}).then(function(e){if(1e3===e.code){t.$message({message:"删除成功",type:"success"});var i=t.list.indexOf(t.item);t.list.splice(i,1),t.centerDialogVisible=!1}}):"second"===this.activeName&&Object(s["b"])({source_id:this.item.id}).then(function(e){if(1e3===e.code){t.$message({message:"删除成功",type:"success"});var i=t.list.indexOf(t.item);t.list.splice(i,1),t.centerDialogVisible=!1}})},selectTrigger:function(t,e){console.log(t,"数据"),1===e&&Object(s["y"])({product_id:this.listQuery.product_id,news_id:t.id,status:t.status}).then(function(e){t.status=e.data.status}),2===e&&(this.item=t,this.centerDialogVisible=!0)},handleClick:function(t,e){console.log(e.srcElement.innerText,this.activeName,"tab:event")},getList:function(){var t=this;this.listLoading=!0,"first"===this.activeName?Object(s["j"])(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1}):"second"===this.activeName&&Object(s["n"])(this.listQuery).then(function(e){t.list=e.data.data,t.total=e.data.total,t.listLoading=!1})},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()}}},r=o,c=(i("a973"),i("5000"),i("2877")),u=Object(c["a"])(r,a,n,!1,null,"7aaf5477",null);e["default"]=u.exports},"333d":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[i("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},n=[];i("c5f6");Math.easeInOutQuad=function(t,e,i,a){return t/=a/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var s=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function l(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function r(t,e,i){var a=o(),n=t-a,r=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=r;var o=Math.easeInOutQuad(c,a,n,e);l(o),c<e?s(t):i&&"function"===typeof i&&i()};u()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&r(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&r(0,800)}}},u=c,d=(i("dfcf"),i("2877")),f=Object(d["a"])(u,a,n,!1,null,"38ef71f0",null);e["a"]=f.exports},5000:function(t,e,i){"use strict";var a=i("b2ae"),n=i.n(a);n.a},"524b":function(t,e,i){},"690d":function(t,e,i){},a973:function(t,e,i){"use strict";var a=i("524b"),n=i.n(a);n.a},b2ae:function(t,e,i){},dfcf:function(t,e,i){"use strict";var a=i("690d"),n=i.n(a);n.a}}]);