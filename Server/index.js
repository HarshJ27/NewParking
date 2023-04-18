import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {config} from "dotenv";

const app = express();
config();

// Import routes
import AuthRoutes from './Routes/AuthRoutes.js';
import ParkingSpotRoutes from './Routes/ParkingSpotRoutes.js';
import BookingRoutes from './Routes/BookingRoutes.js';

// Connect to MongoDB
const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            console.log(err);
        });
};

app.use(express.json());
app.use(cors())

// Use routes
app.use('/api/users', AuthRoutes);
app.use('/api/parking-spots', ParkingSpotRoutes);
app.use('/api/bookings', BookingRoutes);

// Start the server
app.listen(process.env.PORT || 8001, () => {
    connect();
    console.log("Connected to Server");
});
