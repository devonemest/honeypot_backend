const config         = require('./app/config/config.json');// подключение конфига через require
const mysql          = require('mysql');
const express        = require('express');
const app            = express();
// создаем парсер для данных в формате json
const jsonParser = express.json();

// настройка CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});
//подключение к бд
const cp = mysql.createConnection({
    host     : config.ipdb,
    port     : config.portdb,
    user     : config.user,
    password : config.pasdb,
    database : config.db,
});
cp.connect();


// var obj = {
//     geo:{
//         1: "12.3214124",
//         2: "12.342142144"
//     } ,
//     text:{
//         1:"Примите",
//         2:"Пожалуйсто",
//         3:"курсовую",
//         4:"Спасите"
//     } ,
//     hash:{
//         1: "1234567123"
//     },
//     fcmid:{
//         1:"12345"
//     },
//     yid:{
//         1:"1234234"
//     }
// }

app.post("/data", function (request, response) {
    const exportdb = require('./app/Modules/exportdb.js')
    // если не переданы данные, возвращаем ошибку
    if(!request.data) return response.send(400);

    // получаем данные
    //функция которая записывает данные в бd
    const data = request.data
    exportdb(data,cp)
    console.log(request.data)
    // имитируем некоторую обработку данных, например, изменим значение userage


    // отправка данных обратно клиенту
    response.send("Данные полученны");
});





 // server.js

const port = 8000;
app.listen(port, () => {
    console.log('We are live on ' + port);
});


