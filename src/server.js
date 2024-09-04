const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017'; 
const dbName = 'studentApp';

let db;

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(dbName);
});

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await db.collection('students').findOne({ email, password, role });
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});