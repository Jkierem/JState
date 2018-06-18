"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "combineReducers", {
  enumerable: true,
  get: function get() {
    return _Store.combineReducers;
  }
});
Object.defineProperty(exports, "dispatch", {
  enumerable: true,
  get: function get() {
    return _Store.dispatch;
  }
});
Object.defineProperty(exports, "getState", {
  enumerable: true,
  get: function get() {
    return _Store.getState;
  }
});
Object.defineProperty(exports, "getStore", {
  enumerable: true,
  get: function get() {
    return _Store.getStore;
  }
});
Object.defineProperty(exports, "hasStateChanged", {
  enumerable: true,
  get: function get() {
    return _Store.hasStateChanged;
  }
});
Object.defineProperty(exports, "inject", {
  enumerable: true,
  get: function get() {
    return _Store.inject;
  }
});
Object.defineProperty(exports, "Reducer", {
  enumerable: true,
  get: function get() {
    return _Store.Reducer;
  }
});
exports.Utils = exports.default = void 0;

var _WareHouse = _interopRequireDefault(require("./WareHouse"));

var Utils = _interopRequireWildcard(require("./Utils"));

exports.Utils = Utils;

var _Store = require("./Store");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _WareHouse.default;
exports.default = _default;