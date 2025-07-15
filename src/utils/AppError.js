class AppError extends Error {
    constructor(
        name = 'AppError',
        message = 'Something went wrong',
        explanation = 'Unknown Error',
        statusCode = 500,
        stack = ''
    ) {
        super(message);
        this.name = name;
        this.explanation = explanation;
        this.statusCode = statusCode
        if (stack) this.stack = stack;
    }
}

module.exports = AppError