const asyncHandler = require("../middlewares/asyncHandler");
const Rooms = require("../models").rooms;
const Colleges = require("../models").college;
const ErrorResponse = require("../utils/errorResponse");
let room = {};

room.create = asyncHandler(async (req, res, next) => {
    req.body.college_id = req.user.college_id;
    const con = await Rooms.create(req.body);
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

room.delete = asyncHandler(async (req, res, next) => {
    const con = await Rooms.destroy({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

room.update = asyncHandler(async (req, res, next) => {
    const con = await Rooms.findOne({ where: { id: req.params.id } });
    if (con) {
        await con.update(req.body);
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

room.getAll = asyncHandler(async (req, res, next) => {
    const con = await Rooms.findAll({ where: { college_id: req.user.college_id }, include: [{ model: Colleges, as: "college" }] });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

room.getSingle = asyncHandler(async (req, res, next) => {
    const con = await Rooms.findOne({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


module.exports = room;