var Web3 = require('web3');
var fs = require('fs')
const readline = require('readline-sync')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("../files_producer/Content_sol_Content.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 

console.log("Please enter the following information to request for content digest:");

let IDSCAddr = readline.question("The address of the identity smart contract:");
while(web3.isAddress(IDSCAddr)){
    console.log("The address of the identity smart contract is invalid!");
    IDSCAddr=readline.question("The address of the identity smart contract:");
}

let consumerAddr = readline.question("Your EOA address:");
while(web3.isAddress(consumerAddr)==false){
    console.log("Your EOA is invalid!");
    consumerAddr=readline.question("Your EOA address:");
}

let consumerPk = readline.question("Your EOA address:");
while(consumerPk=""){
    console.log("The EOA address cannot be empty!");
    address=readline.question("Your EOA address:");
}

console.log(instance.digestRequest.sendTransaction(IDSCAddr,consumerAddr,consumerPk,{from : web3.eth.accounts[0], gas:800000000})); 

console.log("Request sent!");
 
