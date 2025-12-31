const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);



// Create a new user
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
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
      const token = jwt.sign({ id: user._id.toString(), username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
        if (err) {
          return res.status(500).json({ error: 'Error generating token' });
        }
        res.cookie('token', token, { httpOnly: true , secure: false , sameSite: 'lax' , path: '/' }).json({ id: user._id, username: user.username });
      });
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User profile route (protected)
router.get('/profile', (req, res) => {
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

// User logout
router.post('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true , secure: false , sameSite: 'lax' , path: '/' }).json({ message: 'Logout successful' });
});


module.exports = router;
