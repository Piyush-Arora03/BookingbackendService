const BookingService = require('../services/BookingService');
const bookingService = new BookingService();
const { StatusCodes } = require('http-status-codes');

const create = async (req, res) => {
    try {
        const result = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Booking successful',
            explanation: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            data: {},
            message: error.message,
            explanation: error.explanation,
            success: false
        });
    }
}

module.exports = {
    create
}