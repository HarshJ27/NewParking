import express from 'express';
const router = express.Router();

// Import booking controllers
import {getAllBookings, getBookingById, createBooking, updateBookingById, deleteBookingById} from '../Controllers/Booking.js';

// Booking routes
router.get('/', getAllBookings);
router.get('/:id', getBookingById);
router.post('/:id', createBooking);
router.put('/:id', updateBookingById);
router.delete('/:id', deleteBookingById);

export default router;
