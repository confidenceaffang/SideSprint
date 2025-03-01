import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './mongoDB/db.js';
import JobRoutes from "./Routes/JobRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: "50mb" }));// Configure express to parse JSON requests


// API routes
app.use("/api/postJob", JobRoutes);

// Connect to MongoDB
connectDB(process.env.MONGODB_URL);

// Default route
app.get('/', (req, res) => {
    res.send('Server is running.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
