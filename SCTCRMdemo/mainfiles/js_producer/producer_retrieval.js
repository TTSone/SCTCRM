let  fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var mysql = require('mysql');
const readline = require('readline-sync');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '19960322',
    database : 'sctcrm'
  });
   
let searchname = readline.question("Please input the name prefix of producer:");

//var searchname='/Producer'
var find=searchname.split("/")
find=find[find.length-1]+".json"
//console.log(find);
var flag=false
var path="../../genesis"+searchname

fs.exists(path, function(exists) {
    exists ? searchsc(path) : searchdb(searchname);
  });

function searchsc(searchpath){  
var Dir = fs.readdirSync(searchpath);
var arr=[];
arr=Dir;
//arr.forEach(v => console.log(v));
for(i=0;i<arr.length;i++){
    if(arr[i]==find){
        flag=true;
        break;
    }
}
if(flag==true){
console.log("Producer retrieval is successful!");
console.log("The identity information of producer as follows:");
}

fs.readFile(path+"/"+find,'utf8',function (err, data) {
    if(err) console.log(err);
    var test1=JSON.parse(data);
    //console.log(test1['contractName'])
    //console.log(test1['address'])
    //console.log(test1['abi'])
    var abi=s = JSON.parse(test1['abi']);
   var contract = web3.eth.contract(abi);
   var instance = contract.at(test1['address']);
   console.log(instance.getProducerInfo.call());
    });
}

function searchdb(name){
    connection.connect();
    console.log("Failed to retrieve local file！");
    console.log("Searching database...");
    connection.query("select * from contractInfo where uniName='"+name+"'", function (error, results, fields) {
      if (error) throw error;
      //console.log('results:'+results);
      if(results!=""){
      var dataString = JSON.stringify(results);
      var data = JSON.parse(dataString);
     // console.log(data[0]['contractName']);
    //  console.log(data[0]['address'])
   //   console.log(data[0]['abi'])
      var params = {
        "contractName":data[0]['contractName'],
        "address":data[0]['address'],
        "abi": data[0]['abi']
    }
    
    var str = JSON.stringify(params);
    var inputpath='../genesis'+name;
    if (!fs.existsSync(inputpath)){
        fs.mkdirSync(inputpath);
    }
        fs.writeFile(inputpath+name+'.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('----------Get data from db. Create Json File.-------------');
        })
    }
    else
    console.log('SORRY! There is no producer information matching the name prefix:'+searchname);
    });

    connection.end();
}

