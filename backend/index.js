// This module is the entry point into the application.
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
// Sets .env.PORT or 4000 as default port
const port = process.env.PORT || 4000; 
const routes = require("./routes/api");

// Configures a simple CORS settings object to allow requests from the frontend.
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET','POST','PATCH','DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type']
};

// Sets up a basic CORS protocol with the provided settings with the help of an npm package.
app.use(cors(corsOptions)); 

app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in a request body.
app.use("/api/users", routes); // Adds accessibility to the routes.


// Connects to the database.
mongoose
  .connect(process.env.ATLAS_URI, {useNewUrlParser: true})
  .then(() => {
    // Listens for requests.
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
