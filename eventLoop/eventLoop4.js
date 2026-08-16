const fs = require("fs");

setImmediate(()=>console.log("Set immediate executed"));

setTimeout(()=>{
    console.log("Timer expired");
}, 0);

Promise.resolve("Promise").then(console.log);

fs.readFile("../file.txt", "utf8", (err, data) => {
    console.log("File Reading Cb");
});

process.nextTick(() => {
    process.nextTick(() => console.log("inner nextTick"))
    console.log("process.nextTick");
})

console.log("Last line of this code executed");

/*
Last line of this code executed
process.nextTick
process.inner nextTick
Promise
Timer expired
Set immediate executed
File Reading Cb
*/
