const ErrorResponse = require('../utils/errorResponse');

const ErrorHandler = (error, req, res, next)=>{
    if(error.name === 'CastError'){
        const message = `${error.value} is not found`;
        error = new ErrorResponse(message, 400)
    }

    if(error.name === 'ValidationError'){
        const message = Object.values(error.errors).map(val => val.message);
        error = new ErrorResponse(message, 400)
    }

    if(error.code === 11000){
        const message = `${error.keyValue.Email} is used by another account`;
        error = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 400).json({
        success: false,
        message: error.message || 'Server Error'
    })
}

module.exports = ErrorHandler;