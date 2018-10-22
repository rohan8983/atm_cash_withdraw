const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ports = require("./config/keys");
const bodyParser = require("body-parser");
const cors = require("cors");
//importing routes
const card = require("./routes/api/card");

//connect to mongoDB
mongoose
  .connect(
    ports.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.error(err));

//cors middleware for accepting request
app.use(cors());
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use("/api/card", card);

//server
app.listen(ports.port, () =>
  console.log(`server is running on port ${ports.port}...`)
);
