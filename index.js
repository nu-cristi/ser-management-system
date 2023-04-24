//This module is the entry point into the application
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 4001; //Sets 4001 as default port in case the .env.PORT is being used by something else
const routes = require("./routes/api");

app.use(cors()); //Sets up a basic CORS protocol provided by a package
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in a request body
app.use("/", routes);


// Connects to the database
mongoose
  .connect(process.env.ATLAS_URI, {useNewUrlParser: true})
  .then(() => {
    // Listens for requests
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
