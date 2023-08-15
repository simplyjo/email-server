
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.urlencoded({ extended: false , limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))



const taskRoute = require("./routes/task");
const indexRoute = require("./routes/index");




require("dotenv").config();



var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, PATCH, DELETE, OPTIONS",
  accessAllowOrigin:"*",
}
app.use(cors(corsOptions));

//For Ilenla Routes


app.use("/task", taskRoute);



app.use("/", indexRoute);
app.use(express.static("client/build"));





app.listen(process.env.PORT || 5000);


mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true }, () => {
  console.log("connected");
});

