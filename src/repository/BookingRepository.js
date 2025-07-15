const { AppError, DbError } = require('../utils/index');
const { Booking } = require('../models/index');
const { StatusCodes } = require('http-status-codes');

class BookingRepository {
    async create(data) {
        try {
            const result = await Booking.create(data);
            return result;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            } else if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                throw new DbError(error);
            } else {
                throw new AppError('RepositoryError', error.message, 'Unknown error in BookingRepository', 500, error.stack);
            }
        }
    }

    async update(id, data) {
        try {
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw new AppError(
                    'NotFoundError',
                    `Booking with id ${id} not found`,
                    `No booking found for id ${id}`,
                    StatusCodes.NOT_FOUND
                );
            }
            await booking.update(data);
            return booking;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            } else if (
                error.name === 'SequelizeDatabaseError' ||
                error.name === 'SequelizeUniqueConstraintError' ||
                error.name === 'SequelizeForeignKeyConstraintError'
            ) {
                throw new DbError(error);
            } else {
                throw new AppError(
                    'RepositoryError',
                    error.message,
                    'Unknown error in BookingRepository update',
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    error.stack
                );
            }
        }
    }


    async getById(id) {
        try {
            const booking = await Booking.findByPk(id);
            if (!booking) {
                throw new AppError(
                    'NotFoundError',
                    `Booking with id ${id} not found`,
                    `No booking found for id ${id}`,
                    StatusCodes.NOT_FOUND
                );
            }
            return booking;
        } catch (error) {
            if (
                error.name === 'SequelizeDatabaseError' ||
                error.name === 'SequelizeUniqueConstraintError' ||
                error.name === 'SequelizeForeignKeyConstraintError'
            ) {
                throw new DbError(error);
            } else {
                throw new AppError(
                    'RepositoryError',
                    error.message,
                    'Unknown error in BookingRepository getById',
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    error.stack
                );
            }
        }
    }

}

module.exports = BookingRepository