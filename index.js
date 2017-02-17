'use strict';

var ObjectPrototype = Object.getPrototypeOf(Object);
var canGetOwnPropertySymbols = 'getOwnPropertySymbols' in Object;
var isUniqueReducer = function (unique, value) {
  if (unique.indexOf(value) === -1) {
    unique.push(value);
  }
  return unique;
};

function getObjectProps(obj, props, getSymbols, getAll) {
  props = props || [];
  if (obj) {
    props.push.apply(props, Object.getOwnPropertyNames(obj));
    getSymbols && canGetOwnPropertySymbols && props.push.apply(props, Object.getOwnPropertySymbols(obj));
    var proto = Object.getPrototypeOf(obj);
    if (proto && (getAll || proto !== ObjectPrototype)) {
      return getObjectProps(proto, props, getSymbols, getAll);
    }
  }
  return props;
}

function getObjectPropsFactory(getSymbols, getAll) {
  return function (obj, props) {
    return getObjectProps(obj, props, getSymbols, getAll).reduce(isUniqueReducer, []);
  }
}

module.exports.getAllProps = getObjectPropsFactory(false, true);
module.exports.getAllPropsAndSymbols = getObjectPropsFactory(true, true);
module.exports.getOwnProps = getObjectPropsFactory(false, false);
module.exports.getOwnPropsAndSymbols = getObjectPropsFactory(true, false);
