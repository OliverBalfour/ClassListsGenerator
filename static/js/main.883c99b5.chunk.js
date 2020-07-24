(this.webpackJsonpcra=this.webpackJsonpcra||[]).push([[0],{100:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(10),s=a.n(i),o=a(20),l=a(66),c=a(67),u=a(76),m=a(75),d=a(152),f=a(102),p=a(4),h=a(29),g=a(129),E=a(131),b=a(133),v=a(134),O=a(135),S=a(136),C=a(156),k=a(157),y=a(71),x=a.n(y);function j(e){var t=Object(g.a)((function(e){return{header:{position:"absolute",top:0,left:0,width:"100%",height:"50px",backgroundColor:e.palette.primary.main,color:"white"},headerLeft:{position:"absolute",top:0,left:0,margin:e.spacing(1),fontFamily:"sans-serif",fontSize:"26px"},headerRight:{position:"absolute",top:0,right:0,padding:6},headerButtonGroup:{marginLeft:e.spacing(1)}}}))(),a=r.a.useState(!1),n=Object(h.a)(a,2),i=n[0],s=n[1],o=r.a.useRef(null),l=function(e){o.current&&o.current.contains(e.target)||s(!i)};return r.a.createElement(d.a,{className:t.header},r.a.createElement(d.a,{className:t.headerLeft},"Class Lists Generator App"),e.showOptions&&r.a.createElement(d.a,{className:t.headerRight},"editing"!==e.state&&r.a.createElement(E.a,{variant:"contained",color:"default",className:t.headerButtonGroup},r.a.createElement(f.a,{onClick:e.restart},"Start over"),r.a.createElement(f.a,{onClick:function(){return e.toggleState("working")}},"working"===e.state?"Pause":"Keep working")),r.a.createElement(E.a,{variant:"contained",color:"default",className:t.headerButtonGroup,ref:o},r.a.createElement(f.a,{onClick:function(){return e.toggleState("editing")}},"editing"===e.state?"Done Editing":"Edit"),"editing"!==e.state&&r.a.createElement(f.a,{onClick:e.save},"Save"),"editing"!==e.state&&r.a.createElement(f.a,{size:"small",onClick:function(){return s(!i)}},r.a.createElement(x.a,null))),r.a.createElement(b.a,{open:i,anchorEl:o.current,transition:!0,disablePortal:!0},(function(t){var a=t.TransitionProps,n=t.place;return r.a.createElement(v.a,Object.assign({},a,{style:{transformOrigin:"bottom"===n?"center top":"center bottom"}}),r.a.createElement(O.a,null,r.a.createElement(S.a,{onClickAway:l},r.a.createElement(C.a,{id:"split-button-menu"},r.a.createElement(k.a,{onClick:function(){s(!1),e.import()}},"Import Spreadsheet (CSV)"),r.a.createElement(k.a,{onClick:function(){s(!1),e.export()}},"Export Spreadsheet (CSV)"),r.a.createElement(k.a,{onClick:function(){s(!1),e.openListManager()}},"See Saved Class Lists")))))}))))}var w=a(137),N=a(138),B=a(139),W=a(140),T=a(141),z=a(142),L=a(158),F=a(73),I=a.n(F);function M(e){var t=Object(g.a)((function(e){return{paper:{padding:e.spacing(2),marginTop:"58px",marginRight:e.spacing(1),fontFamily:"sans-serif",width:"320px"},listName:{fontSize:"20px",display:"block",marginBottom:"10px"},className:{margin:0,fontFamily:"sans-serif",fontSize:"20px"},pencil:{float:"right",cursor:"pointer"}}}))(),a=e.list.map((function(t){return e.students[t].categories.map((function(e,t){return e&&0!==t?t:-1})).filter((function(e){return e>=0}))}));return r.a.createElement(w.a,{component:O.a,className:t.paper},r.a.createElement(N.a,{size:"small"},r.a.createElement(B.a,null,r.a.createElement(W.a,null,r.a.createElement(T.a,null,r.a.createElement("h1",{className:t.className},e.name)))),r.a.createElement(z.a,null,e.list.map((function(t){return e.students[t].name})).map((function(n,i){return r.a.createElement(W.a,{key:i},r.a.createElement(T.a,null,n," \xa0\xa0",a[i].map((function(t){return r.a.createElement("span",{key:t},r.a.createElement(L.a,{label:e.categories[t],size:"small"}),"\xa0")})),"editing"!==e.state?null:r.a.createElement(I.a,{className:t.pencil,onClick:function(){return e.editStudent(e.list[i])}})))})))))}function P(e){var t=Object(g.a)((function(e){return{body:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"#EEE",margin:0,display:"flex"},columnContainer:{position:"relative",width:"100%",top:0,bottom:0,padding:e.spacing(2),overflowX:"scroll",whiteSpace:"nowrap"},columnBox:{position:"relative",width:"360px",display:"inline-block",margin:e.spacing(1),marginTop:0}}}))();return r.a.createElement(d.a,{className:t.body},r.a.createElement(d.a,{className:t.columnContainer},e.teachers.map((function(a,n){return r.a.createElement(d.a,{className:t.columnBox,key:n},r.a.createElement(M,{name:a,list:e.lists[n],students:e.students,categories:e.categories,state:e.state,editStudent:e.editStudent}))}))))}var R=a(41),G=a(151),J=a(155),_=a(145),A=a(146),U=a(147),V=a(143),D=a(144),K=a(148),X=a(149),$=a(153),q=a(150);function H(e){var t,a=e.students.map((function(e){return e.name})),n=r.a.useState(JSON.parse(JSON.stringify(e.students[e.student_idx]))),i=Object(h.a)(n,2),s=i[0],l=i[1],c=r.a.useState(""),u=Object(h.a)(c,2),m=u[0],d=u[1],p=r.a.useState({friends:s.friends.map((function(e){return a[e]})).join(", "),mustBeWith:s.mustBeWith.map((function(e){return a[e]})).join(", "),cannotBeWith:s.cannotBeWith.map((function(t){return e.students[t].name})).join(", ")}),g=Object(h.a)(p,2),E=g[0],b=g[1],v=function(e){return function(t){return b(Object(o.a)(Object(o.a)({},E),{},Object(R.a)({},e,t.target.value)))}},O=function(t){for(var n={},r=!1,i=0,s=Object.entries(E);i<s.length;i++){var o=Object(h.a)(s[i],2),c=o[0],u=o[1];n[c]=""===u?[]:u.split(",").map((function(e){return a.indexOf(e.trim())}));var m=n[c].indexOf(-1);-1!==m&&(r=u.split(",")[m])}if(0===t.possibleTeachers.length)d("Cannot have zero possible teachers.");else if(!1!==r)d("Invalid name: '"+r+"'. Make sure spelling is exact and there is one comma between each name.");else{for(var f=0,p=Object.entries(n);f<p.length;f++){var g=Object(h.a)(p[f],2),b=g[0],v=g[1];t[b]=v}l(t),e.updateStudent(t)}},S=r.a.createElement(r.a.Fragment,null,r.a.createElement(G.a,{label:"Must be with (comma separated names)",variant:"filled",value:E.mustBeWith,onChange:v("mustBeWith"),fullWidth:!0}),r.a.createElement(G.a,{label:"Cannot be with (comma separated names)",variant:"filled",value:E.cannotBeWith,onChange:v("cannotBeWith"),fullWidth:!0}),r.a.createElement(G.a,{label:"Friends (comma separated names)",variant:"filled",value:E.friends,onChange:v("friends"),fullWidth:!0}));return r.a.createElement(J.a,{open:!0,onClose:function(){},"aria-labelledby":"form-dialog-title"},r.a.createElement(_.a,{id:"form-dialog-title"},"Editing ",s.name),r.a.createElement(A.a,null,r.a.createElement(U.a,null,"To force a class change after lists are generated, you must edit a student's parameters.\xa0",0===m.length?null:r.a.createElement("span",{style:{color:"red"}},"Error: ",m)),r.a.createElement(G.a,{label:"Name",variant:"filled",value:s.name,onChange:(t="name",function(e){return l(Object(o.a)(Object(o.a)({},s),{},Object(R.a)({},t,e.target.value.trim())))}),fullWidth:!0}),r.a.createElement(V.a,{component:"fieldset",style:{marginTop:"20px"}},r.a.createElement(D.a,{component:"legend"},"Categories"),r.a.createElement(K.a,null,s.categories.map((function(t,a){return r.a.createElement(X.a,{control:r.a.createElement($.a,{checked:t,onChange:function(){s.categories[a]=!s.categories[a],l(Object(o.a)({},s))}}),label:e.categories[a],key:a})})))),r.a.createElement(V.a,{component:"fieldset",style:{marginTop:"20px"}},r.a.createElement(D.a,{component:"legend"},"Possible teachers"),r.a.createElement(K.a,null,e.teachers.map((function(e,t){return r.a.createElement(X.a,{control:r.a.createElement($.a,{checked:-1!==s.possibleTeachers.indexOf(t),onChange:function(){var e=s.possibleTeachers.indexOf(t);-1===e?s.possibleTeachers.push(t):s.possibleTeachers.splice(e,1),l(Object(o.a)({},s))}}),label:e,key:t})})))),S),r.a.createElement(q.a,null,r.a.createElement(f.a,{color:"primary",onClick:function(){return O(e.students[e.student_idx])}},"Cancel"),r.a.createElement(f.a,{onClick:function(){return O(s)},color:"primary"},"Update")))}var Q=a(57),Y=a(74);function Z(e,t){for(var a=function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e}(e.map((function(e,t){return t}))),n=[],r=0,i=Math.ceil(e.length/t),s=0;s<t;s++)n.push(a.slice(r,r+i)),r+=i;return n}var ee=function(e){Object(u.a)(a,e);var t=Object(m.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).state={teacherNames:[],lists:[],state:"view",editingStudent:-1},e}return Object(c.a)(a,[{key:"import",value:function(){var e=this;fetch("./dummy.csv").then((function(t){if(200!==t.status)return console.error(t.status);t.text().then((function(t){var a=function(e){for(var t=e.split(/[\r\n]+/);-1!==t.indexOf("");)t.splice(t.indexOf(""),1);for(var a=function(e){var t,a=!1,n=[],r="",i=Object(Y.a)(e);try{for(i.s();!(t=i.n()).done;){var s=t.value;'"'!==s?a||","!==s?r+=s:(n.push(r.trim()),r=""):a=!a}}catch(o){i.e(o)}finally{i.f()}return n.push(r.trim()),n},n=parseInt(t[1].split(",")[5]),r=parseInt(t[1].split(",")[1]),i=parseInt(t[1].split(",")[2]),s=a(t[1]).slice(8).filter((function(e){return e.length>0})),o=["Female"].concat(Object(Q.a)(a(t[5]).slice(10))),l=[],c=t.slice(6).map((function(e){return e.substring(0,e.indexOf(","))})),u=6;u<t.length;u++){var m=a(t[u]);m.length<10&&console.log("Is there a / at the end of the URL?"),l.push({name:m[0],categories:["F"===m[1]].concat(Object(Q.a)(m.slice(10).map((function(e){return e.length>0})))),friends:m.slice(2,7).map((function(e){return c.indexOf(e)})).filter((function(e){return e>=0})),mustBeWith:0===m[8].length?[]:a(m[8]).map((function(e){return c.indexOf(e)})).filter((function(e){return e>=0})),cannotBeWith:0===m[7].length?[]:a(m[7]).map((function(e){return c.indexOf(e)})).filter((function(e){return e>=0})),possibleTeachers:"all"===m[9].toLowerCase()||"any"===m[9].toLowerCase()||""===m[9]?s.map((function(e,t){return t})):a(m[9]).map((function(e){return s.indexOf(e)})).filter((function(e){return e>=0}))})}return{numClasses:n,classSize:[r,i],teacherNames:s,categories:o,students:l,studentNames:c}}(t),n=Z(a.studentNames,a.numClasses);e.setState(Object(o.a)(Object(o.a)({},a),{},{lists:n}))}))})).catch(console.log)}},{key:"toggleState",value:function(e){this.state.state!==e?this.setState({state:e}):this.setState({state:"import"})}},{key:"editStudent",value:function(e){this.setState({editingStudent:e})}},{key:"render",value:function(){var e=this,t=this.props.classes;return r.a.createElement(d.a,{className:t.root},this.state.teacherNames.length?r.a.createElement(P,{teachers:this.state.teacherNames,students:this.state.students,categories:this.state.categories,lists:this.state.lists,state:this.state.state,editStudent:this.editStudent.bind(this)}):r.a.createElement(d.a,{className:t.fallback},"Please \xa0",r.a.createElement(f.a,{onClick:this.import.bind(this),size:"large",color:"primary",variant:"contained"},"import"),"\xa0 a spreadsheet"),r.a.createElement(j,{import:this.import.bind(this),export:function(){},openListManager:function(){},toggleState:this.toggleState.bind(this),save:function(){},restart:function(){return e.setState({lists:Z(e.state.studentNames,e.state.numClasses)})},state:this.state.state,showOptions:this.state.teacherNames.length>0}),this.state.editingStudent<0?null:r.a.createElement(H,{student_idx:this.state.editingStudent,teachers:this.state.teacherNames,students:this.state.students,categories:this.state.categories,updateStudent:function(t){var a=e.state.students;a[e.state.editingStudent]=t,e.setState({students:a,editingStudent:-1})}}))}}]),a}(r.a.Component),te=Object(p.a)((function(e){return{root:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"#EEE"},fallback:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"sans-serif",fontSize:"30px"}}}))(ee);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},90:function(e,t,a){e.exports=a(100)}},[[90,1,2]]]);
//# sourceMappingURL=main.883c99b5.chunk.js.map