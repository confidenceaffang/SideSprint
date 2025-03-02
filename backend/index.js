import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './mongoDB/db.js';
import JobRoutes from "./Routes/JobRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})); // Enable CORS with specific configuration
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: "50mb" }));// Configure express to parse JSON requests

// API routes
app.use("/api/postJob", JobRoutes);
app.use("/api/auth", AuthRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

// Connect to MongoDB
connectDB(process.env.MONGODB_URL);

// Default route
app.get('/', (req, res) => {
    res.send('Server is running.');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
