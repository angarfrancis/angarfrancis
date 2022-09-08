const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models").user;
const College = require("../models").college;
const Department = require("../models").department;
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcrypt");
let user = {};

user.create = asyncHandler(async (req, res, next) => {
    if (req.user.role == "registerar") {
        req.body.college_id = req.user.college_id;
    }
    const con = await User.create(req.body);
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


user.createRegisterer = asyncHandler(async (req, res, next) => {
    req.body.role = "registerer";
    const con = await User.create(req.body);
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

user.delete = asyncHandler(async (req, res, next) => {
    const con = await User.destroy({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

user.update = asyncHandler(async (req, res, next) => {


    const con = await User.findOne({ where: { id: req.params.id } });
    if (con) {
        if (req.body.password && req.body.password.length > 0) {
            const salt = await bcrypt.genSalt(5);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        await con.update(req.body);
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

user.getAll = asyncHandler(async (req, res, next) => {
    let con;
    if (req.user.role == "admin") {
        con = await User.findAll({ where: { role: "admin" } });
    } else {
        con = await User.findAll({ where: { role: "student", college_id: req.user.college_id }, include: [{ model: Department, as: 'department' }] });
    }
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }


});

user.getSingle = asyncHandler(async (req, res, next) => {
    const con = await User.findOne({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


user.getAllRegisterer = asyncHandler(async (req, res, next) => {
    const con = await User.findAll({
        where: { role: "registerar" }, include: [{
            model: College,
            as: "college"
        }]
    });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


user.getAllTeacher = asyncHandler(async (req, res, next) => {
    const con = await User.findAll({
        where: { role: "teacher" }, include: [{
            model: College,
            as: "college"
        }]
    });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


user.getAllTeacherForAdmin = asyncHandler(async (req, res, next) => {
    const con = await User.findAll({
        where: { role: "teacher" }, include: [{
            model: College,
            as: "college"
        }]
    });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

module.exports = user;