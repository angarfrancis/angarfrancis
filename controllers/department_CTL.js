const asyncHandler = require("../middlewares/asyncHandler");
const Department = require("../models").department;
const College = require("../models").college;
const ErrorResponse = require("../utils/errorResponse");
let department = {};

department.create = asyncHandler(async (req, res, next) => {
    req.body.college_id = req.user.college_id
    const con = await Department.create(req.body);
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

department.delete = asyncHandler(async (req, res, next) => {
    const con = await Department.destroy({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

department.update = asyncHandler(async (req, res, next) => {
    const con = await Department.findOne({ where: { id: req.params.id } });
    if (con) {
        await con.update(req.body)
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

department.getAll = asyncHandler(async (req, res, next) => {
    const con = await Department.findAll({ where: { college_id: req.user.college_id }, include: [{ model: College, as: "college" }] });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

department.getSingle = asyncHandler(async (req, res, next) => {
    const con = await Department.findOne({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


module.exports = department;