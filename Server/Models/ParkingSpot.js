import mongoose from 'mongoose';

const parkingSpotSchema = new mongoose.Schema({
    spotNumber: {
        type: String,
        required: true,
        unique: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('ParkingSpot', parkingSpotSchema);
