const asyncHandler = require("../middlewares/asyncHandler");
const Subject = require("../models").subject;
const Department = require("../models").department;
const SubjectWithDepartments = require("../models").subject_with_departments;
const Users = require("../models").user;
const College = require("../models").college;
const ErrorResponse = require("../utils/errorResponse");
let subject = {};

subject.create = asyncHandler(async (req, res, next) => {
    let departments = [];
    for (let i = 0; i < req.body.departments.length; i++) {
        departments.push({ department_id: req.body.departments[i] });
    }
    delete req.body.departments;
    req.body.college_id = req.user.college_id;
    const con = await Subject.create(req.body);
    if (con) {
        for (let i = 0; i < departments.length; i++) {
            departments[i].subject_id = con.id;
        }
        console.log(departments);
        await SubjectWithDepartments.bulkCreate(departments)
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

subject.delete = asyncHandler(async (req, res, next) => {
    const con = await Subject.destroy({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});

subject.update = asyncHandler(async (req, res, next) => {
    const con = await Subject.findOne({ where: { id: req.params.id } });
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

subject.getAll = asyncHandler(async (req, res, next) => {
    const con = await Subject.findAll({
        where: { college_id: req.user.college_id }, include: [
            {
                model: SubjectWithDepartments,
                as: "departments",
                include: [
                    {
                        model: Department,
                        as: "department"
                    }
                ]
            },
            {
                model: Users,
                as: "teacher"
            },
            {
                model: College,
                as: "college"
            }
        ]
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

subject.getAllByDepartment = asyncHandler(async (req, res, next) => {
    const con = await Subject.findAll({
        where: {
            "$departments.department_id$": req.params.id,
            semester: req.params.semester
        },
        include: [
            {
                model: SubjectWithDepartments,
                as: "departments"
            }
        ]
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

subject.getSingle = asyncHandler(async (req, res, next) => {
    const con = await Subject.findOne({ where: { id: req.params.id } });
    if (con) {
        res.status(200).json({
            success: true,
            data: con
        });
    } else {
        return next(new ErrorResponse("", 400))
    }
});


module.exports = subject;