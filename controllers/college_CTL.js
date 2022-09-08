const asyncHandler = require("../middlewares/asyncHandler");
const College = require("../models").college;
const User = require("../models").user;
const ErrorResponse = require("../utils/errorResponse");
let college = {};

college.create = asyncHandler(async (req, res, next) => {
    const con = await College.create(req.body);
    if (con) {
        if (con.registerer_id) {
            const reg = await User.findOne({ where: { id: con.registerer_id } });
            await reg.update({ college_id: con.id });
        }
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

college.delete = asyncHandler(async (req, res, next) => {
    const con = await College.destroy({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

college.update = asyncHandler(async (req, res, next) => {
    const con = await College.findOne({ where: { id: req.params.id } });
    if (con) {
        if (con.registerer_id && req.body.registerer_id) {
            const reg = await User.findOne({ where: { id: con.registerer_id } });
            await reg.update({ college_id: null });
        }
        if (req.body.registerer_id) {
            const reg1 = await User.findOne({ where: { id: req.body.registerer_id } });
            await reg1.update({ college_id: con.id });
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

college.getAll = asyncHandler(async (req, res, next) => {
    const con = await College.findAll({ where: {}, include: [{ model: User, as: "registerer" }] });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

college.getSingle = asyncHandler(async (req, res, next) => {
    const con = await College.findOne({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


module.exports = college;