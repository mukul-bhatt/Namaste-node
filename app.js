const fs = require("fs");

var a = 109302242;
var b = 342424;

fetch("https://example.com")
    .then(()=>console.log("Fetch call succeded"))
    .catch((err)=>console.log("Fetch failed", err))

setTimeout(() => console.log("set Timeout executed"), 3000);

fs.readFile('file.txt', 'utf8', (err, name) => {
    console.log("data", err);
})

var result = a*b;
console.log(result);