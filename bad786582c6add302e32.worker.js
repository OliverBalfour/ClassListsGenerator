!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/ClassListsGenerator/",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function o(e,t){if(e){if("string"===typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}function a(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||o(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=o(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,s=!0,i=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return s=e.done,e},e:function(e){i=!0,a=e},f:function(){try{s||null==r.return||r.return()}finally{if(i)throw a}}}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e){for(var t=e.lists,n=e.students,r=e.classSize,o=d(e),a=0;a<1e3;a++){for(var s=p(t),i=a/1e3,c=0;c<Math.ceil(3*i);c++)s=l(s,n,r);var f=d(u(u({},e),{},{lists:s}));f<d(u(u({},e),{},{lists:t}))&&(t=s,o=f)}return{lists:t,issues:v(u(u({},e),{},{lists:t})),cost:o}}function l(e,t,n){if(e=p(e),y(0,2)<1){var r=y(0,t.length),o=y(0,t.length-1);o===r&&(o=t.length-1);var a=m(e,r),i=m(e,o);e[a][e[a].indexOf(r)]=o,e[i][e[i].indexOf(o)]=r}else{var c=y(0,t.length),u=y(0,e.length-1),f=m(e,c);u===f&&(u=e.length-1),e[f].splice(e[f].indexOf(c),1),e[u].push(c)}var l,d={},v=s(e);try{for(v.s();!(l=v.n()).done;){var h,b=s(l.value);try{for(b.s();!(h=b.n()).done;){var g=h.value;d[g]?console.error("Duplicated student"):d[g]=!0}}catch(O){b.e(O)}finally{b.f()}}}catch(O){v.e(O)}finally{v.f()}return e}n.r(t),n.d(t,"runAlgorithm",(function(){return h}));var y=function(e,t){return Math.floor(Math.random()*(t-e)+e)},p=function(e){return JSON.parse(JSON.stringify(e))};function d(e){return v(e).map((function(e){return e.severity})).reduce((function(e,t){return e+t}),0)}var m=function(e,t){return e.map((function(e){return-1!==e.indexOf(t)})).indexOf(!0)};function v(e){for(var t=e.lists,n=e.students,r=e.classSize,o=e.categories,i=e.teacherNames,c=[],u=0;u<t.length;u++){for(var f=t[u],l=0;l<f.length;l++){var y,p=n[f[l]],d=s(p.mustBeWith);try{for(d.s();!(y=d.n()).done;){var m=y.value;-1===f.indexOf(m)&&c.push({severity:3,message:"".concat(p.name," must be with ").concat(n[m].name,".")})}}catch(C){d.e(C)}finally{d.f()}var v,h=s(p.cannotBeWith);try{for(h.s();!(v=h.n()).done;){var b=v.value;-1!==f.indexOf(b)&&c.push({severity:5,message:"".concat(p.name," cannot be with ").concat(n[b].name,".")})}}catch(C){h.e(C)}finally{h.f()}var g,O=0,j=s(p.friends);try{for(j.s();!(g=j.n()).done;){var P=g.value;-1!==f.indexOf(P)&&O++}}catch(C){j.e(C)}finally{j.f()}O<1&&p.friends.length>0&&c.push({severity:3,message:"".concat(p.name," is not with any friends.")}),-1===p.possibleTeachers.indexOf(u)&&c.push({severity:5,message:"".concat(p.name," must not be in ").concat(i[u],"'s class.")})}if(f.length<r[0]){var S=r[0]-f.length;c.push({severity:8*S,message:"".concat(i[u],"'s class has ").concat(S," too few students.")})}else if(f.length>r[1]){var w=f.length-r[1];c.push({severity:10*w,message:"".concat(i[u],"'s class has ").concat(w," too many students.")})}}for(var x=o.map((function(e,r){return t.map((function(e){return e.map((function(e){return n[e].categories[r]})).reduce((function(e,t){return e+t}),0)}))})),M=0;M<o.length;M++){var A=Math.max.apply(Math,a(x[M]))-Math.min.apply(Math,a(x[M]));(A>1&&0!==M||A>3&&0===M)&&c.push({severity:A,message:"Imbalanced ".concat(o[M]," category: ").concat(x[M]," students per class respectively.")})}return c}var h=function(e){for(var t={lists:e.lists,issues:e.issues,cost:e.issues.map((function(e){return e.severity})).reduce((function(e,t){return e+t}),0)},n=0;n<20;n++){var r=f(e);r.cost<t.cost&&(t=r)}postMessage(t)};addEventListener("message",(function(e){var n,r=e.data,o=r.type,a=r.method,s=r.id,i=r.params;"RPC"===o&&a&&((n=t[a])?Promise.resolve().then((function(){return n.apply(t,i)})):Promise.reject("No such method")).then((function(e){postMessage({type:"RPC",id:s,result:e})})).catch((function(e){var t={message:e};e.stack&&(t.message=e.message,t.stack=e.stack,t.name=e.name),postMessage({type:"RPC",id:s,error:t})}))})),postMessage({type:"RPC",method:"ready"})}]);
//# sourceMappingURL=bad786582c6add302e32.worker.js.map