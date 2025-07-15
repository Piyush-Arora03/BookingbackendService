const express=require('express');
const router=express.Router();
const BookingController=require('../../controllers/BookingController');

router.post('/bookings',BookingController.create);

module.exports=router