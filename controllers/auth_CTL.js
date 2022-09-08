const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const ErrorResponse = require('../utils/errorResponse');
const User = require("../models").user;
let user = {};
const jsonwebtoken = require("jsonwebtoken");


user.login = asyncHandler(async (req, res, next) => {
    const u = await User.findOne({ where: { email: req.body.email } });
    if (u) {
        const verified = await bcrypt.compare(req.body.password, u.password);
        if (verified) {
            const token = jsonwebtoken.sign({
                role: u.role,
                id: u.id
            }, process.env.JWT_SECRET);
            res.status(200).json({
                success: true,
                token: token,
                role: u.role
            });
        } else {
            return next(new ErrorResponse('wrong cridential', 400))
        }
    } else {
        return next(new ErrorResponse('wrong cridential', 400))
    }
});

user.me = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

module.exports = user;