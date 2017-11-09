// const mongoose = require('mongoose');

// // import environmental variables from our variables.env file
// require('dotenv').config({ path: 'variables.env' });

// // Connect to our Database and handle an bad connections
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
// mongoose.connection.on('error', (err) => {
//   console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });

const mongoose = require('./db/mongoose');


// READY?! Let's go!


// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 5555);
const server = app.listen(app.get('port'), () => {
  console.log(`Todo api is running → PORT ${server.address().port}`);
});