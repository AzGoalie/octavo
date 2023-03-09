/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import * as path from 'path';

import { core } from '@octavo/core';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

let clients = 0;
io.on('connection', (socket) => {
  clients++;
  console.log(`Client connected: ${clients} clients`);
  io.emit('clients', clients);

  socket.on('disconnect', (reason) => {
    clients--;
    console.log(`Client disconnected: ${reason}\n${clients} clients`);
    io.emit('clients', clients);
  });

  socket.on('ping', () => socket.emit('pong'));
});

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(`Testing shared code: ${core()}`);
});
server.on('error', console.error);
