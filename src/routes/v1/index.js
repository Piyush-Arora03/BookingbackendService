const express = require('express');
const router = express.Router();
const BookingController = require('../../controllers/BookingController');

router.post('/bookings', BookingController.create);
router.delete('/bookings/:id', BookingController.cancel);

module.exports = router