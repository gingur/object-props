'use strict';
var expect = require('chai').expect;
var objectProps = require('../');
var noop = function () {
  // No Operation
};

describe('object-props', function () {

  function inherits(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : subClass.__proto__ = superClass;
  }

  describe('exports', function () {

    it('getAllProps', function () {
      expect(objectProps.getAllProps).to.be.an('function');
    });

    it('getAllPropsAndSymbols', function () {
      expect(objectProps.getAllPropsAndSymbols).to.be.an('function');
    });

    it('getOwnProps', function () {
      expect(objectProps.getOwnProps).to.be.an('function');
    });

    it('getOwnPropsAndSymbols', function () {
      expect(objectProps.getOwnPropsAndSymbols).to.be.an('function');
    });

  });

  describe('getAllProps', function () {

    var sut = objectProps.getAllProps;

    it('returns an empty array by default', function () {
      var result = sut();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });

    it('returns an passed array by default', function () {
      var expected = [1, 2, 3];
      var result = sut(void 0, expected);
      expect(result).to.be.an('array');
      expect(result).to.eql(expected);
    });

    it('returns an array for Object', function () {
      var subject = {};
      var result = sut(subject);
      var expected = Object.getOwnPropertyNames(subject).concat(Object.getOwnPropertySymbols(subject));
      expect(result).to.be.an('array');
      expect(result).to.include.members(expected);
    });

    it('returns an array for Array', function () {
      var subject = [];
      var result = sut(subject);
      var expected = Object.getOwnPropertyNames(subject).concat(Object.getOwnPropertySymbols(subject));
      expect(result).to.be.an('array');
      expect(result).to.include.members(expected);
    });

    it('returns all statics', function () {
      function A() {

      }

      A.a = null;

      function B() {
        A.apply(this, arguments);
      }

      B.b = null;

      inherits(B, A);

      var result = sut(B);
      expect(result).to.be.an('array');
      expect(result).to.include.members(['a', 'b']);
    });

    it('skips symbols', function () {
      var a = Symbol();
      var b = Symbol();

      function A() {

      }

      A[a] = null;

      function B() {
        A.apply(this, arguments);
      }

      B[b] = null;

      inherits(B, A);

      var result = sut(B);
      expect(result).to.be.an('array');
      expect(result).to.not.include.members([a, b]);
    });

  });

  describe('getAllPropsAndSymbols', function () {

    var sut = objectProps.getAllPropsAndSymbols;

    it('returns an empty array by default', function () {
      var result = sut();
      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });

    it('returns an passed array by default', function () {
      var expected = [1, 2, 3];
      var result = sut(void 0, expected);
      expect(result).to.be.an('array');
      expect(result).to.eql(expected);
    });

    it('returns an array for Object', function () {
      var subject = {};
      var result = sut(subject);
      var expected = Object.getOwnPropertyNames(subject).concat(Object.getOwnPropertySymbols(subject));
      expect(result).to.be.an('array');
      expect(result).to.include.members(expected);
    });

    it('returns an array for Array', function () {
      var subject = [];
      var result = sut(subject);
      var expected = Object.getOwnPropertyNames(subject).concat(Object.getOwnPropertySymbols(subject));
      expect(result).to.be.an('array');
      expect(result).to.include.members(expected);
    });

    it('returns all statics', function () {
      function A() {

      }

      A.a = null;

      function B() {
        A.apply(this, arguments);
      }

      B.b = null;

      inherits(B, A);

      var result = sut(B);
      expect(result).to.be.an('array');
      expect(result).to.include.members(['a', 'b']);
    });

    it('returns all symbols', function () {
      var a = Symbol();
      var b = Symbol();

      function A() {

      }

      A[a] = null;

      function B() {
        A.apply(this, arguments);
      }

      B[b] = null;

      inherits(B, A);

      var result = sut(B);
      expect(result).to.be.an('array');
      expect(result).to.include.members([a, b]);
    });

  });

});