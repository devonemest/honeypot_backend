const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306',
    user     : 'root',
    password : 'root',
    database : 'top-secret',
});

connection.connect();


var time = new Date();
var name = "Ivan"
var text = "Я плотно покушал код запуска ракет 322"
try{
    connection.query(`INSERT INTO text VALUES('${name}','${time}','${text}');`, function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
    });
}catch (e) {
    alert(e)
    alert("sosi")
}



