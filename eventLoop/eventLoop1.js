const fs = require("fs");

const a = 100;

setImmediate(()=>console.log("Set immediate executed"));


fs.readFile("../file.txt", "utf8", (err, data) => {
    console.log("File Reading Cb");
});

setTimeout(()=>{
    console.log("Timer expired");
}, 0);

function printA(){
    console.log("a = ", a);
}

printA();

console.log("Last line of this code executed");

/*
a = 100;
Last line of this code executed
Timer expired
Set immediate executed
File Reading Cb
*/




