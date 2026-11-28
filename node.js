import { WebSocketServer } from 'ws';
import TagServer from './TagServer.js';

const wss = new WebSocketServer({port: 8080});
const tagServer = new TagServer("Node Server");
wss.on("connection", (socket) => tagServer.switchboard.addSocket(socket) );
