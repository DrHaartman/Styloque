const express = require('express');
const connectDB = require('./configuration/connectdb');
const User = require('./models/userSchema');
const Post = require('./models/postSchema');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 5000;


const salt = bcrypt.genSaltSync(10);

connectDB();

app.use(cors({
  credentials: true, 
  origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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

// User logout
app.post('/logout', (req, res) => {
  res.cookie('token', '', { expires: new Date(0), httpOnly: true , secure: false , sameSite: 'lax' , path: '/' }).json({ message: 'Logout successful' });
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

// Create a new post
app.post('/post', uploadMiddleware.single('files'), async (req, res) => {
  const {originalname, path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

const token = req.cookies.token;
jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  const {title, summary, content} = req.body;
  const postDoc = await Post.create({
    author: info.id,
    title,
    summary,
    content,
    coverImagePath: newPath
  });
  postDoc.save();
  res.json({postDoc});
});
});


// Edit a post
app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if(req.file){
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }
const {token} = req.cookies;
jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  const {title, summary, content} = req.body;
  const postDoc = await Post.findById(req.params.id);
  if (newPath) {
    postDoc.coverImagePath = newPath;
  }
  postDoc.title = title;
  postDoc.summary = summary;
  postDoc.content = content;
  await postDoc.save();
  res.json({postDoc});
});
});


//get all posts
app.get('/post', async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({createdAt: -1}).limit(20);
  res.json(posts);
});


//get single post
app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id).populate('author', ['username']);
  res.json(post);
});


// Home route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

