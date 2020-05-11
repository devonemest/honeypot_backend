const config         = require('./app/config/config.json');// подключение конфига через require
const mysql          = require('mysql');
const express        = require('express');
const app            = express();

const cp = mysql.createConnection({
    host     : config.ipdb,
    port     : config.portdb,
    user     : config.user,
    password : config.pasdb,
    database : config.db,
});
cp.connect();


var obj = {
    geo:{
        1: "12.3214124",
        2: "12.342142144"
    } ,
    text:{
        1:"Примите",
        2:"Пожалуйсто",
        3:"курсовую",
        4:"Спасите"
    } ,
    hash:{
        1: "1234567123"
    },
    fcmid:{
        1:"12345"
    },
    yid:{
        1:"1234234"
    }
}
app.get("/", function(request, response){
    // отправляем ответ
    response.send("<h2>Это корень Backend!</h2>");
});

app.post("/data", function(request, response){
    //функция которая записывает данные в бd
    const data = require('./Modules/exportdb.js')
    data(obj,cp)
    response.send("Данные успешно записались")
});

// server.js
const port = 8000;
app.listen(port, () => {
    console.log('We are live on ' + port);
});


