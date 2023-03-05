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

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', (reason) =>
    console.log(`Client disconnected: ${reason}`)
  );

  socket.on('ping', () => socket.emit('pong'));
});

const port = process.env.PORT || 3333;
server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(`Testing shared code: ${core()}`);
});
server.on('error', console.error);
