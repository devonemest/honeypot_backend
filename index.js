const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306',
    user     : 'root',
    password : 'root',
    database : 'top-secret',
});

connection.connect();

var obj = {
    geo:{
        1: "123214124",
        2: "12342142144"
    } ,
    text:{
        1:"Я сделал",
        2:"этот код",
        3:"в 2 часа ночи"
    } ,
    hash:{
        1: "0"
    }
}
var text = "egor best"
var time = new Date();
var name = "Egor"
console.log(Object.keys(obj.text).length)

var text = "Я плотно покушал код запуска ракет 322"
try{
    for(var i=0; i <= Object.keys(obj.text).length; i++){
        text = obj.text[i]
        connection.query(`INSERT INTO text VALUES('${name}','${time}','${text}');`, function(err, rows, fields) {
            if (err) throw err;
        });
    }



}catch (e) {
    console.log(e)
}



