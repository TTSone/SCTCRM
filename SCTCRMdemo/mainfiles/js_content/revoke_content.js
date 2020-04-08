var Web3 = require('web3');
var fs = require('fs')
const readline = require('readline-sync')
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
 
var abi = JSON.parse(fs.readFileSync("../files_content/Content_sol_Content.abi"));
 
var address = ''; 
 
var contract = web3.eth.contract(abi);
 
var instance = contract.at(address); 
 
console.log("Are you sure you want to revoke the content? Y(y) / N(n)");

let input = readline.question("Please input the address to check the content information:");
if(input=="Y" || input=="y"){
    console.log(instance.revokeData.sendTransaction({from : web3.eth.accounts[0], gas:800000000}));  
    console.log("Revoke successful.")
}
else
console.log("exit");
