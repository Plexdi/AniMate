// index.js (your main server file)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const listRoutes = require('./routes/listRoutes')

const app = express();
const Port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API mounts
app.use('/api/auth', authRoutes);
app.use('/api/list', listRoutes);


app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
