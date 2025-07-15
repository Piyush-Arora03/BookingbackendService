const {AppError,DbError}=require('../utils/index');
const {Booking}=require('../models/index');

class BookingRepository{
    async create(data){
        try {
            const result=await Booking.create(data);
            return result;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            } else if (error.name === 'SequelizeDatabaseError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                throw new DbError(error);
            } else {
                throw new AppError('AppError', error.message, 'Unknown error in BookingRepository', 500, error.stack);
            }
        }
    }
}

module.exports=BookingRepository