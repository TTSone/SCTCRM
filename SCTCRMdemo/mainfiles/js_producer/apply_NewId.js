var Web3 = require('web3');
var fs = require('fs')
const readline = require('readline-sync')

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("../files_producer/Producer_sol_Producer.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 

console.log("Please enter the following identity application information:");

let name = readline.question("The name for identity application:");
while(name=""){
    console.log("The name cannot be empty!");
    name=readline.question("Name:");
}

let NDNpk = readline.question("Your NDN public key:");
while(NDNpk=""){
    console.log("The NDN public key cannot be empty!");
    NDNpk=readline.question("Your NDN public key:");
}

let address = readline.question("Your EOA address:");
while(web3.isAddress(input)==false){
    console.log("The EOA address is invalid!");
    address=readline.question("Your EOA address:");
}

let email = readline.question("Your email:(make sure it is available)");
while(email=""){
    console.log("The email cannot be empty!");
    address=readline.question("Your email:");
}

console.log(instance.applyNewID.sendTransaction(name,NDNpk,email,address,{from : web3.eth.accounts[0], gas:800000000})); 

console.log("Identity application sent!");
 
