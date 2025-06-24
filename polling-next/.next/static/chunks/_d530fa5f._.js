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
"[project]/components/CreatePollForm.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CreatePollForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$PollService$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/PollService.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CreatePollForm() {
    _s();
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [responseCount, setResponseCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [option, setOption] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        votes: 0,
        id: '0',
        isChecked: false
    });
    const [options, setOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const setDefaultValues = ()=>{
        setQuestion('');
        setOption({
            name: '',
            votes: 0,
            id: '0',
            isChecked: false
        });
        setResponseCount('1');
        setOptions([]);
    };
    const showMessage = (message)=>{
        setMessage(message);
        setTimeout(()=>{
            setMessage('');
        }, 3000);
    };
    const handleAddItem = ()=>{
        if (!option || !option.name.trim()) return;
        setOptions([
            ...options,
            option
        ]);
        setOption({
            name: '',
            votes: 0,
            id: '0',
            isChecked: false
        });
    };
    const handleCreatePoll = async ()=>{
        if (!question || options.some((opt)=>!opt.name.trim())) {
            return;
        }
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$PollService$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPoll"])({
                question,
                maxResponseOptions: responseCount,
                options: options
            });
            console.log('Created poll:', response);
            setDefaultValues();
            showMessage(`Poll with id ${response} created successfully!`);
        } catch (error) {
            console.error(error);
            showMessage('Failed to create poll.');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-md mx-auto p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold mb-4",
                children: "Add Item"
            }, void 0, false, {
                fileName: "[project]/components/CreatePollForm.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: "Question"
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full p-2 border rounded",
                        placeholder: "Question",
                        value: question,
                        onChange: (e)=>setQuestion(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: "Response Count"
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full p-2 border rounded",
                        placeholder: "Response Count",
                        type: "number",
                        min: 1,
                        value: responseCount,
                        onChange: (e)=>setResponseCount(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: "Options"
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-full p-2 border rounded",
                        placeholder: "Add Option",
                        value: option.name,
                        onChange: (e)=>setOption({
                                ...option,
                                name: e.target.value
                            }),
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') {
                                e.preventDefault(); // optional: prevent form submission or default behavior
                                handleAddItem();
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700",
                        onClick: handleAddItem,
                        children: "Add to List"
                    }, void 0, false, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CreatePollForm.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-6 space-y-2",
                children: options.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "p-2 bg-gray-100",
                        children: [
                            index + 1,
                            " - ",
                            item.name
                        ]
                    }, index, true, {
                        fileName: "[project]/components/CreatePollForm.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/CreatePollForm.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                fileName: "[project]/components/CreatePollForm.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700",
                onClick: handleCreatePoll,
                children: "Create Poll"
            }, void 0, false, {
                fileName: "[project]/components/CreatePollForm.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 text-center text-sm font-semibold",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-green-500",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/components/CreatePollForm.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/CreatePollForm.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/CreatePollForm.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_s(CreatePollForm, "mhn6u8vMv9p582y8b5kePtaL/4g=");
_c = CreatePollForm;
var _c;
__turbopack_context__.k.register(_c, "CreatePollForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/poll/create/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CreatePollForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CreatePollForm.tsx [app-client] (ecmascript)");
'use client';
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CreatePollForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/poll/create/page.tsx",
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
}]);

//# sourceMappingURL=_d530fa5f._.js.map