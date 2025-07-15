const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');

class ServiceError extends AppError {
    constructor(
        message = 'Something went wrong',
        explanation = 'Service layer error',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super({
            name: 'ServiceError',
            message,
            explanation,
            statusCode
        });
    }
}

module.exports = ServiceError