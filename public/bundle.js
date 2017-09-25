/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const BOARD_WIDTH = 40;
/* harmony export (immutable) */ __webpack_exports__["b"] = BOARD_WIDTH;


const BOARD_HEIGHT = 40;
/* harmony export (immutable) */ __webpack_exports__["a"] = BOARD_HEIGHT;


const SNAKE_INIT_LENGTH = 6;
/* harmony export (immutable) */ __webpack_exports__["e"] = SNAKE_INIT_LENGTH;


const FPS = 12;
/* harmony export (immutable) */ __webpack_exports__["c"] = FPS;


const SCORE_MULTIPLIER = 2;
/* harmony export (immutable) */ __webpack_exports__["d"] = SCORE_MULTIPLIER;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = collisionCheck;
/* harmony export (immutable) */ __webpack_exports__["b"] = keyHandler;
/* harmony export (immutable) */ __webpack_exports__["c"] = updateScore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);


function collisionCheck(head) {
  const x = head.split('-')[0];
  const y = head.split('-')[1];

  if (x < 1 || y < 1 || x > __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* BOARD_WIDTH */] || y > __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BOARD_HEIGHT */]) {
    return 'wall';
  }

  const cell = document.querySelector(`.cell-${x}-${y}`);

  if (cell.classList.contains('snake')) {
    return 'snake';
  } else if(cell.classList.contains('frog')){
    return 'frog';
  }
  return 'going';
};

function keyHandler(snake, key) {
  if (snake.isDead) {
    return false;
  }

  switch(key) {
    case 37:
      snake.direction = 'left';      
      break;
    case 38:
      snake.direction = 'up';      
      break;
    case 39:
      snake.direction = 'right';      
      break;
    case 40:
      snake.direction = 'down';      
      break;
  };
};

function updateScore(snake) {
  const score = document.querySelector('.footer span');
  // trying to use css :empty selector for transition
  score.innerHTML = '';
  setTimeout(() => {
    score.textContent = (snake.body.length * __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* SCORE_MULTIPLIER */]) - (__WEBPACK_IMPORTED_MODULE_0__constants__["e" /* SNAKE_INIT_LENGTH */] * __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* SCORE_MULTIPLIER */])
  }, 200);
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Snake;
/* harmony export (immutable) */ __webpack_exports__["c"] = turnHead;
/* harmony export (immutable) */ __webpack_exports__["b"] = handleStatus;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__init__ = __webpack_require__(3);




function Snake() {
  this.body = Object(__WEBPACK_IMPORTED_MODULE_2__init__["c" /* initSnakeBody */])();
  this.isDead = false;
  this.direction = 'up';
};

function turnHead(direction, x, y) {
  let head = direction;

  switch(direction) {
    case 'left':
      head = `${x}-${y - 1}`;
      break;
    case 'right':
      head = `${x}-${y + 1}`;
      break;
    case 'up':
      head = `${x - 1}-${y}`;
      break;
    case 'down':
      head = `${x + 1}-${y}`;
      break;
  };

  return head;
};

function handleStatus(status, snake, head) {
  if (status === 'wall' || status === 'snake') {
    snake.isDead = true;
    handleDead();
    return;
  }

  addNewHead(head, snake);

  if (status === 'frog') {
    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* updateScore */])(snake);
    Object(__WEBPACK_IMPORTED_MODULE_2__init__["a" /* generateFrog */])(snake);
  } else {
    removeTail(snake);
  }
};

const addNewHead = (head, snake) => {
  snake.body.unshift(head);
  const newBodyCell = document.querySelector(`.cell-${head}`);
  newBodyCell.classList.add('snake');
  newBodyCell.classList.remove('frog');
};

const removeTail = snake => {
  const tail = snake.body.pop();
  const tailCell = document.querySelector(`.cell-${tail}`);
  tailCell.classList.remove('snake');
};

const handleDead = () => {
  const gameOverBackdrop = document.querySelector('.backdrop');
  gameOverBackdrop.classList.add('game-over');
  const restartButton = document.querySelector('.game-over button');
  restartButton.addEventListener('click', e => {
    gameOverBackdrop.classList.remove('game-over');
    resetGame();
  });
};

const resetGame = () => {
  // TODO: implement game module to handle the state of the game
  window.location.reload(false);
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = initBoardCells;
/* harmony export (immutable) */ __webpack_exports__["c"] = initSnakeBody;
/* harmony export (immutable) */ __webpack_exports__["d"] = placeSnake;
/* harmony export (immutable) */ __webpack_exports__["a"] = generateFrog;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);


const boardWidth = __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* BOARD_WIDTH */];
const boardHeight = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BOARD_HEIGHT */];
const snakeLength = __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* SNAKE_INIT_LENGTH */];
const totalCells = __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* BOARD_WIDTH */] * __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BOARD_HEIGHT */];

function initBoardCells(container) {
  container.innerHTML = '';

  for (var i = 0; i < boardWidth; i++) {
    for(var j = 0; j < boardHeight; j++) {
      const cell = document.createElement('div');

      cell.classList.add('cell', `cell-${i + 1}-${j + 1}`);
      
      container.appendChild(cell);
    }
  }
};

function initSnakeBody() {
  const body = [];
  const startPoint = Math.floor(boardWidth / 2);

  for (let i = 0; i < snakeLength; i++) {
    body[i] = `${startPoint + i}-${startPoint}`;
  }

  return body;
};

function placeSnake(snake){
  snake.body.forEach(xy => {
    const cell = document.querySelector(`.cell-${xy}`);
    cell.classList.add('snake');
  })
};

function generateFrog(snake) {
  const currentSnakeLength = snake.body.length;
  let random = Math.floor(Math.random() * (totalCells - currentSnakeLength));

  for (let i = 0; i < boardWidth; i++) {
    for (let j = 0; j < boardHeight; j++) {
      const cell = document.querySelector(`.cell-${i + 1}-${j + 1}`);

      if (!cell.classList.contains('snake') && --random === 0) {
        cell.classList.add('frog');
      }
    }
  }
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_snake__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_init__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_animation__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_main_scss__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__css_main_scss__);






function init(element) {
  const container = document.querySelector(element);
  const snake = new __WEBPACK_IMPORTED_MODULE_0__js_snake__["a" /* default */]();

  Object(__WEBPACK_IMPORTED_MODULE_1__js_init__["b" /* initBoardCells */])(container);
  Object(__WEBPACK_IMPORTED_MODULE_1__js_init__["d" /* placeSnake */])(snake);
  Object(__WEBPACK_IMPORTED_MODULE_1__js_init__["a" /* generateFrog */])(snake);

  document.addEventListener('keydown', key => {
    if (key.which === 32) {
      Object(__WEBPACK_IMPORTED_MODULE_3__js_animation__["a" /* animate */])(snake);
    }
    Object(__WEBPACK_IMPORTED_MODULE_2__js_utils__["b" /* keyHandler */])(snake, key.which);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  init('.board');
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = animate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__snake__ = __webpack_require__(2);




const forward = snake => {
  const head = snake.body[0];
  const x = Number(head.split('-')[0]);
  const y = Number(head.split('-')[1]);
  const newHead = Object(__WEBPACK_IMPORTED_MODULE_2__snake__["c" /* turnHead */])(snake.direction, x, y);
  const status = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* collisionCheck */])(newHead);

  Object(__WEBPACK_IMPORTED_MODULE_2__snake__["b" /* handleStatus */])(status, snake, newHead);
};

function animate(snake) {
  const interval = 1000 / __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* FPS */];
  let start = null;

  const move = timestamp => {
    if (snake.isDead) {
      return;
    }

    if (!start) {
      start = timestamp;
    }

    window.requestAnimationFrame(move);

    const progress = timestamp - start;

    if (progress > interval) {
      start = timestamp - (progress % interval);
      forward(snake);
    }
  };

  window.requestAnimationFrame(move);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box; }\n\nhtml,\nbody {\n  width: 100%;\n  height: 100%; }\n\nbody {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-family: 'Arial', 'san-serif';\n  color: #444;\n  font-size: 14px;\n  background: #f6f9fd; }\n\n.header,\n.footer {\n  padding: 40px;\n  text-align: center; }\n\n.header {\n  line-height: 2; }\n\n.footer {\n  width: 402px;\n  display: flex;\n  justify-content: center;\n  position: relative; }\n  .footer::before {\n    content: '';\n    display: block;\n    position: absolute;\n    left: 0;\n    top: 50%;\n    width: 100%;\n    height: 1px;\n    background: #eee;\n    z-index: -1; }\n  .footer p {\n    background: #f6f9fd;\n    width: 30%; }\n  .footer span {\n    color: #333;\n    display: inline-block;\n    width: 28px;\n    text-align: right;\n    opacity: 1;\n    transition: all 0.6s ease-out; }\n    .footer span:empty {\n      opacity: 0; }\n\n.backdrop {\n  display: none;\n  color: white;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  transition: background .5s ease-out; }\n  .backdrop button {\n    background: #21a88e;\n    border: none;\n    color: white;\n    border-radius: 4px;\n    padding: 8px 24px;\n    margin: 20px; }\n    .backdrop button:hover {\n      background: #19bc9c;\n      cursor: pointer; }\n  .backdrop.game-over {\n    display: flex;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.8); }\n\n.board {\n  width: 402px;\n  height: 402px;\n  border: 1px solid #ddd;\n  display: flex;\n  flex-wrap: wrap;\n  background: white; }\n  .board .cell {\n    flex: 0 0 calc(400px / 40);\n    height: calc(400px / 40); }\n  .board .snake {\n    background: #f08f00; }\n  .board .frog {\n    background: #21a88e; }\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);