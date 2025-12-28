const express = require('express');
const connectDB = require('./configuration/connectdb');
const User = require('./models/userSchema');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
const port = 5000;


const salt = bcrypt.genSaltSync(10);

connectDB();

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

// Create a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ 
      username, 
      password: bcrypt.hashSync( password, salt ) }); // Hashing the password
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    } else {
      // Generate a JWT token
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Error generating token' });
        }
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure : false }).json({ message: 'Login successful'});
      });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User logout
app.post('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: 'lax', secure : false }).json({ message: 'Logout successful' });
});


// User profile route (protected)
app.get('/profile', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
 }
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json(info);
  });
});
  

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

