const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "demo1.sol");
const source = fs.readFileSync(contractPath, "utf8");
let compileOutput = solc.compile(source, 1)
console.log(compileOutput)