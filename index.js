require("express-async-errors");
const error = require("./middleware/error");
const express = require("express");
const mongoose = require("mongoose");
const account = require("./routes/account");
const app = express();

mongoose
.connect("mongodb://localhost/account", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => console.log("Connected to mongoDB ...."))
.catch((err) => console.error("Error connecting to mongoDB", err));

app.use(express.json());
app.use("/api/account", account);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port : ${port}....`));
