const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');
class ValidationError extends AppError {
    constructor(
        message = 'Something went wrong',
        explanation = 'Not able to validate the data sent by the user',
        statusCode = StatusCodes.BAD_REQUEST
    ) {
        super({
            name: 'ValidationError',
            message,
            explanation,
            statusCode
        });
    }
}

module.exports = ValidationError