import express from 'express';
const router = express.Router();

// Import parking spot controllers
import {getAllParkingSpots, getParkingSpotById, createParkingSpot} from '../Controllers/ParkingSpot.js';

// Parking spot routes
router.get('/', getAllParkingSpots);
router.get('/:id', getParkingSpotById);
router.post('/register-spot', createParkingSpot);
// router.put('/:id', updateParkingSpotById);
// router.delete('/:id', deleteParkingSpotById);

export default router;
