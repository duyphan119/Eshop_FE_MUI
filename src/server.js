// import bodyParser from "body-parser";
// import express from "express";
// import configRoute from "./route";
// import viewEngine from "./config/viewEngine";
// import dotenv from "dotenv";

// dotenv.config();

// let app = express();
// let port = process.env.PORT || 5000;

// // Config engine
// viewEngine(app);

// //Config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Config route
// configRoute(app);

// // App listening
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const app = express();

app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/v1/update", (req, res) => {
  setTimeout(() => {
    res.status(200).json(req.body);
  }, [2000]);
});

app.listen(8000, () => {
  console.log("Server is running");
});