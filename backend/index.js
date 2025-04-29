const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth/authRoutes');

const app = express();
const Port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Hook API routes
app.use('/api/auth', authRoutes);

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`);
});
