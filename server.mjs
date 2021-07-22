import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { switches } from './server/Switches.mjs';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Set static folder
app.use(express.static(path.join('./', 'client')));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// socket.io
io.on('connection', (socket) => {
  console.log('A new client has connected');
  socket.emit('lightSet', switches.getLightState());
  socket.emit('heatSet', switches.getHeaterState());
  socket.emit('fanSet', switches.getFanState());
  socket.emit('humidSet', switches.getHumidState());
  socket.emit('dehumidSet', switches.getDehumidState());

  socket.on('lightSwitch', (newValue) => {
    switches.setLightState(newValue);
    io.emit('lightSet', switches.getLightState());
    console.log('light switched on server, message sent');
  });

  socket.on('heatSwitch', (newValue) => {
    switches.setHeaterState(newValue);
    io.emit('heatSet', switches.getHeaterState());
    console.log('heater switched on server, message sent');
  });

  socket.on('fanSwitch', (newValue) => {
    switches.setFanState(newValue);
    io.emit('fanSet', switches.getFanState());
    console.log('fan switched on server, message sent');
  });

  socket.on('humidSwitch', (newValue) => {
    switches.setHumidState(newValue);
    io.emit('humidSet', switches.getHumidState());
    console.log('humidifier switched on server, message sent');
  });

  socket.on('dehumidSwitch', (newValue) => {
    switches.setDehumidState(newValue);
    io.emit('dehumidSet', switches.getDehumidState());
    console.log('dehumidifier switched on server, message sent');
  });

  socket.on('disconnect', () => {
    console.log('A client has disconnected');
  });
});
