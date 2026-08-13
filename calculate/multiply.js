function multiply(a, b){
    return a*b;
}

var x = multiply(10,20);
console.log("Multiplication Result", x);

// module.exports = {
//     multiply: multiply
// }

module.exports.x = x;
module.exports.multiply = multiply; 