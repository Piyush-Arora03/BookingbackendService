const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');

class ValidationError extends AppError {
    constructor(error) {

        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        const statusCode = StatusCodes.BAD_REQUEST;

        super({
            name: 'ValidationError',
            message: 'Not able to validate the data sent by the user',
            explanation,
            statusCode
        });
    }
}

module.exports = ValidationError