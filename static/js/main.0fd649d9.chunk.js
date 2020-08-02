(this.webpackJsonpcra=this.webpackJsonpcra||[]).push([[0],{105:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(10),i=a.n(r),o=a(11),l=a(69),c=a(70),u=a(48),m=a(79),d=a(78),h=a(158),f=a(107),p=a(4),g=a(22),v=a(134),b=a(137),E=a(138),S=a(139),y=a(140),O=a(141),k=a(164),C=a(165),w=a(74),x=a.n(w);function j(e){var t=Object(v.a)((function(e){return{header:{position:"absolute",top:0,left:0,width:"100%",height:"50px",backgroundColor:e.palette.primary.main,color:"white"},headerLeft:{position:"absolute",top:0,left:0,margin:e.spacing(1),fontFamily:"sans-serif",fontSize:"26px"},headerRight:{position:"absolute",top:0,right:0,padding:6},headerButtonGroup:{marginLeft:e.spacing(1)}}}))(),a=s.a.useState(!1),n=Object(g.a)(a,2),r=n[0],i=n[1],o=s.a.useRef(null),l=function(e){o.current&&o.current.contains(e.target)||i(!r)};return s.a.createElement(h.a,{className:t.header},s.a.createElement(h.a,{className:t.headerLeft},"Class Lists Generator App"),!e.showOptions&&s.a.createElement("a",{href:"https://oliverbalfour.github.io/ClassListsGenerator/docs/instructions.html",style:{color:"white",fontSize:"20px",float:"right",fontFamily:"sans-serif",margin:"14px"},target:"_blank",rel:"noopener noreferrer"},"Instructions"),e.showOptions&&s.a.createElement(h.a,{className:t.headerRight},s.a.createElement(f.a,{onClick:e.viewIssues,color:"default",variant:"contained",style:{marginRight:"10px"}},"View issues (",e.issues.length,")"),"editing"!==e.state&&s.a.createElement(f.a,{onClick:e.restart,color:"default",variant:"contained",style:{marginRight:"10px"}},"Restart"),"editing"!==e.state&&s.a.createElement(f.a,{onClick:function(){return e.toggleState("working")},color:"default",variant:"contained"},"working"===e.state?"Stop":"Start"),s.a.createElement(b.a,{variant:"contained",color:"default",className:t.headerButtonGroup,ref:o},s.a.createElement(f.a,{onClick:function(){return e.toggleState("editing")}},"editing"===e.state?"Done Editing":"Edit"),"editing"!==e.state&&s.a.createElement(f.a,{onClick:e.undo},"Undo"),"editing"!==e.state&&s.a.createElement(f.a,{onClick:e.save},"Save"),"editing"!==e.state&&s.a.createElement(f.a,{size:"small",onClick:function(){return i(!r)}},s.a.createElement(x.a,null))),s.a.createElement(E.a,{open:r,anchorEl:o.current,transition:!0,disablePortal:!0},(function(t){var a=t.TransitionProps,n=t.place;return s.a.createElement(S.a,Object.assign({},a,{style:{transformOrigin:"bottom"===n?"center top":"center bottom"}}),s.a.createElement(y.a,null,s.a.createElement(O.a,{onClickAway:l},s.a.createElement(k.a,{id:"split-button-menu"},s.a.createElement(C.a,{component:"label"},"Import Spreadsheet (CSV)",s.a.createElement("input",{type:"file",style:{display:"none"},onChange:function(t){i(!1),e.importCSV(t)}})),s.a.createElement(C.a,{onClick:function(){i(!1),e.exportCSV()}},"Export Spreadsheet (CSV)"),s.a.createElement(C.a,{onClick:function(){i(!1),e.openListManager()}},"See Saved Class Lists"),s.a.createElement(C.a,{onClick:e.reset},"Clear saved data")))))}))))}var N=a(142),M=a(143),W=a(144),I=a(145),F=a(146),B=a(147),T=a(166),z=a(76),L=a.n(z);function V(e){var t=Object(v.a)((function(e){return{paper:{padding:e.spacing(2),marginTop:"58px",marginRight:e.spacing(1),fontFamily:"sans-serif",width:"320px"},listName:{fontSize:"20px",display:"block",marginBottom:"10px"},className:{margin:0,fontFamily:"sans-serif",fontSize:"20px"},pencil:{float:"right",cursor:"pointer"}}}))(),a=e.list.map((function(t){return e.students[t].categories.map((function(e,t){return e&&0!==t?t:-1})).filter((function(e){return e>=0}))}));return s.a.createElement(N.a,{component:y.a,className:t.paper},s.a.createElement(M.a,{size:"small"},s.a.createElement(W.a,null,s.a.createElement(I.a,null,s.a.createElement(F.a,null,s.a.createElement("h1",{className:t.className},e.name)))),s.a.createElement(B.a,null,e.list.map((function(t){return e.students[t].name})).map((function(n,r){return s.a.createElement(I.a,{key:r},s.a.createElement(F.a,null,n," \xa0\xa0",a[r].map((function(t){return s.a.createElement("span",{key:t},s.a.createElement(T.a,{label:e.categories[t],size:"small"}),"\xa0")})),"editing"!==e.state?null:s.a.createElement(L.a,{className:t.pencil,onClick:function(){return e.editStudent(e.list[r])}})))})))))}function J(e){var t=Object(v.a)((function(e){return{body:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"#EEE",margin:0,display:"flex"},columnContainer:{position:"relative",width:"100%",top:0,bottom:0,padding:e.spacing(2),overflowX:"scroll",whiteSpace:"nowrap"},columnBox:{position:"relative",width:"360px",display:"inline-block",margin:e.spacing(1),marginTop:0}}}))();return s.a.createElement(h.a,{className:t.body},s.a.createElement(h.a,{className:t.columnContainer},e.teachers.map((function(a,n){return s.a.createElement(h.a,{className:t.columnBox,key:n},s.a.createElement(V,{name:a,list:e.lists[n],students:e.students,categories:e.categories,state:e.state,editStudent:e.editStudent}))}))))}var R=a(43),_=a(17),P=a(31);function A(e){for(var t=e.lists,a=e.students,n=e.classSize,s=e.categories,r=e.teacherNames,i=[],o=0;o<t.length;o++){for(var l=t[o],c=0;c<l.length;c++){var u,m=a[l[c]],d=Object(P.a)(m.mustBeWith);try{for(d.s();!(u=d.n()).done;){var h=u.value;-1===l.indexOf(h)&&i.push({severity:3,message:"".concat(m.name," must be with ").concat(a[h].name,".")})}}catch(x){d.e(x)}finally{d.f()}var f,p=Object(P.a)(m.cannotBeWith);try{for(p.s();!(f=p.n()).done;){var g=f.value;-1!==l.indexOf(g)&&i.push({severity:5,message:"".concat(m.name," cannot be with ").concat(a[g].name,".")})}}catch(x){p.e(x)}finally{p.f()}var v,b=0,E=Object(P.a)(m.friends);try{for(E.s();!(v=E.n()).done;){var S=v.value;-1!==l.indexOf(S)&&b++}}catch(x){E.e(x)}finally{E.f()}b<1&&i.push({severity:3,message:"".concat(m.name," is not with any friends.")}),-1===m.possibleTeachers.indexOf(o)&&i.push({severity:5,message:"".concat(m.name," must not be in ").concat(r[o],"'s class.")})}if(l.length<n[0]){var y=n[0]-l.length;i.push({severity:8*y,message:"".concat(r[o],"'s class has ").concat(y," too few students.")})}else if(l.length>n[1]){var O=l.length-n[1];i.push({severity:10*O,message:"".concat(r[o],"'s class has ").concat(O," too many students.")})}}for(var k=s.map((function(e,n){return t.map((function(e){return e.map((function(e){return a[e].categories[n]})).reduce((function(e,t){return e+t}),0)}))})),C=0;C<s.length;C++){var w=Math.max.apply(Math,Object(_.a)(k[C]))-Math.min.apply(Math,Object(_.a)(k[C]));(w>1&&0!==C||w>3&&0===C)&&i.push({severity:w,message:"Imbalanced ".concat(s[C]," category: ").concat(k[C]," students per class respectively.")})}return i}function U(e,t){for(var a=function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e}(e.map((function(e,t){return t}))),n=[],s=0,r=Math.ceil(e.length/t),i=0;i<t;i++)n.push(a.slice(s,s+r)),s+=r;return n}var D=function(e){var t,a=!1,n=[],s="",r=Object(P.a)(e);try{for(r.s();!(t=r.n()).done;){var i=t.value;'"'!==i?a||","!==i?s+=i:(n.push(s.trim()),s=""):a=!a}}catch(o){r.e(o)}finally{r.f()}return n.push(s.trim()),n};function G(e){for(var t=parseInt(e[1].split(",")[5]),a=parseInt(e[1].split(",")[1]),n=parseInt(e[1].split(",")[2]),s=D(e[1]).slice(8).filter((function(e){return e.length>0})),r=["Female"].concat(Object(_.a)(D(e[4]).slice(10))),i=[],o=e.slice(5).map((function(e){return e.substring(0,e.indexOf(","))})),l=5;l<e.length;l++){var c=D(e[l]);i.push({name:c[0],categories:["F"===c[1]].concat(Object(_.a)(c.slice(10).map((function(e){return e.length>0})))),friends:c.slice(2,7).map((function(e){return o.indexOf(e)})).filter((function(e){return e>=0})),mustBeWith:0===c[8].length?[]:D(c[8]).map((function(e){return o.indexOf(e)})).filter((function(e){return e>=0})),cannotBeWith:0===c[7].length?[]:D(c[7]).map((function(e){return o.indexOf(e)})).filter((function(e){return e>=0})),possibleTeachers:"all"===c[9].toLowerCase()||"any"===c[9].toLowerCase()||""===c[9]?s.map((function(e,t){return t})):D(c[9]).map((function(e){return s.indexOf(e)})).filter((function(e){return e>=0}))})}return{numClasses:t,classSize:[a,n],teacherNames:s,categories:r,students:i,studentNames:o}}var Y=function(e){return 0===e.split("").filter((function(e){return","!==e})).length};function q(e,t){for(var a=[e.teacherNames],n=0;n<Math.max.apply(Math,Object(_.a)(e.lists.map((function(e){return e.length}))));n++){for(var s=[],r=0;r<e.lists.length;r++)n<e.lists[r].length?s.push(e.students[e.lists[r][n]].name):s.push("");a.push(s.map((function(e){return'"'.concat(e,'"')})))}return a.map(t).join("\n")}function X(e,t){var a=[];a.push(t(["","Min","Max"])),a.push(t(["Students per class",e.classSize[0],e.classSize[1],"","No. classes",e.teacherNames.length,"","Teachers"].concat(Object(_.a)(e.teacherNames)))),a.push(t([])),a.push(t(["Required","Optional","","","","","","","","Custom categories"])),a.push(t(["Name","Gender","Friend 1","Friend 2","Friend 3","Friend 4","Friend 5","Can't be with","Must be with","Possible teachers"].concat(Object(_.a)(e.categories))));for(var n=0;n<e.students.length;n++){for(var s=e.students[n],r=function(t){return e.students[t].name},i=s.friends.map(r);i.length<5;)i.push("");var o=s.cannotBeWith.map(r).join(", "),l=s.mustBeWith.map(r).join(", "),c=s.possibleTeachers.length===e.teacherNames.length?"ALL":s.possibleTeachers.map((function(t){return e.teacherNames[t]})).join(", "),u=s.categories.slice(1).map((function(e){return e?"YES":""}));a.push(t([s.name,s.categories[0]?"F":"M"].concat(Object(_.a)(i),[o,l,c],Object(_.a)(u))))}return a.join("\n")}function $(e,t){return t(["Issues:"])+"\n"+e.issues.map((function(e){return t([e.message])})).join("\n")}function H(e){var t=function(e){return function(t){for(var a=t.map((function(e){var t=e.toString();return-1===t.indexOf(",")||'"'===t[0]&&'"'===t[t.length-1]?t:'"'.concat(t,'"')})).join(","),n=0;n<e-t.length;n++)a+=",";return a}}(Math.max(e.teacherNames.length+8,e.categories.length+10)),a="\n"+t([]);return[q(e,t),X(e,t),$(e,t)].join(a+a+"\n")}var K=a(162),Q=a(163),Z=a(152),ee=a(153),te=a(154),ae=a(159),ne=a(150),se=a(151),re=a(155),ie=a(156),oe=a(160),le=a(157);function ce(e){var t,a=e.students.map((function(e){return e.name})),n=s.a.useState(JSON.parse(JSON.stringify(e.students[e.student_idx]))),r=Object(g.a)(n,2),i=r[0],l=r[1],c=s.a.useState(""),u=Object(g.a)(c,2),m=u[0],d=u[1],h=s.a.useState({friends:i.friends.map((function(e){return a[e]})).join(", "),mustBeWith:i.mustBeWith.map((function(e){return a[e]})).join(", "),cannotBeWith:i.cannotBeWith.map((function(t){return e.students[t].name})).join(", ")}),p=Object(g.a)(h,2),v=p[0],b=p[1],E=function(e){return function(t){return b(Object(o.a)(Object(o.a)({},v),{},Object(R.a)({},e,t.target.value)))}},S=s.a.useState(e.classIdx),y=Object(g.a)(S,2),O=y[0],k=y[1],C=function(t){for(var n={},s=!1,r=0,i=Object.entries(v);r<i.length;r++){var o=Object(g.a)(i[r],2),c=o[0],u=o[1];n[c]=""===u?[]:u.split(",").map((function(e){return a.indexOf(e.trim())}));var m=n[c].indexOf(-1);-1!==m&&(s=u.split(",")[m])}if(0===t.possibleTeachers.length)d("Cannot have zero possible teachers.");else if(!1!==s)d("Invalid name: '"+s+"'. Make sure spelling is exact and there is one comma between each name.");else{for(var h=0,f=Object.entries(n);h<f.length;h++){var p=Object(g.a)(f[h],2),b=p[0],E=p[1];t[b]=E}l(t),O!==e.classIdx&&t!==e.students[e.student_idx]&&e.updateStudentClassIdx(O),e.updateStudent(t)}},w=s.a.createElement(s.a.Fragment,null,s.a.createElement(K.a,{label:"Must be with (comma separated names)",variant:"filled",value:v.mustBeWith,onChange:E("mustBeWith"),fullWidth:!0}),s.a.createElement(K.a,{label:"Cannot be with (comma separated names)",variant:"filled",value:v.cannotBeWith,onChange:E("cannotBeWith"),fullWidth:!0}),s.a.createElement(K.a,{label:"Friends (comma separated names)",variant:"filled",value:v.friends,onChange:E("friends"),fullWidth:!0}));return s.a.createElement(Q.a,{open:!0,onClose:function(){},"aria-labelledby":"form-dialog-title"},s.a.createElement(Z.a,{id:"form-dialog-title"},"Editing ",i.name),s.a.createElement(ee.a,null,s.a.createElement(te.a,null,"To force a class change after lists are generated, you must edit a student's parameters.\xa0",0===m.length?null:s.a.createElement("span",{style:{color:"red"}},"Error: ",m)),s.a.createElement(K.a,{label:"Name",variant:"filled",value:i.name,onChange:(t="name",function(e){return l(Object(o.a)(Object(o.a)({},i),{},Object(R.a)({},t,e.target.value.trim())))}),fullWidth:!0}),s.a.createElement(ae.a,{native:!0,value:e.teachers[O],onChange:function(t){return k(e.teachers.indexOf(t.target.value))},fullWidth:!0},e.teachers.map((function(e,t){return s.a.createElement("option",{value:e,key:t},e)}))),s.a.createElement(ne.a,{component:"fieldset",style:{marginTop:"20px"}},s.a.createElement(se.a,{component:"legend"},"Categories"),s.a.createElement(re.a,null,i.categories.map((function(t,a){return s.a.createElement(ie.a,{control:s.a.createElement(oe.a,{checked:t,onChange:function(){i.categories[a]=!i.categories[a],l(Object(o.a)({},i))}}),label:e.categories[a],key:a})})))),s.a.createElement(ne.a,{component:"fieldset",style:{marginTop:"20px"}},s.a.createElement(se.a,{component:"legend"},"Possible teachers"),s.a.createElement(re.a,null,e.teachers.map((function(e,t){return s.a.createElement(ie.a,{control:s.a.createElement(oe.a,{checked:-1!==i.possibleTeachers.indexOf(t),onChange:function(){var e=i.possibleTeachers.indexOf(t);-1===e?i.possibleTeachers.push(t):i.possibleTeachers.splice(e,1),l(Object(o.a)({},i))}}),label:e,key:t})})))),w),s.a.createElement(le.a,null,s.a.createElement(f.a,{color:"primary",onClick:function(){return C(e.students[e.student_idx])}},"Cancel"),s.a.createElement(f.a,{onClick:function(){return C(i)},color:"primary"},"Update")))}function ue(e){return s.a.createElement(Q.a,{open:!0,onClose:function(){},"aria-labelledby":"form-dialog-title",fullWidth:!0,maxWidth:"md"},s.a.createElement(Z.a,{id:"form-dialog-title"},"Issues with current class list"),s.a.createElement(ee.a,null,s.a.createElement(M.a,{size:"small"},s.a.createElement(B.a,null,e.issues.map((function(e,t){return s.a.createElement(I.a,{key:t},s.a.createElement(F.a,null,e.message))}))))),s.a.createElement(le.a,null,s.a.createElement(f.a,{color:"primary",onClick:e.close},"Close")))}function me(e,t){var a=new Blob([t],{type:"text/csv"}),n=document.createElement("a");n.href=window.URL.createObjectURL(a),n.download=e,document.body.appendChild(n),n.click(),document.body.removeChild(n)}function de(e){return s.a.createElement(Q.a,{open:!0,onClose:function(){},"aria-labelledby":"form-dialog-title",fullWidth:!0,maxWidth:"md"},s.a.createElement(Z.a,{id:"form-dialog-title"},"Saved class lists"),s.a.createElement(ee.a,null,s.a.createElement(M.a,{size:"small"},s.a.createElement(B.a,null,e.saves.slice(0).reverse().map((function(t,a){return s.a.createElement(I.a,{key:a},s.a.createElement(F.a,null,s.a.createElement("strong",null,t.name)),s.a.createElement(F.a,null,new Date(t.time).toLocaleString()),s.a.createElement(F.a,null,s.a.createElement(f.a,{color:"secondary",variant:"contained",onClick:function(){return function(t){var a=H(e.saves[t].data),n=new Date(e.saves[t].time).toLocaleString();me("class_lists_"+e.saves[t].name+"_"+n+".csv",a)}(e.saves.length-1-a)}},"Export CSV")),s.a.createElement(F.a,null,s.a.createElement(f.a,{color:"secondary",variant:"contained",onClick:function(){return e.restore(t)}},"Restore")))}))))),s.a.createElement(le.a,null,s.a.createElement(f.a,{color:"primary",onClick:e.close},"Close")))}var he=a(77),fe=a.n(he),pe=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(l.a)(this,a),(e=t.call(this)).defaultState={teacherNames:[],lists:[],state:"view",editingStudent:-1,issues:[],viMod:!1,clMod:!1,saves:[],version:1},e.state=JSON.parse(JSON.stringify(e.defaultState)),e.workerInst=fe()(),e.workerInst.addEventListener("message",e.workerFinished.bind(Object(u.a)(e)));try{var n=localStorage.getItem("saves");if(null!==n){var s=JSON.parse(n);s[0].data.version===e.state.version&&(e.state=JSON.parse(JSON.stringify(s[s.length-1].data)),e.state.saves=s,e.state.state="view",e.state.viMod=e.state.clMod=!1,e.state.editingStudent=-1)}}catch(r){}return e}return Object(c.a)(a,[{key:"handleFileUpload",value:function(e){return new Promise((function(t,a){var n=new FileReader;n.onload=function(e){return t(e.target.result)},n.readAsText(e.target.files[0])}))}},{key:"exportCSV",value:function(e){me("class_lists.csv",H(this.state))}},{key:"dummyFileImport",value:function(){return new Promise((function(e,t){return fetch("./dummy.csv").then((function(a){200!==a.status?t(a.status):a.text().then(e)}))}))}},{key:"importCSV",value:function(e){var t=this;e.then((function(e){var a=function(e){for(var t,a=e.split(/[\r\n]+/);-1!==a.indexOf("");)a.splice(a.indexOf(""),1);if(","===a[0][0])(t=G(a)).lists=U(t.studentNames,t.numClasses);else{for(var n=0,s=[],r=0;r<a.length;r++)Y(a[r])?n++:n=0,2===n&&(n=0,s.push(r));(t=G(a.slice(s[0]+1,s[1]-1))).lists=function(e,t){for(var a=e.teacherNames.length,n=e.teacherNames.map((function(e){return[]})),s=1;s<t.length;s++)for(var r=t[s].split(",").slice(0,a).map((function(e){return e.substring(1,e.length-1)})),i=0;i<a;i++)n[i].push((o=r[i],e.studentNames.indexOf(o)));var o;return n}(t,a.slice(0,s[0]-1))}return t.issues=A(t),t}(e);t.setState(a,t.autosave)})).catch(console.log)}},{key:"toggleState",value:function(e){"working"===e&&"working"!==this.state.state?this.startWorking():this.stopWorking(),this.state.state!==e?this.setState({state:e}):this.setState({state:"import"})}},{key:"startWorking",value:function(){this.workerInst.runAlgorithm(this.state)}},{key:"stopWorking",value:function(){this.setState({state:"view"})}},{key:"workerFinished",value:function(e){"working"===this.state.state&&this.setState(Object(o.a)(Object(o.a)({},e.data),{},{state:"view"}),this.autosave)}},{key:"restart",value:function(){this.stopWorking();var e=this.state,t=U(e.studentNames,e.numClasses),a=A(Object(o.a)(Object(o.a)({},this.state),{},{lists:t}));this.setState({lists:t,issues:a,state:"view"},this.autosave)}},{key:"editStudent",value:function(e){this.setState({editingStudent:e})}},{key:"autosave",value:function(){var e=this.state,t=e.saves,a=e.lists,n=e.students,s=e.classSize,r=e.categories,i=e.teacherNames,o=e.issues,l=e.numClasses,c=e.studentNames,u=e.version;t.push({name:"",time:(new Date).getTime(),data:{lists:a,students:n,classSize:s,categories:r,teacherNames:i,issues:o,numClasses:l,studentNames:c,version:u}});for(var m=[],d=0;d<t.length;d++)""===t[d].name&&m.push(d);var h=m.slice(0,m.length-10);h.reverse();for(var f=0;f<h.length;f++)t.splice(h[f],1);this.setState({saves:t,state:"view",viMod:!1,clMod:!1,editingStudent:-1}),localStorage.setItem("saves",JSON.stringify(t))}},{key:"undo",value:function(e){if("number"!==typeof e&&(e=1),e>=this.state.saves.length&&(e=this.state.saves.length-1),!(this.state.saves.length-e<=0)){var t=this.state.saves,a=t[t.length-e-1].data,n=t.slice(0,t.length-e);this.setState(Object(o.a)(Object(o.a)({},a),{},{saves:n,state:"view",viMod:!1,clMod:!1,editingStudent:-1})),localStorage.setItem("saves",JSON.stringify(n))}}},{key:"restoreOldState",value:function(e){this.setState(e.data,this.autosave)}},{key:"save",value:function(){var e=this,t=prompt("Please enter the name of the save:"),a=this.state.saves;a[a.length-1].name=t,this.setState({saves:a},(function(){return localStorage.setItem("saves",JSON.stringify(e.state.saves))}))}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state.lists.map((function(t){return-1!==t.indexOf(e.state.editingStudent)})).indexOf(!0);return s.a.createElement(h.a,{className:t.root},this.state.teacherNames.length?s.a.createElement(J,{teachers:this.state.teacherNames,students:this.state.students,categories:this.state.categories,lists:this.state.lists,state:this.state.state,editStudent:this.editStudent.bind(this)}):s.a.createElement(h.a,{className:t.fallback},"Please \xa0",s.a.createElement(f.a,{component:"label",size:"large",color:"primary",variant:"contained"},"import",s.a.createElement("input",{type:"file",style:{display:"none"},onChange:function(t){return e.importCSV(e.handleFileUpload(t))}})),"\xa0 a spreadsheet\xa0",s.a.createElement("span",{style:{fontSize:"1rem"}},"(or\xa0",s.a.createElement("span",{onClick:function(){return e.importCSV(e.dummyFileImport())},style:{color:"blue",textDecoration:"underline",cursor:"pointer"}},"see a demo"),")")),s.a.createElement(j,{importCSV:function(t){return e.importCSV(e.handleFileUpload(t))},exportCSV:this.exportCSV.bind(this),openListManager:function(){return e.setState({clMod:!e.state.clMod})},toggleState:this.toggleState.bind(this),save:this.save.bind(this),undo:this.undo.bind(this),restart:this.restart.bind(this),state:this.state.state,showOptions:this.state.teacherNames.length>0,issues:this.state.issues,viewIssues:function(){return e.setState({viMod:!e.state.viMod})},reset:function(){"YES"===window.prompt("This action will delete ALL data. Type YES to confirm, or leave blank to cancel.","NO")&&(localStorage.clear(),e.setState(e.defaultState))}}),this.state.editingStudent<0?null:s.a.createElement(ce,{student_idx:this.state.editingStudent,teachers:this.state.teacherNames,students:this.state.students,categories:this.state.categories,updateStudent:function(t){var a=e.state.students;a[e.state.editingStudent]=t,e.setState({issues:A(Object(o.a)(Object(o.a)({},e.state),{},{students:a})),students:a,editingStudent:-1},e.autosave)},classIdx:a,updateStudentClassIdx:function(t){e.state.lists[a].splice(e.state.lists[a].indexOf(e.state.editingStudent),1),e.state.lists[t].push(e.state.editingStudent),e.setState({lists:e.state.lists},e.autosave)}}),this.state.viMod?s.a.createElement(ue,{issues:this.state.issues,close:function(){return e.setState({viMod:!e.state.viMod})}}):null,this.state.clMod?s.a.createElement(de,{saves:this.state.saves,close:function(){return e.setState({clMod:!e.state.clMod})},restore:this.restoreOldState.bind(this)}):null)}}]),a}(s.a.Component),ge=Object(p.a)((function(e){return{root:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"#EEE"},fallback:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center",fontFamily:"sans-serif",fontSize:"30px"}}}))(pe);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(ge,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},77:function(e,t,a){var n=a(104),s=["runAlgorithm"];e.exports=function(){var e=new Worker(a.p+"4e3212f62110c66d90a7.worker.js",{name:"[hash].worker.js"});return n(e,s),e}},94:function(e,t,a){e.exports=a(105)}},[[94,1,2]]]);
//# sourceMappingURL=main.0fd649d9.chunk.js.map