(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[805],{1053:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return s}});var r=i(9268),t=i(86006),d=i(5949),l=i.n(d);function s(e){var n,i,d,s;let{hasBasicWritePerm:c,hasDemographicsReadPerm:o,user:h}=e,[u,a]=(0,t.useState)(),j=async e=>{h.applicationStatus=e,console.log(JSON.stringify(h));let n=await (await fetch("/api/admin/user",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(h)})).json();if("success"!==n.status)throw n;a(e)},x=h.application,p=!!x&&x.age>=18;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("table",{children:(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"name"})," ",(0,r.jsx)("td",{children:(null==x?void 0:x.firstName)+" "+(null==x?void 0:x.lastName)})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"age"})," ",(0,r.jsx)("td",{children:null==x?void 0:x.age})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"phone number"})," ",(0,r.jsx)("td",{children:null==x?void 0:x.phoneNumber})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"school"})," ",(0,r.jsx)("td",{children:null==x?void 0:x.school})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"level of study"})," ",(0,r.jsx)("td",{children:null==x?void 0:x.levelOfStudy})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"country of residence"})," ",(0,r.jsx)("td",{children:null==x?void 0:x.countryOfResidence})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"t-shirt size"})," ",(0,r.jsx)("td",{children:null==x?void 0:x.tShirtSize})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:"dietary restriction"})," ",(0,r.jsx)("td",{children:null==x?void 0:null===(n=x.dietaryRestriction)||void 0===n?void 0:n.join(",")})]}),(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:2,children:o?(0,r.jsxs)("details",{children:[(0,r.jsx)("summary",{children:"Demographics Information"}),(0,r.jsxs)("h4",{children:[" ","under represented group:"," ",null==x?void 0:x.underrepresentedGroup]}),(0,r.jsxs)("h4",{children:[" gender: ",null==x?void 0:x.gender]}),(0,r.jsxs)("h4",{children:[" pronouns: ",null==x?void 0:null===(i=x.pronouns)||void 0===i?void 0:i.join(",")]}),(0,r.jsxs)("h4",{children:[" ","race/ethnicity: ",null==x?void 0:null===(d=x.raceEthnicity)||void 0===d?void 0:d.join(",")]}),(0,r.jsxs)("h4",{children:[" sexuality: ",null==x?void 0:x.sexuality]}),(0,r.jsxs)("h4",{children:[" ","highest level of eductation:"," ",null==x?void 0:x.highestLevelOfEducation]}),(0,r.jsxs)("h4",{children:[" ","field of study ",null==x?void 0:null===(s=x.fieldOfStudy)||void 0===s?void 0:s.join(",")]})]}):void 0})}),(0,r.jsx)("tr",{children:(0,r.jsxs)("td",{colSpan:2,children:[u?(0,r.jsx)("div",{className:l()[u],children:u}):(0,r.jsx)("div",{children:"undecided"}),c?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{onClick:()=>j("accepted"),disabled:!p,children:"Accept"}),(0,r.jsx)("button",{onClick:()=>j("rejected"),children:"Reject"})]}):void 0]})})]})}),(0,r.jsx)("hr",{})]})}},19479:function(e,n,i){Promise.resolve().then(i.bind(i,1053))},5949:function(e){e.exports={accepted:"ApplicantTable_accepted__OchVT",rejected:"ApplicantTable_rejected__4UQFQ"}},83177:function(e,n,i){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=i(86006),t=Symbol.for("react.element"),d=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function o(e,n,i){var r,d={},o=null,h=null;for(r in void 0!==i&&(o=""+i),void 0!==n.key&&(o=""+n.key),void 0!==n.ref&&(h=n.ref),n)l.call(n,r)&&!c.hasOwnProperty(r)&&(d[r]=n[r]);if(e&&e.defaultProps)for(r in n=e.defaultProps)void 0===d[r]&&(d[r]=n[r]);return{$$typeof:t,type:e,key:o,ref:h,props:d,_owner:s.current}}n.Fragment=d,n.jsx=o,n.jsxs=o},9268:function(e,n,i){"use strict";e.exports=i(83177)}},function(e){e.O(0,[667,961,744],function(){return e(e.s=19479)}),_N_E=e.O()}]);