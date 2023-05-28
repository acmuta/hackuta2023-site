(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[846],{8683:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)){if(n.length){var a=i.apply(null,n);a&&e.push(a)}}else if("object"===o){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var l in n)r.call(n,l)&&n[l]&&e.push(l)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0!==(n=(function(){return i}).apply(t,[]))&&(e.exports=n)}()},68794:function(e,t,n){"use strict";n.r(t),n.d(t,{MarkDownRenderer:function(){return f}});var r=n(9268),i=n(20486),o=n(99254),a=n.n(o),l=n(32783),s=n.n(l),c=n(70006),u=n.n(c),d=n(42460),p=n.n(d);function f(e){let{children:t}=e;return(0,r.jsx)("div",{className:p().renderer,children:(0,r.jsx)(i.MN,{remarkPlugins:[u()],remarkToRehypeOptions:{allowDangerousHtml:!0},rehypePlugins:[a(),s()],children:t})})}},79495:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(9268),i=n(86006),o=n(49117),a=n(23272),l=n(85657),s=n(27322);let c=e=>{var t,n;let{text:a,description:l,id:c,name:u,...d}=e,[p,f]=(0,i.useState)(null!==(n=null!==(t=d.defaultChecked)&&void 0!==t?t:d.checked)&&void 0!==n&&n),x=()=>f(!p);return(0,r.jsxs)(o.x,{direction:"row",children:[(0,r.jsx)("input",{type:"checkbox",id:c,name:null!=u?u:c,"aria-labelledby":"".concat(c,"-title"),"aria-describedby":l&&"".concat(c,"-description"),checked:p,onChange:x,...d}),(0,r.jsx)(s._,{text:a,description:l,id:c})]})};var u=n(92391);let d=/^[a-z0-9-]+$/,p=u.ZP.enum(["blue","green","red","yellow","white"]);u.ZP.object({name:u.ZP.string().nonempty(),slug:u.ZP.string().regex(d),priority:u.ZP.number({description:"Lower number, higher priority."}),hidden:u.ZP.boolean().optional(),cardStyle:p.optional(),briefSource:u.ZP.string({description:"A brief over the post in MarkDown using doT template"}).optional(),contentSource:u.ZP.string({description:"The main content of the post in MarkDown using doT template"}).optional()});var f=n(11558),x=n(42693),_=n.n(x),h=n(68794);function y(e){let{description:t,formInputId:n,height:i,label:a,onSourceChange:s,source:c}=e;return(0,r.jsxs)(o.x,{direction:"row",gap:"1rem",style:{height:null!=i?i:"36rem",maxHeight:"100vh"},children:[(0,r.jsx)(l.oi,{text:a,description:t,id:n,isMultiline:!0,value:c,onChange:e=>null==s?void 0:s(e.target.value),spellCheck:!1,style:{flex:1,fontFamily:"monospace"},boxProps:{style:{flex:1}}}),(0,r.jsx)(m,{label:a,source:c})]})}function m(e){let{label:t,source:n}=e;return(0,r.jsxs)(o.x,{direction:"column",className:_().preview,children:[(0,r.jsxs)("span",{children:[t," Preview"]}),(0,r.jsx)("article",{children:n?(0,r.jsx)(h.MarkDownRenderer,{children:n}):void 0})]})}function b(e){let{name:t,readOnly:n,slug:a}=e,[s,c]=(0,i.useState)(a),[u,p]=(0,i.useState)(!1);return(0,r.jsxs)(o.x,{direction:"row",wrap:"wrap",gap:"1rem",children:[(0,r.jsx)(l.oi,{id:"name",text:"Name",description:"A human-readable name",defaultValue:t,onChange:e=>{if(u)return;let t=e.target.value;c(t.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,""))},readOnly:n,required:!0,minLength:1}),(0,r.jsx)(l.oi,{id:"slug",text:"URL Slug",description:"Must match ".concat(d.toString(),"."),value:s,onChange:e=>c(e.target.value),onKeyDown:()=>p(!0),readOnly:n,spellCheck:!1,required:!0,minLength:1,pattern:d.toString().slice(1,-1)})]})}function g(e){let{briefSource:t,contentSource:n,hidden:s,name:u,priority:d,slug:x,cardStyle:_}=e,h=!!x,[m,g]=(0,i.useState)(t),[w,j]=(0,i.useState)(n),v=()=>{h||setTimeout(()=>{g(""),j("")},1)},k=(0,f.ho)(p);return(0,r.jsxs)(o.x,{as:"form",direction:"column",action:"/admin/post/submit",method:"POST",gap:"1.5rem",onSubmit:v,children:[(0,r.jsxs)(o.x,{direction:"row",alignItems:"start",wrap:"wrap",gap:"1rem",children:[(0,r.jsx)(b,{name:u,slug:x,readOnly:h}),(0,r.jsx)(l.oi,{id:"priority",text:"Priority",description:"Lower number, higher priority.",defaultValue:null!=d?d:10,required:!0,pattern:"\\d+"}),(0,r.jsx)(c,{id:"hidden",text:"Hide the Post",defaultChecked:s})]}),(0,r.jsx)(o.x,{direction:"row",alignItems:"start",wrap:"wrap",gap:"1rem",children:(0,r.jsx)(l.Lt,{id:"cardStyle",text:"Card Style",description:"Change look of the Dashboard card",options:k,selectProps:{defaultValue:_?k.find(e=>e.value===_):void 0},isClearable:!0})}),(0,r.jsx)(y,{label:"Brief",formInputId:"brief",description:"(Optional) If provided, a card with the brief will be added to Dashboard. MarkDown with doT template is available.",source:m,onSourceChange:e=>g(e),height:"16rem"}),(0,r.jsx)(y,{label:"Content",formInputId:"content",description:"(Optional) If provided, a subpage with the content will be created. MarkDown with doT template is available.",source:w,onSourceChange:e=>j(e)}),(0,r.jsx)(o.x,{direction:"row",children:(0,r.jsx)(a.zx,{type:"submit",children:h?"Update":"Post"})})]})}},49117:function(e,t,n){"use strict";n.d(t,{x:function(){return s}});var r=n(9268),i=n(8683),o=n.n(i),a=n(84554),l=n.n(a);function s(e){let{as:t="div",display:n="flex",direction:i="row",justifyContent:a="normal",alignItems:s="stretch",wrap:c="nowrap",gap:u,className:d,style:p,children:f,...x}=e,_="flex"===n||"inline-flex"===n;return(0,r.jsx)(t,{className:o()(l()[n],{[l()["flex-".concat(i)]]:_,[l()["justify-".concat(a)]]:_,[l()["align-".concat(s)]]:_,[l()["flex-wrap-".concat(c)]]:_},d),style:{...p&&p,...u&&{gap:u}},...x,children:f})}},4527:function(e,t,n){"use strict";n.d(t,{C:function(){return s}});var r=n(9268),i=n(4106),o=n(20943),a=n(86006),l=n(23272);function s(e){let{selected:t=!1,text:n,...s}=e,c=(0,a.useId)();return(0,r.jsxs)(l.zx,{kind:t?"primary":"secondary",role:"checkbox","aria-checked":t,id:c,"aria-labelledby":c,...s,children:[t?(0,r.jsx)(i.Z,{"aria-hidden":!0}):(0,r.jsx)(o.Z,{"aria-hidden":!0}),n]})}},23272:function(e,t,n){"use strict";n.d(t,{zx:function(){return s}});var r=n(9268),i=n(8683),o=n.n(i);n(35846);var a=n(70310),l=n.n(a);function s(e){let{children:t,className:n,kind:i="primary",type:a="button",...s}=e;return(0,r.jsx)("button",{type:a,className:o()(l().button,l()[i],n),...s,children:t})}n(4527)},22964:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(9268),i=n(1842),o=n.n(i);function a(e){let{errors:t}=e;return(null==t?void 0:t.length)?(0,r.jsx)("span",{className:o().error,children:t.join("; ")}):null}},27322:function(e,t,n){"use strict";n.d(t,{_:function(){return s}});var r=n(9268),i=n(8683),o=n.n(i),a=n(86494),l=n.n(a);let s=e=>{let{text:t,description:n,className:i,id:a,...s}=e;return(0,r.jsxs)("label",{className:o()("label",l().label,i),htmlFor:a,"aria-labelledby":"".concat(a,"-title"),"aria-describedby":n&&"".concat(a,"-description"),...s,children:[(0,r.jsx)("span",{id:"".concat(a,"-title"),children:t}),n&&(0,r.jsx)("div",{id:"".concat(a,"-description"),children:n})]})}},85657:function(e,t,n){"use strict";n.d(t,{Lt:function(){return p},oi:function(){return f}});var r=n(9268),i=n(480),o=n(67546),a=n(73571),l=n(49117),s=n(22964),c=n(27322),u=n(1842),d=n.n(u);let p=e=>{let{selectProps:t,options:n,text:u,description:p,id:f,isClearable:x,isCreatable:_,isMulti:h,errors:y}=e,m=_?a.Z:i.ZP;return(0,r.jsxs)(l.x,{direction:"column",gap:".125rem",children:[(0,r.jsx)(c._,{text:u,description:p,id:f}),(0,r.jsx)(m,{id:f,name:f,options:n,classNames:{control:e=>e.isFocused?d().focused:d().select},filterOption:(0,o.c)({ignoreAccents:!1}),isClearable:x,isMulti:h,"aria-labelledby":"".concat(f,"-title"),"aria-describedby":p&&"".concat(f,"-description"),...t}),(0,r.jsx)(s.Z,{errors:y})]})},f=e=>{let{errors:t,text:n,placeholder:i,name:o,id:a,isMultiline:u,description:p,style:f,boxProps:x,..._}=e;return(0,r.jsxs)(l.x,{direction:"column",gap:".125rem",...x,children:[(0,r.jsx)(c._,{text:n,description:p,id:a}),(0,r.jsx)(u?"textarea":"input",{id:a,name:null!=o?o:a,"aria-labelledby":"".concat(a,"-title"),"aria-describedby":p&&"".concat(a,"-description"),placeholder:i,className:d().input,style:f,defaultValue:_.defaultValue,maxLength:_.maxLength,minLength:_.minLength,onChange:_.onChange,onKeyDown:_.onKeyDown,onKeyUp:_.onKeyUp,pattern:_.pattern,readOnly:_.readOnly,required:_.required,spellCheck:_.spellCheck,value:_.value}),(0,r.jsx)(s.Z,{errors:t})]})}},11558:function(e,t,n){"use strict";function r(e,t){return Array(t-e).fill(void 0).map((t,n)=>n+e)}function i(e){return e instanceof Error?e.message:JSON.stringify(e)}function o(e){return[...new Set(e)]}n.d(t,{D8:function(){return o},Er:function(){return a},SD:function(){return s},ho:function(){return l},n:function(){return i},w6:function(){return r}});let a=e=>({label:e.toString(),value:e.toString()}),l=e=>Object.values(e.Values).map(a);async function s(e,t){let n=await (await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:t})).json();if("success"===n.status)window.location.reload();else throw Error(i(n))}},42693:function(e){e.exports={preview:"MarkDownEditor_preview__EGGCR"}},42460:function(e){e.exports={renderer:"MarkDownRenderer_renderer__WITMu"}},84554:function(e){e.exports={block:"Box_block__da5fs",inline:"Box_inline__wCYvk","inline-block":"Box_inline-block__Yrkhv",flex:"Box_flex__JhI0U","inline-flex":"Box_inline-flex__dtW6n","flex-row":"Box_flex-row__fG85B","flex-column":"Box_flex-column__jT9Rc","flex-row-reverse":"Box_flex-row-reverse__6S__G","flex-column-reverse":"Box_flex-column-reverse__hgrzb","justify-start":"Box_justify-start__cdy3Q","justify-end":"Box_justify-end__4fCiM","justify-center":"Box_justify-center__1AObA","justify-normal":"Box_justify-normal__WebY6","justify-space-between":"Box_justify-space-between__iDICW","justify-space-around":"Box_justify-space-around__a5Tn7","justify-space-evenly":"Box_justify-space-evenly__rQV3Z","align-start":"Box_align-start__QPKwC","align-end":"Box_align-end__mb1LD","align-center":"Box_align-center__NeAro","align-baseline":"Box_align-baseline__xTt1B","align-stretch":"Box_align-stretch__WOwGu","flex-wrap-nowrap":"Box_flex-wrap-nowrap__4azi5","flex-wrap-wrap":"Box_flex-wrap-wrap__i6jz5","flex-wrap-wrap-reverse":"Box_flex-wrap-wrap-reverse__BysSU"}},70310:function(e){e.exports={button:"Button_button__L2wUb",primary:"Button_primary__wnomA",secondary:"Button_secondary__HrEDu"}},86494:function(e){e.exports={label:"Label_label__6Gkv_"}},1842:function(e){e.exports={input:"styles_input__ljDlc",select:"styles_select__r3L6d",specificity:"styles_specificity__QV95Y",focused:"styles_focused__4YkqM",error:"styles_error__OVXcS"}},83177:function(e,t,n){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var r=n(86006),i=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,l=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,n){var r,o={},c=null,u=null;for(r in void 0!==n&&(c=""+n),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)a.call(t,r)&&!s.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===o[r]&&(o[r]=t[r]);return{$$typeof:i,type:e,key:c,ref:u,props:o,_owner:l.current}}t.Fragment=o,t.jsx=c,t.jsxs=c},9268:function(e,t,n){"use strict";e.exports=n(83177)},35846:function(e,t,n){e.exports=n(93619)},99329:function(e,t,n){"use strict";n.d(t,{s:function(){return r}});var r=n(86006).createContext({})}}]);