(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/lib/PollService.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// lib/api.ts
__turbopack_context__.s({
    "createPoll": (()=>createPoll),
    "getPoll": (()=>getPoll),
    "getPolls": (()=>getPolls),
    "submitPoll": (()=>submitPoll)
});
async function createPoll(data) {
    const response = await fetch('http://localhost:5194/createPoll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to create poll');
    }
    return await response.json();
}
async function getPoll(pollId) {
    const response = await fetch(`http://localhost:5194/getPoll/${pollId}/${sessionStorage.getItem('pollUserId')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to create poll');
    }
    return await response.json();
}
async function getPolls() {
    const response = await fetch(`http://localhost:5194/getPolls`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Failed to create poll');
    }
    return await response.json();
}
async function submitPoll(data) {
    const response = await fetch(`http://localhost:5194/submitPoll/${sessionStorage.getItem('pollUserId')}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error('Failed to submit poll');
    }
    return await response.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/PollListing.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PollListing)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$PollService$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/PollService.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function PollListing() {
    _s();
    const [polls, setPolls] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const setDefaultValues = ()=>{
        setPolls([]);
    };
    const showMessage = (message)=>{
        setMessage(message);
        setTimeout(()=>{
            setMessage('');
        }, 3000);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PollListing.useEffect": ()=>{
            const fetchPolls = {
                "PollListing.useEffect.fetchPolls": async ()=>{
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$PollService$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPolls"])();
                        setPolls(response);
                    } catch (error) {
                        showMessage('Failed to load poll.');
                    }
                }
            }["PollListing.useEffect.fetchPolls"];
            fetchPolls();
        }
    }["PollListing.useEffect"], []);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const navigateToPollSubmission = (item)=>{
        router.push(`/poll/submit/${item.id}`); // Navigate to submit page with poll ID
    };
    // const handleSubmitPoll = async () => {
    //   if (!question || options.some(opt => !opt.name.trim())) {
    //     return;
    //   }
    //   try {
    //     const response = await submitPoll({
    //       pollId: pollId,
    //       pollOptionIds: selectedOptions.map(x => x.id)
    //     });
    //     console.log('Created poll:', response);
    //     setViewMode(true)
    //     setReloadTrigger(!reloadTrigger);
    //     showMessage(`Poll submitted successfully!`)
    //   } catch (error: any) {
    //     console.error(error);
    //     showMessage('Failed to submit poll.');
    //   }
    // };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "Select Poll:"
            }, void 0, false, {
                fileName: "[project]/components/PollListing.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: polls.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: (e)=>navigateToPollSubmission(item),
                        className: "flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "text-gray-800 cursor-pointer",
                            children: item.question
                        }, void 0, false, {
                            fileName: "[project]/components/PollListing.tsx",
                            lineNumber: 78,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/components/PollListing.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/PollListing.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-center text-sm font-semibold",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-green-500",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/components/PollListing.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/PollListing.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PollListing.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(PollListing, "qgp4Ew/v0jasvIzhWmNCf2rxA0Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PollListing;
var _c;
__turbopack_context__.k.register(_c, "PollListing");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/poll/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PollListing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PollListing.tsx [app-client] (ecmascript)");
'use client';
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PollListing$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/poll/page.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_15aa5fd5._.js.map