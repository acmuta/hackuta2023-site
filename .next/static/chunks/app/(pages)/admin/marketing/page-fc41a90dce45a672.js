(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[282],{12752:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var i=n(9268),r=n(86006),a=n(49117),s=n(23272),o=n(85657),l=n(40031),c=n(92391);let u=c.ZP.object({recipients:c.ZP.array(c.ZP.string()),tag:c.ZP.string().nonempty(),subject:c.ZP.string().nonempty(),text:c.ZP.string(),html:c.ZP.string()}),d={"All Users":{},"Application - Applied":{application:{$exists:!0}},"Application - Applied and Received no Decision":{application:{$exists:!0},applicationStatus:{$exists:!1}},"Application - Accepted":{applicationStatus:"accepted"},"Application - Rejected":{applicationStatus:"rejected"},"Application - Waitlisted":{applicationStatus:"waitlisted"}};var p=n(88393),f=n.n(p);function _(e){let{allEmails:t}=e,[n,c]=(0,r.useState)([]),[p,_]=(0,r.useState)(""),[x,m]=(0,r.useState)(""),[h,y]=(0,r.useState)(""),[b,g]=(0,r.useState)(""),j=async e=>{try{e.preventDefault();let t=u.parse({recipients:n.map(e=>e.value),subject:p,tag:x,text:h,html:b}),i=confirm("Confirm to send? This might take a while if there are many recipients.");if(!i){alert("Action cancelled!");return}await (0,l.SD)("/admin/marketing/send",JSON.stringify(t))}catch(e){console.error(e),alert(e)}};return(0,i.jsxs)(a.x,{as:"form",direction:"column",gap:".75rem",method:"post",onSubmit:j,children:[(0,i.jsx)(o.Lt,{id:"recipients",text:"Recipients",options:[...Object.entries(d).map(e=>{let[t,n]=e;return{label:"Filter: ".concat(t),value:JSON.stringify(n)}}),...t.map(e=>({label:e,value:e}))],selectProps:{required:!0,value:n,onChange:e=>c(e)},isMulti:!0}),(0,i.jsx)(o.oi,{id:"tag",text:"Email Tag",description:"An arbitrary string that tags a batch of emails as part of the same campaign. When using filter-based recipients, users who've already received emails with the same tag as the current email will not receive the email again.",required:!0,minLength:1,value:x,onChange:e=>m(e.target.value)}),(0,i.jsx)(o.oi,{id:"subject",text:"Subject",required:!0,minLength:1,value:p,onChange:e=>_(e.target.value)}),(0,i.jsxs)(a.x,{direction:"row",gap:"2rem",style:{maxWidth:"100%"},children:[(0,i.jsx)(o.oi,{id:"text",text:"Body (plain text)",isMultiline:!0,style:{minHeight:"15rem"},boxProps:{style:{width:"100%"}},value:h,onChange:e=>y(e.target.value)}),(0,i.jsx)(o.oi,{id:"html",text:"Body (HTML)",isMultiline:!0,style:{minHeight:"15rem",fontFamily:"monospace"},boxProps:{style:{width:"100%"}},value:b,onChange:e=>g(e.target.value)})]}),(0,i.jsx)(s.zx,{className:f().submitButton,type:"submit",children:"Send"})]})}},49117:function(e,t,n){"use strict";n.d(t,{x:function(){return l}});var i=n(9268),r=n(8683),a=n.n(r),s=n(84554),o=n.n(s);function l(e){let{as:t="div",display:n="flex",direction:r="row",justifyContent:s="normal",alignItems:l="stretch",wrap:c="nowrap",gap:u,className:d,style:p,children:f,..._}=e,x="flex"===n||"inline-flex"===n;return(0,i.jsx)(t,{className:a()(o()[n],{[o()["flex-".concat(r)]]:x,[o()["justify-".concat(s)]]:x,[o()["align-".concat(l)]]:x,[o()["flex-wrap-".concat(c)]]:x},d),style:{...p&&p,...u&&{gap:u}},..._,children:f})}},4527:function(e,t,n){"use strict";n.d(t,{C:function(){return l}});var i=n(9268),r=n(4106),a=n(20943),s=n(86006),o=n(23272);function l(e){let{selected:t=!1,text:n,...l}=e,c=(0,s.useId)();return(0,i.jsxs)(o.zx,{kind:t?"primary":"secondary",role:"checkbox","aria-checked":t,id:c,"aria-labelledby":c,...l,children:[t?(0,i.jsx)(r.Z,{"aria-hidden":!0}):(0,i.jsx)(a.Z,{"aria-hidden":!0}),n]})}},23272:function(e,t,n){"use strict";n.d(t,{zx:function(){return l}});var i=n(9268),r=n(8683),a=n.n(r);n(35846);var s=n(70310),o=n.n(s);function l(e){let{children:t,className:n,kind:r="primary",type:s="button",...l}=e;return(0,i.jsx)("button",{type:s,className:a()(o().button,o()[r],n),...l,children:t})}n(4527)},22964:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var i=n(9268),r=n(1842),a=n.n(r);function s(e){let{errors:t}=e;return(null==t?void 0:t.length)?(0,i.jsx)("span",{className:a().error,children:t.join("; ")}):null}},27322:function(e,t,n){"use strict";n.d(t,{_:function(){return l}});var i=n(9268),r=n(8683),a=n.n(r),s=n(86494),o=n.n(s);let l=e=>{let{text:t,description:n,className:r,id:s,...l}=e;return(0,i.jsxs)("label",{className:a()("label",o().label,r),htmlFor:s,"aria-labelledby":"".concat(s,"-title"),"aria-describedby":n&&"".concat(s,"-description"),...l,children:[(0,i.jsx)("span",{id:"".concat(s,"-title"),children:t}),n&&(0,i.jsx)("div",{id:"".concat(s,"-description"),children:n})]})}},85657:function(e,t,n){"use strict";n.d(t,{Lt:function(){return p},oi:function(){return f}});var i=n(9268),r=n(480),a=n(67546),s=n(73571),o=n(49117),l=n(22964),c=n(27322),u=n(1842),d=n.n(u);let p=e=>{let{selectProps:t,options:n,text:u,description:p,id:f,isClearable:_,isCreatable:x,isMulti:m,errors:h}=e,y=x?s.Z:r.ZP;return(0,i.jsxs)(o.x,{direction:"column",gap:".125rem",children:[(0,i.jsx)(c._,{text:u,description:p,id:f}),(0,i.jsx)(y,{id:f,name:f,options:n,classNames:{control:e=>e.isFocused?d().focused:d().select},filterOption:(0,a.c)({ignoreAccents:!1}),isClearable:_,isMulti:m,"aria-labelledby":"".concat(f,"-title"),"aria-describedby":p&&"".concat(f,"-description"),...t}),(0,i.jsx)(l.Z,{errors:h})]})},f=e=>{let{errors:t,text:n,placeholder:r,name:a,id:s,isMultiline:u,description:p,style:f,boxProps:_,...x}=e;return(0,i.jsxs)(o.x,{direction:"column",gap:".125rem",..._,children:[(0,i.jsx)(c._,{text:n,description:p,id:s}),(0,i.jsx)(u?"textarea":"input",{id:s,name:null!=a?a:s,"aria-labelledby":"".concat(s,"-title"),"aria-describedby":p&&"".concat(s,"-description"),placeholder:r,className:d().input,style:f,defaultValue:x.defaultValue,maxLength:x.maxLength,minLength:x.minLength,onChange:x.onChange,onKeyDown:x.onKeyDown,onKeyUp:x.onKeyUp,pattern:x.pattern,readOnly:x.readOnly,required:x.required,spellCheck:x.spellCheck,value:x.value}),(0,i.jsx)(l.Z,{errors:t})]})}},40031:function(e,t,n){"use strict";n.d(t,{D8:function(){return r.D8},SD:function(){return r.SD},SG:function(){return a},hT:function(){return s},n:function(){return r.n},w6:function(){return r.w6}});var i=n(730),r=n(11558);let a=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return fetch(...t).then(e=>e.json())};function s(){let{data:e,error:t,isLoading:n}=(0,i.ZP)("/api/auth/enhanced-session",a);return{user:null==e?void 0:e.user,perms:null==e?void 0:e.perms,isError:!!t,isLoading:n}}},11558:function(e,t,n){"use strict";function i(e,t){return Array(t-e).fill(void 0).map((t,n)=>n+e)}function r(e){return e instanceof Error?e.message:JSON.stringify(e)}function a(e){return[...new Set(e)]}n.d(t,{D8:function(){return a},Er:function(){return s},SD:function(){return l},ho:function(){return o},n:function(){return r},w6:function(){return i}});let s=e=>({label:e.toString(),value:e.toString()}),o=e=>Object.values(e.Values).map(s);async function l(e,t){let n=await (await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:t})).json();if("success"===n.status)window.location.reload();else throw Error(r(n))}},77077:function(e,t,n){Promise.resolve().then(n.t.bind(n,84554,23)),Promise.resolve().then(n.bind(n,12752))},88393:function(e){e.exports={submitButton:"Marketing_submitButton__3_OUZ"}},84554:function(e){e.exports={block:"Box_block__da5fs",inline:"Box_inline__wCYvk","inline-block":"Box_inline-block__Yrkhv",flex:"Box_flex__JhI0U","inline-flex":"Box_inline-flex__dtW6n","flex-row":"Box_flex-row__fG85B","flex-column":"Box_flex-column__jT9Rc","flex-row-reverse":"Box_flex-row-reverse__6S__G","flex-column-reverse":"Box_flex-column-reverse__hgrzb","justify-start":"Box_justify-start__cdy3Q","justify-end":"Box_justify-end__4fCiM","justify-center":"Box_justify-center__1AObA","justify-normal":"Box_justify-normal__WebY6","justify-space-between":"Box_justify-space-between__iDICW","justify-space-around":"Box_justify-space-around__a5Tn7","justify-space-evenly":"Box_justify-space-evenly__rQV3Z","align-start":"Box_align-start__QPKwC","align-end":"Box_align-end__mb1LD","align-center":"Box_align-center__NeAro","align-baseline":"Box_align-baseline__xTt1B","align-stretch":"Box_align-stretch__WOwGu","flex-wrap-nowrap":"Box_flex-wrap-nowrap__4azi5","flex-wrap-wrap":"Box_flex-wrap-wrap__i6jz5","flex-wrap-wrap-reverse":"Box_flex-wrap-wrap-reverse__BysSU"}},70310:function(e){e.exports={button:"Button_button__L2wUb",primary:"Button_primary__wnomA",secondary:"Button_secondary__HrEDu"}},86494:function(e){e.exports={label:"Label_label__6Gkv_"}},1842:function(e){e.exports={input:"styles_input__ljDlc",select:"styles_select__r3L6d",specificity:"styles_specificity__QV95Y",focused:"styles_focused__4YkqM",error:"styles_error__OVXcS"}}},function(e){e.O(0,[619,984,347,50,667,961,744],function(){return e(e.s=77077)}),_N_E=e.O()}]);