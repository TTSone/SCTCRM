var Web3 = require('web3');  
var fs = require('fs');    

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));  
 
 
var abi = JSON.parse(fs.readFileSync("../files_content/Content_sol_content.abi")); 
var bytecode = fs.readFileSync("../files_content/Content_sol_content.bin");  
var bytecode="0x"+bytecode;


var contract = web3.eth.contract(abi);  
 
// deploy the contract
contract.new({data:bytecode, from : web3.eth.accounts[0], gas:800000000}, 
	function(error, result)	{  
		if (!error){
			console.log("address:"+result.address); 
			var address=result.address;
			var params = {
				"contractName":"Content",
				"address":address,
				"abi":abi
			}
			var str = JSON.stringify(params);
				fs.writeFile('../../genesis/Producer/Content/Content.json',str,function(err){
					if(err){
						console.error(err);
					}
					console.log('----------Create Json File-------------');
				})
		}else {
			console.log(error);
		}
	});