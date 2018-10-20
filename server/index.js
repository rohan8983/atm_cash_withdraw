const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ports = require("./config/keys");
//routes
const cards = require("./routes/api/cards");

//connect to mongoDB
mongoose
  .connect(
    ports.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.error(err));

//Routes
app.use("/api/cards", cards);

app.listen(ports.port, () =>
  console.log(`server is running on port ${ports.port}...`)
);
