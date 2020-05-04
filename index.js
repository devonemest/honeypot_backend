const mysql      = require('mysql');
var moment = require('moment');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     :  '3306',
    user     : 'root',
    password : 'root',
    database : 'mydb',
});

connection.connect();

var obj = {
    geo:{
        1: "1.232141241234567890",
        2: "12.34214214412345689"
    } ,
    text:{
        1:"Я сделал",
        2:"этот код",
        3:"в 2 часа ночи",
        4:"Оно",
        5:"работает",
        6:"я удивлен"
    } ,
    hash:{
        1: "1234536755431234253"
    }
}
var text = ``
// var time =moment().format();
// var anyString = 'Mozilla';
// time = time.substring(0,19);
// console.log(Object.keys(obj.text).length) количество ключей в обьекте
try{

    for(var i=1; i <= Object.keys(obj.text).length ; i++){
        // console.log(i)
        // console.log(obj.text[i])
        text +=obj.text[i] + " "
    }
    var hash = obj.hash[1]
    var geo1 =obj.geo[1]
    var geo2 =obj.geo[2]
    connection.query(`INSERT INTO data VALUES(${hash},${geo1},${geo2},'${text}');`, function(err, rows, fields) {
        if (err) throw err;
    });
}catch (e) {
    console.log(e)
}



