const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",  
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  }
});

app.use(cors());
app.use(express.json());

const messages = [];

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.emit('initial messages', messages);

  socket.on('new message', (message) => {
    const newMessage = {
      id: uuidv4(),
      sender: message.sender,
      content: message.content,
      timestamp: new Date().toISOString(),
    };

    messages.push(newMessage);

    io.emit('new message', newMessage);
    console.log('New message received and broadcasted:', newMessage);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

io.on("connect_error", (err) => {
  console.log(`Connection error: ${err.message}`);
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
