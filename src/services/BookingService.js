const axios = require('axios');
const BookingRepository = require('../repository/BookingRepository');
const { AppError, ServiceError } = require('../utils/index');
const { StatusCodes } = require('http-status-codes');
const { FLIGHT_SERVICE_PATH } = require('../config/index');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const flight = await axios.get(getFlightRequestUrl);
            const flightData = flight.data.data;
            if (flightData.totalSeats < data.noOfSeats) {
                throw new ServiceError('Something went wrong in booking process , insufficient seates in the flight try another');
            }
            const totalCost = data.noOfSeats * flightData.price;
            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepository.create(bookingPayload);
            const response = await this.bookingRepository.update(booking.id, { status: 'Booked' });
            let updateFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            await axios.patch(updateFlightRequestUrl, { totalSeats: flightData.totalSeats - booking.noOfSeats });
            return response;
        } catch (error) {
            if (error.name == 'ValidationError' || error.name == 'DbError' || error.name == 'RepositoryError') {
                throw error;
            }
            throw new AppError('ServiceError',
                error.message,
                'Unknown error in Service',
                StatusCodes.INTERNAL_SERVER_ERROR,
                error.stack);
        }
    }
}

module.exports = BookingService;