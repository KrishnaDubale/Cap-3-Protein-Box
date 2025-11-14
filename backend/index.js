// Main entry point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();



app.use(cors({
    origin:'https://cap-3-evara.vercel.app' || 'http://localhost:5174',
    credentials: true
  }));


app.use(cors({
    origin:'https://cap-3-evara.vercel.app' || 'http://localhost:5174',
    credentials: true
  }));


app.use(express.json());


app.use('/', routes);


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
