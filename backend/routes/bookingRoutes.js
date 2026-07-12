const express = require('express');
const { bookEvent, getMyBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, bookEvent);
router.route('/mybookings').get(protect, getMyBookings);

module.exports = router;
