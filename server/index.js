import http from "http";
import express from "express";
import { Server } from "colyseus";
import { MyRoom } from "./myRoom.js";

const app = express();
const server = http.createServer(app);
const gameServer = new Server({ server });

gameServer.define("game_room", MyRoom);

gameServer.listen(2567);
console.log("Colyseus server running on ws://localhost:2567");