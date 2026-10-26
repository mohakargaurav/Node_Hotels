const { isArguments } = require('lodash');
const notes = require('./notes.js');

var age = notes.age;

var result = notes.addNumber(age+18, 12);

console.log(age)
console.log('result is now '+result);