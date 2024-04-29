/*!
 *  build: vue-admin-beautiful 
 *  vue-admin-beautiful author: chuzhixin 1204505056@qq.com 
 *  vue-admin-beautiful QQ Group(QQ群): 972435319、1139183756 
 *  time: 2023-8-18 17:41:10
 */
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cd6db098"],{"0edd":function(e,t,a){"use strict";a.r(t);var r=a("f2bf"),n=function(e){return Object(r["I"])("data-v-6cb26c18"),e=e(),Object(r["G"])(),e},c={class:"career-container"},i={class:"department-select"},l=n((function(){return Object(r["m"])("div",{class:"department-title"},"类别选择：",-1)})),u={class:"department-select"},s=n((function(){return Object(r["m"])("div",{class:"department-title"},"类目选择：",-1)})),d={key:0,class:"example"},o={key:1},b={class:"add-new"},O=Object(r["n"])(" 添加 ");function p(e,t,a,n,p,j){var f=Object(r["N"])("a-select-option"),v=Object(r["N"])("a-select"),h=Object(r["N"])("a-radio"),m=Object(r["N"])("a-radio-group"),g=Object(r["N"])("a-spin"),C=Object(r["N"])("row-card"),y=Object(r["N"])("PlusOutlined"),L=Object(r["N"])("a-button");return Object(r["F"])(),Object(r["l"])("div",c,[Object(r["m"])("div",i,[l,Object(r["o"])(v,{"default-value":"建筑大类",style:{width:"120px"},onChange:j.handleDepartmentChange},{default:Object(r["X"])((function(){return[(Object(r["F"])(!0),Object(r["l"])(r["b"],null,Object(r["L"])(p.departmentList,(function(e,t){return Object(r["F"])(),Object(r["j"])(f,{key:t},{default:Object(r["X"])((function(){return[Object(r["n"])(Object(r["Q"])(e.label),1)]})),_:2},1024)})),128))]})),_:1},8,["onChange"])]),Object(r["m"])("div",u,[s,Object(r["o"])(m,{name:"radioGroup","default-value":1},{default:Object(r["X"])((function(){return[(Object(r["F"])(!0),Object(r["l"])(r["b"],null,Object(r["L"])(p.categoryList,(function(e,t){return Object(r["F"])(),Object(r["j"])(h,{key:t,value:e.value,onChange:j.handleCategoryChanged},{default:Object(r["X"])((function(){return[Object(r["n"])(Object(r["Q"])(e.label),1)]})),_:2},1032,["value","onChange"])})),128))]})),_:1})]),p.loading?(Object(r["F"])(),Object(r["l"])("div",d,[Object(r["o"])(g)])):(Object(r["F"])(),Object(r["l"])("div",o,[(Object(r["F"])(!0),Object(r["l"])(r["b"],null,Object(r["L"])(p.careerList,(function(e,t){return Object(r["F"])(),Object(r["l"])("div",{class:"card-list-container",key:t},[Object(r["o"])(C,{careerDetail:e,index:t,onUpdate:j.getCareersListFun},null,8,["careerDetail","index","onUpdate"])])})),128)),Object(r["m"])("div",b,[Object(r["o"])(L,{style:{"margin-right":"10px"},onClick:j.addNew,type:"primary"},{default:Object(r["X"])((function(){return[Object(r["o"])(y),O]})),_:1},8,["onClick"])])]))])}var j=a("5530"),f=(a("a434"),a("5502")),v=a("21ad"),h=a("47ce"),m=a("dc70"),g={name:"career",components:{RowCard:v["default"],PlusOutlined:h["a"]},data:function(){return{department:"architecture",category:1,careerList:[],loading:!1,departmentList:m["listData"].departmentList,categoryList:[{label:"留学方式",value:1},{label:"择校",value:2},{label:"备考",value:3},{label:"留学生活分享",value:4}]}},methods:Object(j["a"])(Object(j["a"])({},Object(f["b"])({getCareersList:"college/getCareersList"})),{},{initCareersList:function(){this.careerList=[];var e={department:this.department,category:this.category,title:"",description:"",link:"",weight:0};this.careerList.push(e)},handleDepartmentChange:function(e){this.department=this.departmentList[e].value,this.getCareersListFun()},handleCategoryChanged:function(e){this.category=e.target.value,this.getCareersListFun()},addNew:function(){var e={department:this.department,category:this.category,title:"",description:"",link:"",weight:0};this.careerList.push(e)},getCareersListFun:function(e){var t=this;this.loading=!0,e?(this.careerList.splice(e,1),this.loading=!1):this.getCareersList({query:{department:this.department,category:this.category},callback:function(e){e.data&&"number"===typeof e.data.length&&0!==e.data.length?(t.careerList=e.data,t.loading=!1):(t.loading=!1,t.initCareersList())}})}}),mounted:function(){this.getCareersListFun()}},C=(a("ccbd"),a("6b0d")),y=a.n(C);const L=y()(g,[["render",p],["__scopeId","data-v-6cb26c18"]]);t["default"]=L},"21ad":function(e,t,a){"use strict";a.r(t);a("9911"),a("a4d3"),a("e01a");var r=a("f2bf"),n=function(e){return Object(r["I"])("data-v-fb257890"),e=e(),Object(r["G"])(),e},c={class:"card-container"},i={class:"card-text"},l={class:"card-input"},u=n((function(){return Object(r["m"])("div",{style:{width:"120px"}},"标题：",-1)})),s={class:"card-input"},d=n((function(){return Object(r["m"])("div",{style:{width:"120px"}},"链接：",-1)})),o={class:"card-input"},b=n((function(){return Object(r["m"])("div",{style:{width:"120px"}},"描述：",-1)})),O={class:"card-input"},p=n((function(){return Object(r["m"])("div",{style:{width:"109px"}},"权重：",-1)})),j={class:"btn-group"},f=Object(r["n"])(" 提交 "),v=Object(r["n"])("删除");function h(e,t,a,n,h,m){var g=Object(r["N"])("a-input"),C=Object(r["N"])("a-textarea"),y=Object(r["N"])("a-input-number"),L=Object(r["N"])("a-button"),w=Object(r["N"])("a-popconfirm");return Object(r["F"])(),Object(r["l"])(r["b"],null,[Object(r["m"])("div",c,[Object(r["m"])("div",i,[Object(r["m"])("div",l,[u,Object(r["o"])(g,{value:h.careerDetailCard.title,"onUpdate:value":t[0]||(t[0]=function(e){return h.careerDetailCard.title=e})},null,8,["value"])]),Object(r["m"])("div",s,[d,Object(r["o"])(g,{value:h.careerDetailCard.link,"onUpdate:value":t[1]||(t[1]=function(e){return h.careerDetailCard.link=e})},null,8,["value"])]),Object(r["m"])("div",o,[b,Object(r["o"])(C,{value:h.careerDetailCard.description,"onUpdate:value":t[2]||(t[2]=function(e){return h.careerDetailCard.description=e})},null,8,["value"])]),Object(r["m"])("div",O,[p,Object(r["o"])(y,{value:h.careerDetailCard.weight,"onUpdate:value":t[3]||(t[3]=function(e){return h.careerDetailCard.weight=e})},null,8,["value"])])])]),Object(r["m"])("div",j,[Object(r["o"])(L,{style:{"margin-right":"10px"},onClick:m.saveCareerFun,type:"primary"},{default:Object(r["X"])((function(){return[f]})),_:1},8,["onClick"]),Object(r["o"])(w,{title:"确定删除吗？",onConfirm:t[4]||(t[4]=function(){return m.deleteCareerFun(h.careerDetailCard._id)})},{default:Object(r["X"])((function(){return[Object(r["o"])(L,{type:"danger"},{default:Object(r["X"])((function(){return[v]})),_:1})]})),_:1})])],64)}var m=a("5530"),g=(a("e9c4"),a("5502")),C={name:"RowCard",props:{careerDetail:{type:Object},index:{type:Object}},components:{},data:function(){return{careerDetailCard:{department:"",name:"",description:"",avatar:"",weight:0}}},methods:Object(m["a"])(Object(m["a"])({},Object(g["b"])({saveCareer:"college/saveCareer",deleteCareer:"college/deleteCareer"})),{},{saveCareerFun:function(){var e=this;this.saveCareer({data:this.careerDetailCard,callback:function(t){t&&(e.$message.success("提交成功。"),e.$emit("update"))}})},deleteCareerFun:function(e){var t=this;e?this.deleteCareer({data:{_id:e},callback:function(e){e&&(t.$message.success("删除成功。"),t.$emit("update"))}}):(this.$emit("update",this.index),this.$message.success("删除成功"))},handleFileUpload:function(e){this.careerDetailCard.avatar=e}}),watch:{careerDetail:{handler:function(e){e&&(this.careerDetailCard=JSON.parse(JSON.stringify(e)))},deep:!0,immediate:!0}},mounted:function(){this.careerDetailCard=JSON.parse(JSON.stringify(this.careerDetail))}},y=(a("95e2"),a("6b0d")),L=a.n(y);const w=L()(C,[["render",h],["__scopeId","data-v-fb257890"]]);t["default"]=w},3753:function(e,t,a){},"857a":function(e,t,a){var r=a("e330"),n=a("1d80"),c=a("577e"),i=/"/g,l=r("".replace);e.exports=function(e,t,a,r){var u=c(n(e)),s="<"+t;return""!==a&&(s+=" "+a+'="'+l(c(r),i,"&quot;")+'"'),s+">"+u+"</"+t+">"}},"95e2":function(e,t,a){"use strict";a("c9db")},9911:function(e,t,a){"use strict";var r=a("23e7"),n=a("857a"),c=a("af03");r({target:"String",proto:!0,forced:c("link")},{link:function(e){return n(this,"a","href",e)}})},af03:function(e,t,a){var r=a("d039");e.exports=function(e){return r((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},c9db:function(e,t,a){},ccbd:function(e,t,a){"use strict";a("3753")},dc70:function(e,t,a){"use strict";a.r(t),a.d(t,"listData",(function(){return r}));var r={departmentList:[{label:"建筑大类",value:"architecture"},{label:"理工大类",value:"engineering"},{label:"艺术大类",value:"art"}],commentHeaderList:[{label:"各类申请",value:"apply"},{label:"研究计划书",value:"plan"},{label:"笔试课程",value:"exam"},{label:"面试辅导",value:"interview"},{label:"专项辅导",value:"subject"}],commentHeaderListArt:[{label:"各类申请",value:"apply"},{label:"研究计划书",value:"plan"},{label:"作品集",value:"essay"},{label:"实技",value:"skills"},{label:"面试辅导",value:"interview"},{label:"小论文",value:"article"},{label:"专项辅导",value:"subject"}],listColumns:[{title:"课程名称",dataIndex:"courseName",key:"courseName",fixed:"left",width:200},{title:"主讲老师",dataIndex:"presenter",key:"presenter",fixed:"left"},{title:"更多操作",dataIndex:"operation",key:"operation",width:300,fixed:"right",slots:{customRender:"operation"}}]}}}]);