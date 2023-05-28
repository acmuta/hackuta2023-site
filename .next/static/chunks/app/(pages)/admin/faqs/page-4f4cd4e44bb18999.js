(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[717],{84162:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return x}});var r=t(9268),i=t(86006);let o=/[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u;class s extends Error{details;name;constructor(e,n=[]){super(e),this.details=n,this.name="ZodValidationError"}toString(){return this.message}}var a=t(49117),u=t(23272),c=t(92391);let l=c.ZP.object({startTime:c.ZP.string().datetime(),durationMins:c.ZP.number().positive().int(),title:c.ZP.string(),shortDesc:c.ZP.string(),longDesc:c.ZP.string(),categories:c.ZP.string().array()}),f=c.ZP.object({q:c.ZP.string().nonempty(),a:c.ZP.string().nonempty()});var _=t(40031);let d={event:l,faq:f};function x(e){let{text:n,postUrl:t,schema:c}=e,[l,f]=(0,i.useState)(n),[x,p]=(0,i.useState)(),h=async()=>{try{let e=g();e&&await (0,_.SD)(t,l)}catch(e){p((0,_.n)(e))}},g=()=>{try{let e=JSON.parse(l);f(JSON.stringify(e,void 0,4));let n=d[c].array().safeParse(e);if(n.success)return p(void 0),!0;p(function(e,n={}){let{maxIssuesInMessage:t=99,issueSeparator:r="; ",unionSeparator:i=", or ",prefixSeparator:a=": ",prefix:u="Validation error"}=n,c=e.errors.slice(0,t).map(e=>(function e(n,t,r){if("invalid_union"===n.code)return n.unionErrors.reduce((n,i)=>{let o=i.issues.map(n=>e(n,t,r)).join(t);return n.includes(o)||n.push(o),n},[]).join(r);if(0!==n.path.length){var i;if(1===n.path.length){let e=n.path[0];if("number"==typeof e)return`${n.message} at index ${e}`}return`${n.message} at "${1===(i=n.path).length?i[0].toString():i.reduce((e,n)=>{if("number"==typeof n)return e+"["+n.toString()+"]";if(n.includes('"'))return e+'["'+n.replace(/"/g,'\\"')+'"]';if(!o.test(n))return e+'["'+n+'"]';let t=0===e.length?"":".";return e+t+n},"")}"`}return n.message})(e,r,i)).join(r),l=c?[u,c].join(a):u;return new s(l,e.errors)}(n.error).message)}catch(e){p((0,_.n)(e))}return!1};return(0,r.jsxs)(a.x,{direction:"column",gap:"1rem",children:[x,(0,r.jsx)("textarea",{id:"json",rows:16,cols:80,value:l,onChange:e=>f(e.target.value)}),(0,r.jsxs)(a.x,{direction:"row",gap:"1rem",children:[(0,r.jsx)(u.zx,{onClick:h,children:"Save"}),(0,r.jsx)(u.zx,{kind:"secondary",onClick:g,children:"Validate"})]})]})}},49117:function(e,n,t){"use strict";t.d(n,{x:function(){return u}});var r=t(9268),i=t(8683),o=t.n(i),s=t(84554),a=t.n(s);function u(e){let{as:n="div",display:t="flex",direction:i="row",justifyContent:s="normal",alignItems:u="stretch",wrap:c="nowrap",gap:l,className:f,style:_,children:d,...x}=e,p="flex"===t||"inline-flex"===t;return(0,r.jsx)(n,{className:o()(a()[t],{[a()["flex-".concat(i)]]:p,[a()["justify-".concat(s)]]:p,[a()["align-".concat(u)]]:p,[a()["flex-wrap-".concat(c)]]:p},f),style:{..._&&_,...l&&{gap:l}},...x,children:d})}},4527:function(e,n,t){"use strict";t.d(n,{C:function(){return u}});var r=t(9268),i=t(4106),o=t(20943),s=t(86006),a=t(23272);function u(e){let{selected:n=!1,text:t,...u}=e,c=(0,s.useId)();return(0,r.jsxs)(a.zx,{kind:n?"primary":"secondary",role:"checkbox","aria-checked":n,id:c,"aria-labelledby":c,...u,children:[n?(0,r.jsx)(i.Z,{"aria-hidden":!0}):(0,r.jsx)(o.Z,{"aria-hidden":!0}),t]})}},23272:function(e,n,t){"use strict";t.d(n,{zx:function(){return u}});var r=t(9268),i=t(8683),o=t.n(i);t(35846);var s=t(70310),a=t.n(s);function u(e){let{children:n,className:t,kind:i="primary",type:s="button",...u}=e;return(0,r.jsx)("button",{type:s,className:o()(a().button,a()[i],t),...u,children:n})}t(4527)},40031:function(e,n,t){"use strict";t.d(n,{D8:function(){return i.D8},SD:function(){return i.SD},SG:function(){return o},hT:function(){return s},n:function(){return i.n},w6:function(){return i.w6}});var r=t(730),i=t(11558);let o=function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return fetch(...n).then(e=>e.json())};function s(){let{data:e,error:n,isLoading:t}=(0,r.ZP)("/api/auth/enhanced-session",o);return{user:null==e?void 0:e.user,perms:null==e?void 0:e.perms,isError:!!n,isLoading:t}}},11558:function(e,n,t){"use strict";function r(e,n){return Array(n-e).fill(void 0).map((n,t)=>t+e)}function i(e){return e instanceof Error?e.message:JSON.stringify(e)}function o(e){return[...new Set(e)]}t.d(n,{D8:function(){return o},Er:function(){return s},SD:function(){return u},ho:function(){return a},n:function(){return i},w6:function(){return r}});let s=e=>({label:e.toString(),value:e.toString()}),a=e=>Object.values(e.Values).map(s);async function u(e,n){let t=await (await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:n})).json();if("success"===t.status)window.location.reload();else throw Error(i(t))}},51336:function(e,n,t){Promise.resolve().then(t.t.bind(t,84554,23)),Promise.resolve().then(t.t.bind(t,46957,23)),Promise.resolve().then(t.t.bind(t,23645,23)),Promise.resolve().then(t.t.bind(t,67201,23)),Promise.resolve().then(t.bind(t,84162))},46957:function(e){e.exports={pageSection:"PageSection_pageSection__zkKAe"}},67201:function(e){e.exports={accordion:"Accordion_accordion__SagxK",child:"Accordion_child__Z5vxT"}},84554:function(e){e.exports={block:"Box_block__da5fs",inline:"Box_inline__wCYvk","inline-block":"Box_inline-block__Yrkhv",flex:"Box_flex__JhI0U","inline-flex":"Box_inline-flex__dtW6n","flex-row":"Box_flex-row__fG85B","flex-column":"Box_flex-column__jT9Rc","flex-row-reverse":"Box_flex-row-reverse__6S__G","flex-column-reverse":"Box_flex-column-reverse__hgrzb","justify-start":"Box_justify-start__cdy3Q","justify-end":"Box_justify-end__4fCiM","justify-center":"Box_justify-center__1AObA","justify-normal":"Box_justify-normal__WebY6","justify-space-between":"Box_justify-space-between__iDICW","justify-space-around":"Box_justify-space-around__a5Tn7","justify-space-evenly":"Box_justify-space-evenly__rQV3Z","align-start":"Box_align-start__QPKwC","align-end":"Box_align-end__mb1LD","align-center":"Box_align-center__NeAro","align-baseline":"Box_align-baseline__xTt1B","align-stretch":"Box_align-stretch__WOwGu","flex-wrap-nowrap":"Box_flex-wrap-nowrap__4azi5","flex-wrap-wrap":"Box_flex-wrap-wrap__i6jz5","flex-wrap-wrap-reverse":"Box_flex-wrap-wrap-reverse__BysSU"}},70310:function(e){e.exports={button:"Button_button__L2wUb",primary:"Button_primary__wnomA",secondary:"Button_secondary__HrEDu"}},23645:function(e){e.exports={heading:"Heading_heading__209rB"}}},function(e){e.O(0,[619,984,347,667,961,744],function(){return e(e.s=51336)}),_N_E=e.O()}]);