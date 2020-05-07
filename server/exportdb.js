const mysql = require('mysql');
// const data = require('../src/app/service/data.service.spec.ts') экспорт обьекта data из фай  ла
const config = require('./config.json');// подключение конфига через require
const connection = mysql.createConnection({
    host     : config.ipdb,
    port     : config.portdb,
    user     : config.usrdb,
    password : config.pasdb,
    database : config.db,
});
connection.connect();
var text;


for(var i=1; i <= Object.keys(obj.text).length ; i++){
    text +=data.text[i] + " ";
}
var fcmid = "";
var yid = "";
var hash = data.hash[1];
var geo1 =data.geo[1];
var geo2 =data.geo[2];
connection.query(`INSERT INTO data VALUES(${hash},${fcmid},${yid},${geo1},${geo2},'${text}');`, function(err, rows, fields) {
    if (err) throw err;
});
