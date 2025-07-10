// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// In-memory store for active rooms
let activeRooms = new Map();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend

// ➕ Add a room
app.post('/api/rooms', (req, res) => {
  const { roomID } = req.body;
  if (!roomID) return res.status(400).json({ error: 'roomID is required' });
  activeRooms.set(roomID, Date.now());
  res.status(200).json({ message: 'Room added' });
});

// ➖ Remove a room
app.delete('/api/rooms/:roomID', (req, res) => {
  const { roomID } = req.params;
  activeRooms.delete(roomID);
  res.status(200).json({ message: 'Room removed' });
});

// 📡 Get all active rooms
app.get('/api/rooms', (req, res) => {
  const rooms = Array.from(activeRooms.keys());
  res.json({ activeRooms: rooms });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
