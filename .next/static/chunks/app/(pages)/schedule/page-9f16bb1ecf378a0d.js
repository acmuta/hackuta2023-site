(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[24],{49117:function(e,n,t){"use strict";t.d(n,{x:function(){return c}});var r=t(9268),i=t(8683),o=t.n(i),a=t(84554),s=t.n(a);function c(e){let{as:n="div",display:t="flex",direction:i="row",justifyContent:a="normal",alignItems:c="stretch",wrap:l="nowrap",gap:u,className:d,style:_,children:f,...m}=e,v="flex"===t||"inline-flex"===t;return(0,r.jsx)(n,{className:o()(s()[t],{[s()["flex-".concat(i)]]:v,[s()["justify-".concat(a)]]:v,[s()["align-".concat(c)]]:v,[s()["flex-wrap-".concat(l)]]:v},d),style:{..._&&_,...u&&{gap:u}},...m,children:f})}},4527:function(e,n,t){"use strict";t.d(n,{C:function(){return c}});var r=t(9268),i=t(4106),o=t(20943),a=t(86006),s=t(23272);function c(e){let{selected:n=!1,text:t,...c}=e,l=(0,a.useId)();return(0,r.jsxs)(s.zx,{kind:n?"primary":"secondary",role:"checkbox","aria-checked":n,id:l,"aria-labelledby":l,...c,children:[n?(0,r.jsx)(i.Z,{"aria-hidden":!0}):(0,r.jsx)(o.Z,{"aria-hidden":!0}),t]})}},23272:function(e,n,t){"use strict";t.d(n,{zx:function(){return c}});var r=t(9268),i=t(8683),o=t.n(i);t(35846);var a=t(70310),s=t.n(a);function c(e){let{children:n,className:t,kind:i="primary",type:a="button",...c}=e;return(0,r.jsx)("button",{type:a,className:o()(s().button,s()[i],t),...c,children:n})}t(4527)},23880:function(e,n,t){"use strict";t.d(n,{X:function(){return c}});var r=t(9268),i=t(8683),o=t.n(i),a=t(23645),s=t.n(a);let c=e=>{let{level:n=1,children:t,className:i,...a}=e;return(0,r.jsx)(n?"h".concat(n):"h1",{className:o()(s().heading,i),...a,children:t})}},44468:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return L}});var r=t(9268),i=t(86006),o=t(40031),a=t(49117),s=t(4527);let c=e=>{let{allSelected:n,groupId:t,items:o,onUpdate:c}=e,[l,u]=(0,i.useState)(Array(o.length).fill(!!n)),d=e=>{let n=l.map((n,t)=>t===e?!n:n);u(n),null==c||c(o.filter((e,t)=>n[t]))};return(0,r.jsx)(a.x,{direction:"row",style:{gap:"0.5rem"},wrap:"wrap",children:o.map((e,n)=>(0,r.jsx)(s.C,{selected:l[n],onClick:()=>d(n),text:e},"".concat(t,"-").concat(n)))})};var l=t(8683),u=t.n(l),d=t(99329),_=function(){return(_=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},f=i.forwardRef(function(e,n){var t=_(_({},i.useContext(d.s)),e);return i.createElement("svg",_({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:n},t),i.createElement("path",{d:"M6 12h12.5m0 0l-6-6m6 6l-6 6",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))}),m=t(67201),v=t.n(m);function h(e){let{children:n,dangerouslySetInnerHTMLOnChildren:t,summary:i,className:o,summaryClassName:a,summaryProps:s}=e;return(0,r.jsxs)("details",{className:u()(v().accordion,o),children:[(0,r.jsxs)("summary",{className:a,...s,children:[i," ",(0,r.jsx)(f,{"aria-hidden":!0})]}),(0,r.jsx)("div",{className:v().child,dangerouslySetInnerHTML:t,children:n})]})}var x=t(23880),p=t(40665),g=t.n(p),w=t(72453),j=t.n(w);let y=e=>{let{active:n,...t}=e;return(0,r.jsx)("div",{className:u()(j().eventStatus,"hiddenOnSmallScreen",{[j().active]:!0===n}),...t})},S=e=>e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),b=e=>{let n=Math.floor(e/1440),t=Math.floor(e%1440/60),r=e%60,i=[];return n>0&&i.push("".concat(n,"d")),t>0&&i.push("".concat(t,"h")),r>0&&i.push("".concat(r," min")+(r>1?"s":"")),i.join(" ")},T=e=>{let{active:n,dangerousLongDescInHTML:t,event:{startTime:i,durationMins:o,title:s,shortDesc:c,longDesc:l}}=e,d=new Date(i),_=S(d),f=b(o);return(0,r.jsxs)(a.x,{as:"div",direction:"row",className:g().eventContainer,children:[(0,r.jsx)(y,{active:n}),(0,r.jsx)(h,{className:g().eventCardContainer,summary:(0,r.jsxs)(a.x,{as:"div",direction:"row",alignItems:"center",className:g().summaryContainer,children:[(0,r.jsxs)(a.x,{as:"span",direction:"column",className:g().eventTime,children:[(0,r.jsx)("time",{className:g().eventStartTime,dateTime:d.toISOString(),children:_}),(0,r.jsx)("time",{className:g().eventLength,dateTime:d.toLocaleTimeString("en-US",{hour12:!1}),children:f})]}),(0,r.jsx)("div",{className:u()(g().eventDivider,"hiddenOnSmallScreen"),"aria-hidden":!0}),(0,r.jsxs)(a.x,{as:"span",direction:"column",gap:".25rem",className:g().eventText,children:[(0,r.jsx)(x.X,{level:3,className:g().eventTitle,children:s}),(0,r.jsx)("span",{className:g().eventShortDesc,children:c})]})]}),dangerouslySetInnerHTMLOnChildren:t?{__html:t}:void 0,children:t?void 0:l})]})};var B=t(22962),C=t.n(B);let k=e=>{let{children:n}=e;return(0,r.jsx)(x.X,{level:3,className:C().eventHeading,children:n})};var D=t(16679),E=t.n(D);let N=e=>{let{children:n,...t}=e;return(0,r.jsx)(a.x,{direction:"column",alignItems:"stretch",gap:".5rem",className:E().timeline,...t,children:n})};function L(e){let{events:n}=e,t=new Date().getTime(),s=(0,o.D8)(n.flatMap(e=>e.categories)),l=function(e){let n={};for(let i of e){var t,r;let{startTime:e}=i,o=new Date(e).toLocaleDateString(void 0,{month:"long",day:"numeric"});(null!==(r=(t=n)[o])&&void 0!==r?r:t[o]=[]).push(i)}return n}(n);(0,o.D8)(n.map(e=>new Date(e.startTime).getMonth()+1+"-"+new Date(e.startTime).getDate()));let[u,d]=(0,i.useState)(s);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.x,{direction:"row",gap:"2rem",style:{margin:"2rem 0"},children:(0,r.jsx)(c,{groupId:"event-filter",allSelected:!0,items:s,onUpdate:e=>d(e)})}),(0,r.jsx)(a.x,{as:"section",direction:"column",gap:"2rem",children:Object.entries(l).map(e=>{let[n,i]=e;return(0,r.jsxs)(a.x,{as:"section",display:"block",children:[(0,r.jsx)(k,{children:n}),(0,r.jsx)(N,{children:i.filter(e=>e.categories.some(e=>u.includes(e))).map(e=>(0,r.jsx)(T,{active:new Date(e.startTime).getTime()<=t&&t<=new Date(e.startTime).getTime()+6e4*e.durationMins,dangerousLongDescInHTML:e.longDesc,event:e},e.startTime+e.title))})]},n)})})]})}},40031:function(e,n,t){"use strict";t.d(n,{D8:function(){return i.D8},SD:function(){return i.SD},SG:function(){return o},hT:function(){return a},n:function(){return i.n},w6:function(){return i.w6}});var r=t(730),i=t(11558);let o=function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return fetch(...n).then(e=>e.json())};function a(){let{data:e,error:n,isLoading:t}=(0,r.ZP)("/api/auth/enhanced-session",o);return{user:null==e?void 0:e.user,perms:null==e?void 0:e.perms,isError:!!n,isLoading:t}}},11558:function(e,n,t){"use strict";function r(e,n){return Array(n-e).fill(void 0).map((n,t)=>t+e)}function i(e){return e instanceof Error?e.message:JSON.stringify(e)}function o(e){return[...new Set(e)]}t.d(n,{D8:function(){return o},Er:function(){return a},SD:function(){return c},ho:function(){return s},n:function(){return i},w6:function(){return r}});let a=e=>({label:e.toString(),value:e.toString()}),s=e=>Object.values(e.Values).map(a);async function c(e,n){let t=await (await fetch(e,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:n})).json();if("success"===t.status)window.location.reload();else throw Error(i(t))}},86678:function(e,n,t){Promise.resolve().then(t.t.bind(t,84554,23)),Promise.resolve().then(t.t.bind(t,46957,23)),Promise.resolve().then(t.t.bind(t,23645,23)),Promise.resolve().then(t.bind(t,44468))},46957:function(e){e.exports={pageSection:"PageSection_pageSection__zkKAe"}},67201:function(e){e.exports={accordion:"Accordion_accordion__SagxK",child:"Accordion_child__Z5vxT"}},84554:function(e){e.exports={block:"Box_block__da5fs",inline:"Box_inline__wCYvk","inline-block":"Box_inline-block__Yrkhv",flex:"Box_flex__JhI0U","inline-flex":"Box_inline-flex__dtW6n","flex-row":"Box_flex-row__fG85B","flex-column":"Box_flex-column__jT9Rc","flex-row-reverse":"Box_flex-row-reverse__6S__G","flex-column-reverse":"Box_flex-column-reverse__hgrzb","justify-start":"Box_justify-start__cdy3Q","justify-end":"Box_justify-end__4fCiM","justify-center":"Box_justify-center__1AObA","justify-normal":"Box_justify-normal__WebY6","justify-space-between":"Box_justify-space-between__iDICW","justify-space-around":"Box_justify-space-around__a5Tn7","justify-space-evenly":"Box_justify-space-evenly__rQV3Z","align-start":"Box_align-start__QPKwC","align-end":"Box_align-end__mb1LD","align-center":"Box_align-center__NeAro","align-baseline":"Box_align-baseline__xTt1B","align-stretch":"Box_align-stretch__WOwGu","flex-wrap-nowrap":"Box_flex-wrap-nowrap__4azi5","flex-wrap-wrap":"Box_flex-wrap-wrap__i6jz5","flex-wrap-wrap-reverse":"Box_flex-wrap-wrap-reverse__BysSU"}},70310:function(e){e.exports={button:"Button_button__L2wUb",primary:"Button_primary__wnomA",secondary:"Button_secondary__HrEDu"}},23645:function(e){e.exports={heading:"Heading_heading__209rB"}},40665:function(e){e.exports={eventContainer:"Event_eventContainer__MP0ZT",eventCardContainer:"Event_eventCardContainer__T3jIO",eventDivider:"Event_eventDivider__LAtJj",eventStartTime:"Event_eventStartTime__SdDXi",eventLength:"Event_eventLength__VZYY5",eventTitle:"Event_eventTitle__0W3qR",eventShortDesc:"Event_eventShortDesc__VHYr1",summaryContainer:"Event_summaryContainer__oWFaS",eventTime:"Event_eventTime__3sqqL"}},22962:function(e){e.exports={eventHeading:"EventHeading_eventHeading__fnvjf"}},72453:function(e){e.exports={eventStatus:"EventStatus_eventStatus__PA_SB",active:"EventStatus_active__lJPEP"}},16679:function(e){e.exports={timeline:"EventTimeline_timeline__kqW0H"}},20943:function(e,n,t){"use strict";var r=t(86006),i=t(99329),o=function(){return(o=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},a=r.forwardRef(function(e,n){var t=o(o({},r.useContext(i.s)),e);return r.createElement("svg",o({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:n},t),r.createElement("path",{d:"M8 12h4m4 0h-4m0 0V8m0 4v4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))});n.Z=a},4106:function(e,n,t){"use strict";var r=t(86006),i=t(99329),o=function(){return(o=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},a=r.forwardRef(function(e,n){var t=o(o({},r.useContext(i.s)),e);return r.createElement("svg",o({width:"1.5em",height:"1.5em",strokeWidth:1.5,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",color:"currentColor",ref:n},t),r.createElement("path",{d:"M7 12.5l3 3 7-7",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}),r.createElement("path",{d:"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round"}))});n.Z=a}},function(e){e.O(0,[619,984,667,961,744],function(){return e(e.s=86678)}),_N_E=e.O()}]);