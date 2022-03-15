import bodyParser from "body-parser";
import express from "express";
import configRoute from "./route";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB";
import passport from "passport";
import cookieSession from "cookie-session";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import socketIO from "./socket";
dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
});
const port = process.env.PORT || 5000;

socketIO(io);

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
app.use(express.static(path.join(__dirname, "/public")));
// Config route
configRoute(app);

// Connect database
connectDB();

// App listening
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
