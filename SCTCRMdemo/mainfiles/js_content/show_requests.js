var Web3 = require('web3');
var fs = require('fs')
const readline = require('readline-sync')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("../files_content/Content_sol_Content.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 

 
console.log("The total number of digest request: ");

var numofReqs=instance.numofReqs.call().toString();

console.log(numofReqs);

console.log("The addresses of consumers are：");

var addresses = [];

for(var i = 0; i < numofReqs ; i++){
    addresses[i]=instance.reqAccts(i);
    console.log(addresses[i]);
}

let input = readline.question("Please input the address to check the request information:");
if(web3.isAddress(input)){
    console.log(instance.applyinfos.call(input));
}
else
console.log("The input address is invalid!");
  


