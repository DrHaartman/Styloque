const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/postSchema');
const jwt = require('jsonwebtoken');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');


// Create a new post. C
router.post('/post', uploadMiddleware.single('files'), async (req, res) => {
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


// Edit a post. U
router.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
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

//get all posts. R
router.get('/post', async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({createdAt: -1}).limit(20);
  res.json(posts);
});


//get single post. R
router.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id).populate('author', ['username']);
  res.json(post);
});



module.exports = router;