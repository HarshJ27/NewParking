import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    parkingSpotId: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSpot',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    bookingTime: {
        type: Date,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    carName: {
        type: String,
        required: true
    },
    carNumber: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
