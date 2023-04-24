//This module is the entry point into the application
const express = require('express');
const app = express();
const port = process.env.PORT || 5001; //Sets the port

//Sets up a basic CORS protocol
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-COntrol-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//Binds application-level middleware to an instance of the app object
app.use((req, res, next) =>{
  res.send('Welcome to Express');
});

//Logs a simple message to the console when the server starts
app.listen(port, () =>{
  console.log(`Server is running on port ${port}`);
});