const config = require('./config.json');// подключение конфига через require
const mysql = require('mysql');
// const data = require('../src/app/service/data.service.spec.ts') экспорт обьекта data из файла

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
        1:"Я сделал",
        2:"этот код",
        3:"работающим",
        4:""
    } ,
    hash:{
        1: "1234567123"
    }
}
// определяем обработчик для маршрута "/"
// server.js
const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
app.get("/", function(request, response){

    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});

app.get("/data", function(request, response){

    //функция которая записывает данные в бd
    const data = require('./Modules/exportdb.js')
    data(obj,cp)
    response.send("Данные успешно записались")
});

// server.js
const port = 8000;
require('./app/routes')(app, {});
app.listen(port, () => {
    console.log('We are live on ' + port);
});



// dotenv.config();
//
// // config passport and connect to DB
// require('./config/passport')(passport);
//
// // set up express
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(fileUpload());
//
//
// // config passport
// app.use(session({
//     secret: config.sessionSecret,
//     resave: true,
//     saveUninitialized: false
// } ));
// // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash());
// app.use(function(err, req, res, next) {
//     if (err) {
//         req.logout();
//         next();
//     } else {
//         next();
//     }
// });


// var http = require('http');
// // Create server
// http = http.createServer();
//
//
// http.listen(config.port, function(){
//     console.log('Server listening on port ' + config.port);
// });



