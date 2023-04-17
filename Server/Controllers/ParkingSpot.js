import ParkingSpot from '../Models/ParkingSpot.js';

export const getAllParkingSpots = async (req, res) => {
    try {
        const parkingSpots = await ParkingSpot.find();

        res.status(200).json(parkingSpots);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getParkingSpotById = async (req, res) => {
    try {
        const parkingSpot = await ParkingSpot.findById(req.params.id);

        if (!parkingSpot) {
            return res.status(404).json({ message: 'Parking spot not found' });
        }

        res.status(200).json(parkingSpot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createParkingSpot = async (req, res) => {
    try {
        const { spotNumber } = req.body;

        const spot = new ParkingSpot({
            spotNumber
        });

        await spot.save();

        res.status(201).json({ message: 'Parking Spot created' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// export const bookParkingSpot = async (req, res) => {
//     try {
//         const { spotNumber, bookingDate, bookingTime, carName, carNumber } =
//             req.body;

//         // Find parking spot by spot number
//         const parkingSpot = await ParkingSpot.findOne({ spotNumber });

//         // Check if parking spot exists
//         if (!parkingSpot) {
//             return res.status(404).json({ message: 'Parking spot not found' });
//         }

//         // Check if parking spot is available
//         if (!parkingSpot.isAvailable) {
//             return res.status(400).json({ message: 'Parking spot not available' });
//         }

//         // Update parking spot to mark as booked
//         parkingSpot.isAvailable = false;
//         await parkingSpot.save();

//         // Create new booking
//         const booking = new Booking({
//             userId,
//             parkingSpotId: parkingSpot._id,
//             bookingDate,
//             bookingTime,
//             carName,
//             carNumber
//         });

//         await booking.save();

//         res.status(200).json({ message: 'Spot booked successfully', booking });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };
