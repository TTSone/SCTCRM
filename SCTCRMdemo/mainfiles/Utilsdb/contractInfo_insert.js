var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '19960322',
  database : 'sctcrm'
});
 
connection.connect();

var  addSql = 'INSERT INTO contractInfo(uniName,contractName,address,abi) VALUES(?,?,?,?)';
var  addSqlParams = ['/','','',''];
//增
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});
 
/*connection.query('select * from contractInfo', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});*/

connection.end();
