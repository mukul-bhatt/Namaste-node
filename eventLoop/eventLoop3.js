
const fs = require("fs");

const a = 100;

setImmediate(()=>console.log("Set immediate executed"));

setTimeout(()=>{
    console.log("Timer expired");
}, 0);


Promise.resolve().then(() => console.log("Promise Resolved"));

fs.readFile("../file.txt", "utf8", (err, data) => {

    setTimeout(()=>{
    console.log("2nd Timer");
        }, 0);
    
    process.nextTick(()=> console.log("2nd process.nextTick"));

        setImmediate(()=>console.log("2nd Set immediate"));

    console.log("File Reading Cb");
});

process.nextTick(()=> console.log("process.nextTick"));

function printA(){
    console.log("a = ", a);
}

printA();

console.log("Last line of this code executed");

/*
a =  100
Last line of this code executed
process.nextTick
Promise Resolved
Timer expired
Set immediate executed
File Reading Cb
2nd process.nextTick
2nd Set immediate
2nd Timer
*/