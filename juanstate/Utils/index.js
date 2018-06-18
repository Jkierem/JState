"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shallowObjectEquals = exports.countAttributes = exports.objectToString = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var objectToString = function objectToString(object) {
  var atts = countAttributes(object);
  var i = 0;
  var value = "{ ";

  for (var att in object) {
    if (object.hasOwnProperty(att)) {
      if (_typeof(object[att]) === "object") {
        value += att + ": " + objectToString(object[att]);
      } else {
        value += att + ": " + object[att];
      }

      if (i !== atts - 1) {
        value += ", ";
      }
    }

    i++;
  }

  value += " }";
  return value;
};

exports.objectToString = objectToString;

var countAttributes = function countAttributes(object) {
  var count = 0;

  for (var att in object) {
    if (object.hasOwnProperty(att)) {
      count++;
    }
  }

  return count;
};

exports.countAttributes = countAttributes;

var shallowObjectEquals = function shallowObjectEquals(obj1, obj2) {
  if (_typeof(obj1) === "object" && _typeof(obj2) === "object") {
    for (var key in obj1) {
      if (obj1.hasOwnProperty(key)) {
        if (_typeof(obj1[key]) !== "object" && _typeof(obj2[key]) !== "object") {
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        } else {
          if (!shallowObjectEquals(obj1[key], obj2[key])) {
            return false;
          }
        }
      }
    }

    return true;
  } else {
    return obj1 === obj2;
  }
};

exports.shallowObjectEquals = shallowObjectEquals;