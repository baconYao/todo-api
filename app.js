const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

// const errorHandlers = require('./handlers/errorHandlers');

// 建立express app
const app = express();



// 使用cookie parser & body parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// 所有的url都會經過routes middleware
app.use('/', routes);


// If that above routes didnt work, we 404 them and forward to error handler
// app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
// app.use(errorHandlers.flashValidationErrors);

// // Otherwise this was a really bad error we didn't expect! Shoot eh
// if (app.get('env') === 'development') {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

// production error handler
// app.use(errorHandlers.productionErrors);

module.exports = app;
