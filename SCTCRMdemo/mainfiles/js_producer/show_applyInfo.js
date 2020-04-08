var Web3 = require('web3');
var fs = require('fs')
const readline = require('readline-sync')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("../files_producer/Producer_sol_Producer.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 
 
console.log("The total number of identity applicant: ");

var numofApplys=instance.numofApplys.call().toString();

console.log(numofApplys);

console.log("The addresses are：");

var addresses = [];

for(var i = 0; i < numofApplys ; i++){
    addresses[i]=instance.applyAccts(i);
    console.log(addresses[i]);
}


let input = readline.question("Please input the address to check the applicant's information:");
if(web3.isAddress(input)){
    console.log(instance.applyinfos.call(input));
}
else
console.log("The input address is invalid!");
  


