import express from 'express';
const router = express.Router();

// Import user controllers
import {register, login} from '../Controllers/Auth.js';

// User routes
router.post('/register', register);
router.post('/login', login);
// router.get('/me', getCurrentUser);
// router.put('/me', updateCurrentUser);
// router.delete('/me', deleteCurrentUser);

export default router;
