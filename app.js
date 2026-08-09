const obj = require('./sum.js');
require('./xyz.js');

// console.log("obj", obj);
var a = 10;

var b = 20;

var x = obj.calculateSum(a,b);

console.log(x);