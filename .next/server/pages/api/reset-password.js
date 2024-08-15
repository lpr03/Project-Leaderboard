"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/reset-password";
exports.ids = ["pages/api/reset-password"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freset-password&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Creset-password.js&middlewareConfigBase64=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freset-password&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Creset-password.js&middlewareConfigBase64=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _src_pages_api_reset_password_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src\\pages\\api\\reset-password.js */ \"(api)/./src/pages/api/reset-password.js\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_reset_password_js__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_src_pages_api_reset_password_js__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/reset-password\",\n        pathname: \"/api/reset-password\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _src_pages_api_reset_password_js__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRnJlc2V0LXBhc3N3b3JkJnByZWZlcnJlZFJlZ2lvbj0mYWJzb2x1dGVQYWdlUGF0aD0uJTJGc3JjJTVDcGFnZXMlNUNhcGklNUNyZXNldC1wYXNzd29yZC5qcyZtaWRkbGV3YXJlQ29uZmlnQmFzZTY0PWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDTDtBQUMxRDtBQUNpRTtBQUNqRTtBQUNBLGlFQUFlLHdFQUFLLENBQUMsNkRBQVEsWUFBWSxFQUFDO0FBQzFDO0FBQ08sZUFBZSx3RUFBSyxDQUFDLDZEQUFRO0FBQ3BDO0FBQ08sd0JBQXdCLGdIQUFtQjtBQUNsRDtBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxZQUFZO0FBQ1osQ0FBQzs7QUFFRCIsInNvdXJjZXMiOlsid2VicGFjazovL2xlYWRlcmJvYXJkLz9kYmY0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzQVBJUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgaG9pc3QgfSBmcm9tIFwibmV4dC9kaXN0L2J1aWxkL3RlbXBsYXRlcy9oZWxwZXJzXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiLi9zcmNcXFxccGFnZXNcXFxcYXBpXFxcXHJlc2V0LXBhc3N3b3JkLmpzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsIFwiZGVmYXVsdFwiKTtcbi8vIFJlLWV4cG9ydCBjb25maWcuXG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsIFwiY29uZmlnXCIpO1xuLy8gQ3JlYXRlIGFuZCBleHBvcnQgdGhlIHJvdXRlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXG5leHBvcnQgY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgUGFnZXNBUElSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuUEFHRVNfQVBJLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcmVzZXQtcGFzc3dvcmRcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yZXNldC1wYXNzd29yZFwiLFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGFyZW4ndCB1c2VkIGluIHByb2R1Y3Rpb24uXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcIlwiXG4gICAgfSxcbiAgICB1c2VybGFuZFxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhZ2VzLWFwaS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freset-password&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Creset-password.js&middlewareConfigBase64=e30%3D!\n");

/***/ }),

/***/ "(api)/./src/pages/api/reset-password.js":
/*!*****************************************!*\
  !*** ./src/pages/api/reset-password.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst { createHash } = __webpack_require__(/*! node:crypto */ \"node:crypto\");\nconst uri = process.env.MONGODB_URI;\nconst client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, {\n    useNewUrlParser: true,\n    useUnifiedTopology: true\n});\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        const { token, newPassword } = req.body;\n        try {\n            await client.connect();\n            const db = client.db(\"Users\");\n            const users = db.collection(\"Profiles\");\n            const user = await users.findOne({\n                resetPasswordToken: token,\n                resetPasswordExpires: {\n                    $gt: Date.now()\n                }\n            });\n            if (!user) {\n                return res.status(400).json({\n                    message: \"Token is invalid or expired\"\n                });\n            }\n            const hashedPassword = createHash(\"sha256\").update(newPassword).digest(\"hex\");\n            await users.updateOne({\n                _id: user._id\n            }, {\n                $set: {\n                    Password: hashedPassword,\n                    resetPasswordToken: null,\n                    resetPasswordExpires: null\n                }\n            });\n            res.status(200).json({\n                message: \"Password has been reset\"\n            });\n        } catch (error) {\n            res.status(500).json({\n                message: \"Internal server error\"\n            });\n        } finally{\n            await client.close();\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"POST\"\n        ]);\n        res.status(405).end(`Method ${req.method} Not Allowed`);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL3Jlc2V0LXBhc3N3b3JkLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXNDO0FBQ1I7QUFDOUIsTUFBTSxFQUFFRSxVQUFVLEVBQUUsR0FBR0MsbUJBQU9BLENBQUM7QUFFL0IsTUFBTUMsTUFBTUMsUUFBUUMsR0FBRyxDQUFDQyxXQUFXO0FBQ25DLE1BQU1DLFNBQVMsSUFBSVIsZ0RBQVdBLENBQUNJLEtBQUs7SUFBRUssaUJBQWlCO0lBQU1DLG9CQUFvQjtBQUFLO0FBRXZFLGVBQWVDLFFBQVFDLEdBQUcsRUFBRUMsR0FBRztJQUMxQyxJQUFJRCxJQUFJRSxNQUFNLEtBQUssUUFBUTtRQUN2QixNQUFNLEVBQUVDLEtBQUssRUFBRUMsV0FBVyxFQUFFLEdBQUdKLElBQUlLLElBQUk7UUFFdkMsSUFBSTtZQUNBLE1BQU1ULE9BQU9VLE9BQU87WUFDcEIsTUFBTUMsS0FBS1gsT0FBT1csRUFBRSxDQUFDO1lBQ3JCLE1BQU1DLFFBQVFELEdBQUdFLFVBQVUsQ0FBQztZQUU1QixNQUFNQyxPQUFPLE1BQU1GLE1BQU1HLE9BQU8sQ0FBQztnQkFBRUMsb0JBQW9CVDtnQkFBT1Usc0JBQXNCO29CQUFFQyxLQUFLQyxLQUFLQyxHQUFHO2dCQUFHO1lBQUU7WUFDeEcsSUFBSSxDQUFDTixNQUFNO2dCQUNQLE9BQU9ULElBQUlnQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO29CQUFFQyxTQUFTO2dCQUE4QjtZQUN6RTtZQUVBLE1BQU1DLGlCQUFpQjlCLFdBQVcsVUFBVStCLE1BQU0sQ0FBQ2pCLGFBQWFrQixNQUFNLENBQUM7WUFFdkUsTUFBTWQsTUFBTWUsU0FBUyxDQUFDO2dCQUFFQyxLQUFLZCxLQUFLYyxHQUFHO1lBQUMsR0FBRztnQkFBRUMsTUFBTTtvQkFBRUMsVUFBVU47b0JBQWdCUixvQkFBb0I7b0JBQU1DLHNCQUFzQjtnQkFBSztZQUFFO1lBRXBJWixJQUFJZ0IsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUEwQjtRQUM5RCxFQUFFLE9BQU9RLE9BQU87WUFDWjFCLElBQUlnQixNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDO2dCQUFFQyxTQUFTO1lBQXdCO1FBQzVELFNBQVU7WUFDTixNQUFNdkIsT0FBT2dDLEtBQUs7UUFDdEI7SUFDSixPQUFPO1FBQ0gzQixJQUFJNEIsU0FBUyxDQUFDLFNBQVM7WUFBQztTQUFPO1FBQy9CNUIsSUFBSWdCLE1BQU0sQ0FBQyxLQUFLYSxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUU5QixJQUFJRSxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQzFEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9wYWdlcy9hcGkvcmVzZXQtcGFzc3dvcmQuanM/MzNlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nb0NsaWVudCB9IGZyb20gJ21vbmdvZGInO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuY29uc3QgeyBjcmVhdGVIYXNoIH0gPSByZXF1aXJlKCdub2RlOmNyeXB0bycpO1xyXG5cclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XHJcbmNvbnN0IGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmksIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLCB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUgfSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ1BPU1QnKSB7XHJcbiAgICAgICAgY29uc3QgeyB0b2tlbiwgbmV3UGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBjbGllbnQuY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBkYiA9IGNsaWVudC5kYignVXNlcnMnKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlcnMgPSBkYi5jb2xsZWN0aW9uKCdQcm9maWxlcycpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJzLmZpbmRPbmUoeyByZXNldFBhc3N3b3JkVG9rZW46IHRva2VuLCByZXNldFBhc3N3b3JkRXhwaXJlczogeyAkZ3Q6IERhdGUubm93KCkgfSB9KTtcclxuICAgICAgICAgICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiAnVG9rZW4gaXMgaW52YWxpZCBvciBleHBpcmVkJyB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBjcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUobmV3UGFzc3dvcmQpLmRpZ2VzdCgnaGV4Jyk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB1c2Vycy51cGRhdGVPbmUoeyBfaWQ6IHVzZXIuX2lkIH0sIHsgJHNldDogeyBQYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsIHJlc2V0UGFzc3dvcmRUb2tlbjogbnVsbCwgcmVzZXRQYXNzd29yZEV4cGlyZXM6IG51bGwgfSB9KTtcclxuXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogJ1Bhc3N3b3JkIGhhcyBiZWVuIHJlc2V0JyB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnNldEhlYWRlcignQWxsb3cnLCBbJ1BPU1QnXSk7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDUpLmVuZChgTWV0aG9kICR7cmVxLm1ldGhvZH0gTm90IEFsbG93ZWRgKTtcclxuICAgIH1cclxufSJdLCJuYW1lcyI6WyJNb25nb0NsaWVudCIsImJjcnlwdCIsImNyZWF0ZUhhc2giLCJyZXF1aXJlIiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiY2xpZW50IiwidXNlTmV3VXJsUGFyc2VyIiwidXNlVW5pZmllZFRvcG9sb2d5IiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInRva2VuIiwibmV3UGFzc3dvcmQiLCJib2R5IiwiY29ubmVjdCIsImRiIiwidXNlcnMiLCJjb2xsZWN0aW9uIiwidXNlciIsImZpbmRPbmUiLCJyZXNldFBhc3N3b3JkVG9rZW4iLCJyZXNldFBhc3N3b3JkRXhwaXJlcyIsIiRndCIsIkRhdGUiLCJub3ciLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsImhhc2hlZFBhc3N3b3JkIiwidXBkYXRlIiwiZGlnZXN0IiwidXBkYXRlT25lIiwiX2lkIiwiJHNldCIsIlBhc3N3b3JkIiwiZXJyb3IiLCJjbG9zZSIsInNldEhlYWRlciIsImVuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/reset-password.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Freset-password&preferredRegion=&absolutePagePath=.%2Fsrc%5Cpages%5Capi%5Creset-password.js&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();