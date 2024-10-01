const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: "PUSHER_APP_ID", 
  key: "PUSHER_KEY", 
  secret: "PUSHER_SECRET", 
  cluster: "PUSHER_CLUSTER", 
  useTLS: true,
});

const messages = [];

app.post('/messages', (req, res) => {
  const newMessage = {
    id: uuidv4(),
    sender: req.body.sender,
    content: req.body.content,
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);
  pusher.trigger('chat-channel', 'new-message', newMessage);
  res.status(200).json(newMessage);
});

app.get('/messages', (req, res) => {
  res.status(200).json(messages);
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
