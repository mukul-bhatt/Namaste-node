const obj = require('./calculate/sum.js');
const {multiply} = require('./calculate');
require('./xyz.js');

// console.log("obj", obj);
a = 10;

var b = 20;

var x = obj.calculateSum(a,b);

var multiplicationResult = multiply(a,b);

console.log(x);
console.log(multiplicationResult);