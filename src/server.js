import bodyParser from "body-parser";
import express from "express";
import configRoute from "./route";
import viewEngine from "./config/viewEngine";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
dotenv.config();

let app = express();
let port = process.env.PORT || 5000;

// Config engine
viewEngine(app);

//Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config route
configRoute(app);

// Connect database
connectDB();

// App listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
