import Booking from '../Models/Booking.js';
import ParkingSpot from '../Models/ParkingSpot.js';
import User from '../Models/User.js';
import moment from 'moment';
import schedule from 'node-schedule';

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new booking
export const createBooking = async (req, res) => {
    try {
        const { bookingDate, bookingTime, carName, carNumber, duration } = req.body;
        const parkingSpotId = req.params.id; // extract parking spot ID from request params
        console.log(parkingSpotId)

        // Check if parking spot is available
        const parkingSpot = await ParkingSpot.findById(parkingSpotId);
        if (!parkingSpot) {
            return res.status(404).json({ message: 'Parking spot not found' });
        }
        if (!parkingSpot.isAvailable) {
            return res.status(400).json({ message: 'Parking spot is already booked' });
        }

        // Calculate booking end time
        const bookingDuration = duration * 60 * 60 * 1000;
        const bookingStartTime = moment(`${bookingDate}T${bookingTime}`);
        const bookingEndTime = bookingStartTime.add(duration, 'hours');

        // Update parking spot to mark as booked
        parkingSpot.isAvailable = false;
        await parkingSpot.save();

        // const job = schedule.scheduleJob(bookingEndTime.toDate(), async () => {
        //     const parkingSpot = await ParkingSpot.findById(parkingSpotId);
        //     parkingSpot.isAvailable = true;
        //     await parkingSpot.save();
        // });

        // Schedule job to mark parking spot as available after booking duration

        // Create new booking
        const booking = new Booking({
            // userId:req.user.id,
            parkingSpotId,
            bookingDate: bookingStartTime.toDate(),
            bookingTime: bookingStartTime.toDate(),
            duration: bookingEndTime.format('HH:mm:ss'),
            carName,
            carNumber,
        });

        await booking.save();

        setInterval(async () => {
            const now = bookingStartTime;
            if (now >= bookingEndTime) {
                const parkingSpot = await ParkingSpot.findById(parkingSpotId);
                parkingSpot.isAvailable = true;
                await parkingSpot.save();
                clearInterval(this);
            }
        }, 60000);
        

        res.status(201).json( {booking} );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Update booking by ID
export const updateBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const { bookingDate, bookingTime, carName, carNumber } = req.body;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.bookingDate = bookingDate || booking.bookingDate;
        booking.bookingTime = bookingTime || booking.bookingTime;
        booking.carName = carName || booking.carName;
        booking.carNumber = carNumber || booking.carNumber;

        await booking.save();

        res.status(200).json({ booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete booking by ID
export const deleteBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Update parking spot to mark as available
        const parkingSpot = await ParkingSpot.findById(booking.parkingSpotId);
        if (!parkingSpot) {
            return res.status(404).json({ message: 'Parking spot not found' });
        }
        parkingSpot.isAvailable = true;
        await parkingSpot.save();

        await booking.deleteOne({id});

        res.status(200).json({ message: 'Booking deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

