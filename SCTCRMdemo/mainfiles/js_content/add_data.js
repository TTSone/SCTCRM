var Web3 = require('web3');
var fs = require('fs')
const readline = require('readline-sync')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("../files_content/Content_sol_Content.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 

console.log("Please enter the following information:");

let contentName = readline.question("The name of content:");
while(contentName=""){
    console.log("The name of content cannot be empty!");
    contentName=readline.question("The name of content:");
}

let contentDigest = readline.question("The digest of content:");
while(contentDigest=""){
    console.log("The digest of content cannot be empty!");
    contentDigest=readline.question("The digest of content:");
}

let contentExp = readline.question("The expiry data of content:");
while(contentExp=""){
    console.log("TThe expiry data of content cannot be empty!");
    contentExp=readline.question("The expiry data of content:");
}

console.log(instance.addData.sendTransaction(contentName,contentDigest,contentExp,{from : web3.eth.accounts[0], gas:800000000})); 

console.log("Content information added successful!");
 
