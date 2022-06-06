var cors = require("cors");

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}

let fn = function (app) {
    app.use(cors(corsOptions));
};

module.exports = fn;
