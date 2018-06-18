"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.inject = inject;
exports.Reducer = exports.combineReducers = exports.default = exports.Inject = exports.getState = exports.hasStateChanged = exports.getStore = void 0;

var _Utils = require("../Utils");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//Store singleton
var instance = undefined;

var getStore = function getStore() {
  return instance;
};

exports.getStore = getStore;

var hasStateChanged = function hasStateChanged() {
  return instance.hasChanged;
};

exports.hasStateChanged = hasStateChanged;

var getState = function getState() {
  return instance.getState !== undefined ? instance.getState() : null;
};

exports.getState = getState;

function dispatch(action) {
  if (instance) instance.dispatch(action);
}

;

function inject(injectedComponent, injection) {
  return function () {
    return _react.default.createElement(Inject, {
      injection: injection
    }, _react.default.createElement(injectedComponent));
  };
}

var Inject =
/*#__PURE__*/
function (_Component) {
  _inherits(Inject, _Component);

  function Inject() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Inject);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Inject)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "injectComponent", function () {
      return _react.default.cloneElement(_this.props.children, {
        state: _this.props.injection(getState()),
        dispatch: dispatch
      });
    });

    return _this;
  }

  _createClass(Inject, [{
    key: "render",
    value: function render() {
      return this.injectComponent();
    }
  }]);

  return Inject;
}(_react.Component);

exports.Inject = Inject;

var Store =
/*#__PURE__*/
function () {
  function Store(reducers) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Store);

    _defineProperty(this, "getState", function () {
      return instance.state;
    });

    if (!instance) {
      try {
        if (reducers !== undefined) {
          this.reducers = reducers;
          this.previousState = {};
          this.hasChanged = false;
          this.state = state;

          for (var red in reducers) {
            if (reducers.hasOwnProperty(red)) {
              this.state[red] = {};
            }
          }

          instance = this;
          this.dispatch({
            type: "firstAction"
          });
        } else {
          throw new TypeError("Reducers must not be undefined.");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  _createClass(Store, [{
    key: "dispatch",
    value: function dispatch(action) {
      var _instance = instance,
          reducers = _instance.reducers;
      instance.previousState = Object.assign({}, instance.state);

      for (var red in reducers) {
        if (reducers.hasOwnProperty(red)) {
          instance.state[red] = this.reducers[red](this.state[red], action);
        }
      }

      instance.hasChanged = !(0, _Utils.shallowObjectEquals)(instance.state, instance.previousState);
    }
  }]);

  return Store;
}(); //Combine reducers helper


exports.default = Store;

var combineReducers = function combineReducers() {
  var combination = {};

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] === "function") {
      if (Object.keys(args[i]({}, {
        type: "test"
      })).length === 0) combination[args[i].name] = args[i];
    }
  }

  if (Object.keys(combination).length === 0) combination = undefined;
  return combination;
};

exports.combineReducers = combineReducers;

var Reducer =
/*#__PURE__*/
function () {
  function Reducer() {
    _classCallCheck(this, Reducer);
  }

  _createClass(Reducer, null, [{
    key: "enableDebug",
    value: function enableDebug() {
      Reducer.debug = true;
    }
  }, {
    key: "disableDebug",
    value: function disableDebug() {
      Reducer.debug = false;
    }
  }, {
    key: "combineReducers",
    value: function combineReducers() {
      var combination = {};

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      for (var i = 0; i < args.length; i++) {
        if (typeof args[i] === "function") {
          var test = args[i]({}, {
            type: "test"
          });
          if (Object.keys(test).length === 0) combination[args[i].name] = args[i];else if (Reducer.debug === true) console.error("Reducer function ".concat(i + 1, " doesn't behave as expected given the initial action thus it will not be combined. Expected result was empty object instead received ").concat(_typeof(test), " : ").concat((0, _Utils.objectToString)(test)));
        } else {
          if (Reducer.debug === true) {
            var type = _typeof(args[i]);

            var value = args[i];

            if (type === "object") {
              value = (0, _Utils.objectToString)(args[i]);
            }

            console.error("Argument number ".concat(i + 1, " in function combineReducers is not a function thus it will not be combined. Its type is ").concat(type, ". value: ").concat(value));
          }
        }
      }

      if (Object.keys(combination).length === 0) combination = undefined;
      return combination;
    }
  }]);

  return Reducer;
}();

exports.Reducer = Reducer;
Reducer.debug = false;