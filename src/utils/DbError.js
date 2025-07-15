const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');

class DbError extends AppError {
    constructor(error) {
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        
        super({
            name: error?.name || 'DbError',
            message: error?.message || 'Database error occurred',
            explanation,
            statusCode: StatusCodes.BAD_REQUEST,
            stack: error?.stack
        });
    }
}

module.exports = DbError