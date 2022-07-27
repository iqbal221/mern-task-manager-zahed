const express = require("express");
const router = require("./src/routes/Api");
const app = new express();
const bodyParser = require("body-parser");

// Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const xss = require("xss-clean");
const hpp = require("hpp");

//Database
const mongoose = require("mongoose");
// app.use(express.static('client/build'))

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

//Body Parser
app.use(bodyParser.json());

//Rate Limiter
const Limiter = rateLimit({ windowMs: 15 * 60 * 100, max: 3000 });
app.use(Limiter);

//Database
const URI =
  "mongodb+srv://zahed:681562@cluster0.t4uwg.mongodb.net/Task_Manager?retryWrites=true&w=majority";
const OPTION = { autoIndex: true };
mongoose.connect(URI, OPTION, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Database connected");
  }
});

//Backend Routing
app.use("/api/v1", router);

// //Frontend Routing
// app.get('*',function(req,res){
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
// })

// undefined route

app.use("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    data: "Not found",
  });
});

module.exports = app;
