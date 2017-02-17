## object-props
[![Build Status](https://travis-ci.org/gingur/object-props.svg?branch=master)](https://travis-ci.org/gingur/object-props) [![Coverage Status](https://coveralls.io/repos/github/gingur/object-props/badge.svg?branch=master)](https://coveralls.io/github/gingur/object-props?branch=master) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/gingur/object-props/master/LICENSE)

[![NPM](https://nodei.co/npm/object-props.png?compact=true)](https://nodei.co/npm/object-props/)


* [getAllProps](#getallprops)
* [getAllPropsAndSymbols](#getallpropsandsymbols)
* [getOwnProps](#getownprops)
* [getOwnPropsAndSymbols](#getownpropsandsymbols)

### Why
The example below exports a class `Example`.  The class has several static properties, defined on multiple levels of the [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) but they're unfortunately not enummarable.

```javascript
const symbol1 = Symbol('test1');
const symbol2 = Symbol('test2');

class Base {
  static test1 = '...';
  static test2() {
    // ...
  }
}
Base[symbol1] = '...'

class Example extends Base {
  static test3 = '...';
  static test4() {
    // ...
  }
}
Example[symbol2] = '...'
```

Thankfully [`Object.getOwnPropertyNames`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) and [`Object.getOwnPropertySymbols`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) is able to list these properties however it does not support recursive operations.

```javascript
Object.getOwnPropertyNames(Example); // 5 Array ["length", "name", "prototype", "test4", "test3"]

Object.getOwnPropertySymbols(Example); // 1 Array [Symbol(test2)]
```

Hence, `object-props` was created to simply get *ALL* or *OWN* (explicitly defined and not inherited from the `Object.prototype`)

### getAllProps
Returns an `Array` of names for the object and all its inherited properties.

```javascript
const { getAllProps } from 'object-props';

getAllProps(Example); // 24 Array ["test4", "test3", "test2", "test1", ...all]
```

### getAllPropsAndSymbols
Returns an `Array` of names and `Symbols` for the object and all its inherited properties.

```javascript
const { getAllPropsAndSymbols } from 'object-props';

getAllPropsAndSymbols(Example); // 27 Array ["test4", "test3", Symbol(test2), "test2", "test1", Symbol(test1), ...all]
```

### getOwnProps
Returns an `Array` of names for the object and its inherited properties excluding `Object` prototype.

```javascript
const { getOwnProps } from 'object-props';

getOwnProps(Example); // 7 Array ["length", "name", "prototype", "test4", "test3", "test2", "test1"]
```

### getOwnPropsAndSymbols
Returns an `Array` of names and `Symbols` for the object and all its inherited properties excluding `Object` prototype.
```javascript
const { getOwnPropsAndSymbols } from 'object-props';

getOwnPropsAndSymbols(Example); // 9 Array ["length", "name", "prototype", "test4", "test3", Symbol(test2), "test2", "test1", Symbol(test1)]
```
