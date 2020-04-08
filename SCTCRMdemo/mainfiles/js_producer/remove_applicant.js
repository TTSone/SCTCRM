var Web3 = require('web3');
var fs = require('fs');
const readline = require('readline-sync')
 
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("./files_producer/Producer_sol_Producer.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 

let input = readline.question("Please input the address of the applicant's information you want to delete:");
if(web3.isAddress(input)){
    console.log(instance.removeApplicant.sendTransaction(input,{from : web3.eth.accounts[0], gas:800000000}));  // 调用合约中的addFunc方法。
    console.log("Delete successful.");
}
else
console.log("The input address is invalid!");