define(["react","@floating-ui/react-dom"], function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE__floating_ui_react_dom__) { return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@floating-ui/react-dom":
/*!*****************************************!*\
  !*** external "@floating-ui/react-dom" ***!
  \*****************************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__floating_ui_react_dom__;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!***************************************!*\
  !*** ./src/components/aves/index.tsx ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @floating-ui/react-dom */ "@floating-ui/react-dom");
/* harmony import */ var _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__);



const Aves = props => {
  const Popup = props.popup;
  const [selectionText, setSelectionText] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const textWrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const bodyUserSelect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(document.body.style.userSelect);
  const textRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(undefined);
  const {
    x,
    y,
    strategy,
    refs,
    isPositioned
  } = (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.useFloating)({
    strategy: 'fixed',
    placement: 'top',
    whileElementsMounted: _floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.autoUpdate,
    middleware: [(0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.inline)(), (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.offset)({
      mainAxis: 10,
      alignmentAxis: 0
    }), (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.flip)(), (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.shift)({
      mainAxis: true,
      crossAxis: false,
      limiter: (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.limitShift)()
    }), (0,_floating_ui_react_dom__WEBPACK_IMPORTED_MODULE_1__.hide)({
      strategy: 'referenceHidden'
    })]
  });
  const onSelection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSelectionText(undefined);
    await new Promise(r => setTimeout(r));
    const selection = document.getSelection();

    if (!selection || selection.isCollapsed || !selection.toString().length) {
      return;
    }

    if (!textWrapperRef.current?.contains(selection.anchorNode)) {
      return;
    }

    const range = selection.getRangeAt(0);
    textRef.current = range.toString();
    setSelectionText(range.toString());
    refs.setReference(range);
  }, [refs]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    document.addEventListener('pointerup', onSelection);
    return () => {
      document.removeEventListener('pointerup', onSelection);
    };
  }, [onSelection]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      userSelect: 'text',
      ...props.style
    },
    ref: textWrapperRef,
    className: props.className,
    onPointerDown: () => {
      document.body.style.userSelect = 'none';
    },
    onPointerUp: () => {
      document.body.style.userSelect = bodyUserSelect.current;
    }
  }, props.children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: refs.setFloating,
    style: {
      position: strategy,
      top: 0,
      left: 0,
      transform: isPositioned ? `translate3d(${Math.round(x ?? 0)}px, ${Math.round(y ?? 0)}px, 0)` : 'translate3d(0, -200%, 0)',
      userSelect: 'none',
      minWidth: 'max-content',
      zIndex: 9999,
      transition: 'opacity 0.3s ease-in-out',
      opacity: selectionText === undefined ? 0 : 1,
      visibility: selectionText === undefined ? 'hidden' : 'visible'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Popup, {
    text: textRef.current
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (Aves);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});;
//# sourceMappingURL=aves.js.map