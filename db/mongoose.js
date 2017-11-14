const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'settings.env' });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, {useMongoClient: true}).then(
  () => { console.log("DB connected success!");},
  err => { console.log("DB connection failed!");}
);
 
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

module.exports = { mongoose };