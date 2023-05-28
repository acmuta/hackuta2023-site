exports.id = 543;
exports.ids = [543];
exports.modules = {

/***/ 21133:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ Heading)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71198);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Heading_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48240);
/* harmony import */ var _Heading_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Heading_module_css__WEBPACK_IMPORTED_MODULE_2__);



const Heading = ({ level =1 , children , className , ...props })=>{
    const Tag = !level ? "h1" : `h${level}`;
    const HeadingTag = Tag;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(HeadingTag, {
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()((_Heading_module_css__WEBPACK_IMPORTED_MODULE_2___default().heading), className),
        ...props,
        children: children
    });
};


/***/ }),

/***/ 51487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Schedule)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./src/lib/utils/client.ts
var client = __webpack_require__(20623);
// EXTERNAL MODULE: ./src/components/Box/index.ts + 1 modules
var Box = __webpack_require__(12169);
// EXTERNAL MODULE: ./src/components/Button/ToggleButton.tsx
var ToggleButton = __webpack_require__(74308);
;// CONCATENATED MODULE: ./src/components/Button/ToggleButtonGroup.tsx




const ToggleButtonGroup = ({ allSelected , groupId , items , onUpdate  })=>{
    const [checkedState, setCheckedState] = (0,react_.useState)(new Array(items.length).fill(!!allSelected));
    const handleOnChange = (position)=>{
        const updatedCheckedState = checkedState.map((item, index)=>index === position ? !item : item);
        setCheckedState(updatedCheckedState);
        onUpdate?.(items.filter((_v, i)=>updatedCheckedState[i]));
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(Box/* Box */.x, {
        direction: "row",
        style: {
            gap: "0.5rem"
        },
        wrap: "wrap",
        children: items.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx(ToggleButton/* ToggleButton */.C, {
                selected: checkedState[index],
                onClick: ()=>handleOnChange(index),
                text: item
            }, `${groupId}-${index}`))
    });
};

// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(71198);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/iconoir-react/dist/esm/ArrowRight.mjs
var ArrowRight = __webpack_require__(69610);
// EXTERNAL MODULE: ./src/components/Accordion/Accordion.module.css
var Accordion_module = __webpack_require__(29547);
var Accordion_module_default = /*#__PURE__*/__webpack_require__.n(Accordion_module);
;// CONCATENATED MODULE: ./src/components/Accordion/index.tsx




function Accordion({ children , dangerouslySetInnerHTMLOnChildren , summary , className , summaryClassName , summaryProps  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("details", {
        className: classnames_default()((Accordion_module_default()).accordion, className),
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("summary", {
                className: summaryClassName,
                ...summaryProps,
                children: [
                    summary,
                    " ",
                    /*#__PURE__*/ jsx_runtime_.jsx(ArrowRight/* default */.Z, {
                        "aria-hidden": true
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (Accordion_module_default()).child,
                dangerouslySetInnerHTML: dangerouslySetInnerHTMLOnChildren,
                children: children
            })
        ]
    });
}

// EXTERNAL MODULE: ./src/components/Heading/index.tsx
var Heading = __webpack_require__(21133);
// EXTERNAL MODULE: ./src/components/Schedule/Event.module.css
var Event_module = __webpack_require__(93928);
var Event_module_default = /*#__PURE__*/__webpack_require__.n(Event_module);
// EXTERNAL MODULE: ./src/components/Schedule/EventStatus.module.css
var EventStatus_module = __webpack_require__(60994);
var EventStatus_module_default = /*#__PURE__*/__webpack_require__.n(EventStatus_module);
;// CONCATENATED MODULE: ./src/components/Schedule/EventStatus.tsx



const EventStatus = ({ active , ...props })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: classnames_default()((EventStatus_module_default()).eventStatus, "hiddenOnSmallScreen", {
            [(EventStatus_module_default()).active]: active === true
        }),
        ...props
    });
};

;// CONCATENATED MODULE: ./src/components/Schedule/Event.tsx







const getTimeFromDate = (date)=>{
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
};
const getDuration = (minutes)=>{
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor(minutes % 1440 / 60);
    const remainingMinutes = minutes % 60;
    const durationParts = [];
    if (days > 0) {
        durationParts.push(`${days}d`);
    }
    if (hours > 0) {
        durationParts.push(`${hours}h`);
    }
    if (remainingMinutes > 0) {
        durationParts.push(`${remainingMinutes} min` + (remainingMinutes > 1 ? "s" : ""));
    }
    return durationParts.join(" ");
};
const Event = ({ active , dangerousLongDescInHTML , event: { startTime , durationMins , title , shortDesc , longDesc  }  })=>{
    const startDate = new Date(startTime);
    const time = getTimeFromDate(startDate);
    const duration = getDuration(durationMins);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
        as: "div",
        direction: "row",
        className: (Event_module_default()).eventContainer,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(EventStatus, {
                active: active
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Accordion, {
                className: (Event_module_default()).eventCardContainer,
                summary: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
                    as: "div",
                    direction: "row",
                    alignItems: "center",
                    className: (Event_module_default()).summaryContainer,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
                            as: "span",
                            direction: "column",
                            className: (Event_module_default()).eventTime,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("time", {
                                    className: (Event_module_default()).eventStartTime,
                                    dateTime: startDate.toISOString(),
                                    children: time
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("time", {
                                    className: (Event_module_default()).eventLength,
                                    dateTime: startDate.toLocaleTimeString("en-US", {
                                        hour12: false
                                    }),
                                    children: duration
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: classnames_default()((Event_module_default()).eventDivider, "hiddenOnSmallScreen"),
                            "aria-hidden": true
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
                            as: "span",
                            direction: "column",
                            gap: ".25rem",
                            className: (Event_module_default()).eventText,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(Heading/* Heading */.X, {
                                    level: 3,
                                    className: (Event_module_default()).eventTitle,
                                    children: title
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: (Event_module_default()).eventShortDesc,
                                    children: shortDesc
                                })
                            ]
                        })
                    ]
                }),
                dangerouslySetInnerHTMLOnChildren: dangerousLongDescInHTML ? {
                    __html: dangerousLongDescInHTML
                } : undefined,
                children: dangerousLongDescInHTML ? undefined : longDesc
            })
        ]
    });
};

// EXTERNAL MODULE: ./src/components/Schedule/EventHeading.module.css
var EventHeading_module = __webpack_require__(34150);
var EventHeading_module_default = /*#__PURE__*/__webpack_require__.n(EventHeading_module);
;// CONCATENATED MODULE: ./src/components/Schedule/EventHeading.tsx



const EventHeading = ({ children  })=>/*#__PURE__*/ jsx_runtime_.jsx(Heading/* Heading */.X, {
        level: 3,
        className: (EventHeading_module_default()).eventHeading,
        children: children
    });

// EXTERNAL MODULE: ./src/components/Schedule/EventTimeline.module.css
var EventTimeline_module = __webpack_require__(21627);
var EventTimeline_module_default = /*#__PURE__*/__webpack_require__.n(EventTimeline_module);
;// CONCATENATED MODULE: ./src/components/Schedule/EventTimeline.tsx



const EventTimeline = ({ children , ...props })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(Box/* Box */.x, {
        direction: "column",
        alignItems: "stretch",
        gap: ".5rem",
        className: (EventTimeline_module_default()).timeline,
        ...props,
        children: children
    });
};

;// CONCATENATED MODULE: ./src/components/Schedule/index.tsx








function Schedule({ events  }) {
    const date = new Date().getTime();
    const categories = (0,client/* dedupe */.D8)(events.flatMap((e)=>e.categories));
    const dateMap = getDateEventMap(events);
    (0,client/* dedupe */.D8)(events.map((e)=>new Date(e.startTime).getMonth() + 1 + "-" + new Date(e.startTime).getDate()));
    const [selectedCategories, setSelectedCategories] = (0,react_.useState)(categories);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Box/* Box */.x, {
                direction: "row",
                gap: "2rem",
                style: {
                    margin: "2rem 0"
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx(ToggleButtonGroup, {
                    groupId: "event-filter",
                    allSelected: true,
                    items: categories,
                    onUpdate: (newValues)=>setSelectedCategories(newValues)
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Box/* Box */.x, {
                as: "section",
                direction: "column",
                gap: "2rem",
                children: Object.entries(dateMap).map(([dateStr, events])=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)(Box/* Box */.x, {
                        as: "section",
                        display: "block",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(EventHeading, {
                                children: dateStr
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(EventTimeline, {
                                children: events.filter((e)=>e.categories.some((c)=>selectedCategories.includes(c))).map((e)=>/*#__PURE__*/ jsx_runtime_.jsx(Event, {
                                        active: new Date(e.startTime).getTime() <= date && date <= new Date(e.startTime).getTime() + e.durationMins * 60000,
                                        // DANGER: input coming from database that is only edible by admin. absolutely no unsanitized input can be passed!
                                        dangerousLongDescInHTML: e.longDesc,
                                        event: e
                                    }, e.startTime + e.title))
                            })
                        ]
                    }, dateStr))
            })
        ]
    });
}
function getDateEventMap(events) {
    const ans = {};
    for (const e of events){
        const { startTime: time  } = e;
        const dateStr = new Date(time).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric"
        });
        (ans[dateStr] ??= []).push(e);
    }
    return ans;
}


/***/ }),

/***/ 29547:
/***/ ((module) => {

// Exports
module.exports = {
	"accordion": "Accordion_accordion__SagxK",
	"child": "Accordion_child__Z5vxT"
};


/***/ }),

/***/ 48240:
/***/ ((module) => {

// Exports
module.exports = {
	"heading": "Heading_heading__209rB"
};


/***/ }),

/***/ 93928:
/***/ ((module) => {

// Exports
module.exports = {
	"eventContainer": "Event_eventContainer__MP0ZT",
	"eventCardContainer": "Event_eventCardContainer__T3jIO",
	"eventDivider": "Event_eventDivider__LAtJj",
	"eventStartTime": "Event_eventStartTime__SdDXi",
	"eventLength": "Event_eventLength__VZYY5",
	"eventTitle": "Event_eventTitle__0W3qR",
	"eventShortDesc": "Event_eventShortDesc__VHYr1",
	"summaryContainer": "Event_summaryContainer__oWFaS",
	"eventTime": "Event_eventTime__3sqqL"
};


/***/ }),

/***/ 34150:
/***/ ((module) => {

// Exports
module.exports = {
	"eventHeading": "EventHeading_eventHeading__fnvjf"
};


/***/ }),

/***/ 60994:
/***/ ((module) => {

// Exports
module.exports = {
	"eventStatus": "EventStatus_eventStatus__PA_SB",
	"active": "EventStatus_active__lJPEP"
};


/***/ }),

/***/ 21627:
/***/ ((module) => {

// Exports
module.exports = {
	"timeline": "EventTimeline_timeline__kqW0H"
};


/***/ }),

/***/ 37120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "v": () => (/* binding */ ScheduleSection),
  "V": () => (/* binding */ getEvents)
});

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(83146);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(35985);
;// CONCATENATED MODULE: ./src/components/Schedule/index.tsx

const proxy = (0,module_proxy.createProxy)("/home/runner/work/hackuta2023-site/hackuta2023-site/src/components/Schedule/index.tsx")

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
/* harmony default export */ const Schedule = (proxy.default);

// EXTERNAL MODULE: ./src/app/(pages)/PageSection.tsx
var PageSection = __webpack_require__(44151);
// EXTERNAL MODULE: ./src/app/(pages)/utils.tsx
var utils = __webpack_require__(39120);
;// CONCATENATED MODULE: ./src/app/(pages)/schedule/utils.tsx




function ScheduleSection({ events  }) {
    const content = !events ? /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: "Failed loading the schedule. Please try again later."
    }) : /*#__PURE__*/ jsx_runtime.jsx(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ jsx_runtime.jsx(Schedule, {
            events: events
        })
    });
    return /*#__PURE__*/ jsx_runtime.jsx(PageSection/* default */.Z, {
        heading: "Schedule",
        children: content
    });
}
async function getEvents() {
    const now = new Date().getTime();
    return (0,utils/* queryDbForItems */.C)("events", "[@/app/schedule/page.tsx#getEvents]", (events)=>events.filter((e)=>new Date(e.startTime).getTime() + e.durationMins * 60000 >= now).sort((a, b)=>a.startTime.localeCompare(b.startTime)));
}


/***/ })

};
;