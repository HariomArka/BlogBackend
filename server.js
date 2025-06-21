require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const blogroute = require('./routes/Blogs');
const authroute = require('./routes/auth');
const mailRoutes = require('./routes/mail');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());

// CORS config for deployment (update origin)
app.use(cors({
  origin: "https://your-frontend.vercel.app", // Replace with your frontend domain
  credentials: true
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use('/api/blogs', blogroute);
app.use('/api/auth', authroute);
app.use('/api', mailRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONG_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
