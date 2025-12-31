const express = require('express');
const connectDB = require('./configuration/connectdb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
exports.uploadMiddleware = uploadMiddleware;
const path = require('path');
require('dotenv').config();
const app = express();
exports.app = app;
const port = 5000;



// Connecting to database
connectDB();

// middlewares
app.use(cors({
  credentials: true, 
  origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Routes
app.use("/api/users", require('./Routes/userRoutes'));
app.use("/api/posts", require('./Routes/postRoutes'));



// Home route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

