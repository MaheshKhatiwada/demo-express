const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
const error = require("./middleware/error");
const express = require("express");
const mongoose = require("mongoose");
const account = require("./routes/account");
const app = express();


app.use(express.json());
app.use("/api/account", account);
app.use(error);

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/account',level:'error'}));

mongoose
.connect("mongodb://localhost/account", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log("Connected to mongoDB ...."))
  .catch((err) => console.error("Error connecting to mongoDB", err));




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port : ${port}....`));
