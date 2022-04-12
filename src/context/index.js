import { createContext } from "react";
import { io } from "socket.io-client";
import * as constants from "../constants";
export const socket = io(`${constants.SERVER_URL}`);
export const SocketContext = createContext();
