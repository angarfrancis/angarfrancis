const asyncHandler = require('./asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const Jwt = require('jsonwebtoken');
const user = require('../models').user;

exports.isAdmin = asyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'admin') {
            const u = await user.findOne({ where: { id: decoded.id, role: 'admin' } });
            if (u) {
                req.user = u.dataValues
                next()
            }
        } else {
            return next(new ErrorResponse('You are not authorized to access this route', 401))
        }
    } catch (err) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }
})

exports.isStudent = asyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'student') {
            const u = await user.findOne({ where: { id: decoded.id, role: 'student' } });
            if (u) {
                req.user = u.dataValues
                next()
            }
        } else {
            return next(new ErrorResponse('You are not authorized to access this route', 401))
        }
    } catch (err) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }
})

exports.isTeacher = asyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'teacher') {
            const u = await user.findOne({ where: { id: decoded.id, role: 'teacher' } });
            if (u) {
                req.user = u.dataValues
                next()
            }
        } else {
            return next(new ErrorResponse('You are not authorized to access this route', 401))
        }
    } catch (err) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }
})

exports.isRegisterer = asyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'registerar') {
            const u = await user.findOne({ where: { id: decoded.id, role: 'registerer' } });
            if (u) {
                req.user = u.dataValues
                next()
            }
        } else {
            return next(new ErrorResponse('You are not authorized to access this route', 401))
        }
    } catch (err) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }
});



exports.isAuthenticated = asyncHandler(async (req, res, next) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const u = await user.findOne({ where: { id: decoded.id } });
            if (u) {
                req.user = u.dataValues
                next()
            }
        } else {
            return next(new ErrorResponse('You are not authorized to access this route', 401))
        }
    } catch (err) {
        return next(new ErrorResponse('You are not authorized to access this route', 401))
    }
})