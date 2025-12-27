const express = require('express');
const connectDB = require('./configuration/connectdb');
const User = require('./models/userSchema');
const cors = require('cors');
const app = express();
const port = 5000;


connectDB();

app.use(cors());
app.use(express.json());

// Create a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

