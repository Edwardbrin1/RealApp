const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path'); // Add this line

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, '../client'))); // Add this line

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html')); // Modify this line
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message',