import bodyParser from "body-parser";
import express from "express";
import configRoute from "./route";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB";
import passport from "passport";
import cookieSession from "cookie-session";
dotenv.config();

let app = express();
let port = process.env.PORT || 5000;

//Config app
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["duyphan"],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// Config route
configRoute(app);

// Connect database
connectDB();

// App listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
