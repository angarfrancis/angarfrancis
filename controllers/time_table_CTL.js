const moment = require("moment");
const asyncHandler = require("../middlewares/asyncHandler");
const Department = require("../models").department;
const createTimetable = require("../utils/createTimetable");
const TimeTable = require("../models").time_table;
const Subject = require("../models").subject;
const SubjectWithDepartments = require("../models").subject_with_departments;
const Room = require("../models").rooms;
const User = require("../models").user;


let time_table = {};

time_table.create = asyncHandler(async (req, res, next) => {
    await createTimetable(req.user.college_id, req.body.semester);
    res.status(200).json({
        success: true,
        message: 'time table has been created successfully'
    })
});

time_table.createSingle = asyncHandler(async (req, res, next) => {
    const sub = await Subject.findOne({ where: { id: req.body.subject_id } });
    req.body.semester = sub.semester;
    req.body.college_id = req.user.college_id;
    req.body.finish_time = moment(req.body.start_time, 'HH:mm:ss').add(2, 'hours').format('HH:mm:ss')

    const table = await TimeTable.create(req.body);
    const ne = await TimeTable.findOne({
        where: { id: table.id },
        include: [
            {
                model: Subject,
                as: "subject",
            },
            {
                model: Room,
                as: "room",
            }
        ]
    });
    res.status(200).json({
        success: true,
        data: ne
    });
});

time_table.getSlots = asyncHandler(async (req, res, next) => {
    const sub = await Subject.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: SubjectWithDepartments,
                as: "departments",
            }
        ]
    });
    // student count
    let students = await countStudents(sub.departments.map(x => x.department_id), sub.college_id, sub.semester)
    // find rooms
    var rooms = await Room.findAll({
        where: {
            capacity: { $gte: students },
            is_lab: sub.is_lab
        },
        include: [
            {
                model: TimeTable,
                as: "time_tables",
            }
        ]
    });

    let validRooms = [];
    for (let i = 0; i < rooms.length; i++) {
        let valid = true;
        for (let j = 0; j < rooms[i].time_tables.length; j++) {
            if (rooms[i].time_tables[j].start_time == req.body.start_time) {
                valid = false
            }
        }
        if (valid) {
            validRooms.push(rooms[i]);
        }
    }
    res.status(200).json({
        success: true,
        data: validRooms
    });
});

time_table.getStudentTimetable = asyncHandler(async (req, res, next) => {
    let times = await SubjectWithDepartments.findAll({
        where: {
            department_id: req.user.department_id,
            "$subject.semester$": req.user.semester
        },
        include: [
            {
                model: Subject,
                as: "subject",
                include: [
                    {
                        model: TimeTable,
                        as: "time_tables",
                        include: [
                            {
                                model: Subject,
                                as: "subject",
                            },
                            {
                                model: Room,
                                as: "room",
                            }
                        ]
                    }
                ]
            }
        ]
    });
    let resp = {
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
        day6: [],
    };
    for (let i = 0; i < times.length; i++) {
        resp.day1.push(...times[i].subject.time_tables.filter(x => x.day == 1));
        resp.day2.push(...times[i].subject.time_tables.filter(x => x.day == 2));
        resp.day3.push(...times[i].subject.time_tables.filter(x => x.day == 3));
        resp.day4.push(...times[i].subject.time_tables.filter(x => x.day == 4));
        resp.day5.push(...times[i].subject.time_tables.filter(x => x.day == 5));
        resp.day6.push(...times[i].subject.time_tables.filter(x => x.day == 6));
    }
    res.status(200).json({
        success: true,
        data: resp
    })
});

time_table.getTeacherTimetable = asyncHandler(async (req, res, next) => {
    const sub = await Subject.findAll({ where: { teacher_id: req.user.id } });
    let or_options = [];
    for (let i = 0; i < sub.length; i++) {
        or_options.push({ subject_id: sub[i].id })
    }
    let times = await SubjectWithDepartments.findAll({
        where: {
            $or: or_options,
        },
        include: [
            {
                model: Subject,
                as: "subject",
                include: [
                    {
                        model: TimeTable,
                        as: "time_tables",
                        include: [
                            {
                                model: Subject,
                                as: "subject",
                            },
                            {
                                model: Room,
                                as: "room",
                            }
                        ]
                    }
                ]
            }
        ]
    });
    let resp = {
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
        day6: [],
    };
    for (let i = 0; i < times.length; i++) {
        resp.day1.push(...times[i].subject.time_tables.filter(x => x.day == 1));
        resp.day2.push(...times[i].subject.time_tables.filter(x => x.day == 2));
        resp.day3.push(...times[i].subject.time_tables.filter(x => x.day == 3));
        resp.day4.push(...times[i].subject.time_tables.filter(x => x.day == 4));
        resp.day5.push(...times[i].subject.time_tables.filter(x => x.day == 5));
        resp.day6.push(...times[i].subject.time_tables.filter(x => x.day == 6));
    };

    res.status(200).json({
        success: true,
        data: resp
    })
});

time_table.getTimetables = asyncHandler(async (req, res, next) => {
    let data = [];
    const times = await Department.findAll({
        where: { college_id: req.user.college_id }, include: [
            {
                model: SubjectWithDepartments,
                as: "departments",
                include: [
                    {
                        model: Subject,
                        as: "subject",
                        where: { semester: req.params.semester },
                        include: [
                            {
                                model: TimeTable,
                                as: "time_tables",
                                include: [
                                    {
                                        model: Subject,
                                        as: "subject",
                                    },
                                    {
                                        model: Room,
                                        as: "room",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    });
    for (let i = 0; i < times.length; i++) {
        data.push({
            label: times[i].name,
            department_id: times[i].id,
            days: {
                day1: getTimetablesByDay(times[i].departments,1),
                day2: getTimetablesByDay(times[i].departments,2),
                day3: getTimetablesByDay(times[i].departments,3),
                day4: getTimetablesByDay(times[i].departments,4),
                day5: getTimetablesByDay(times[i].departments,5),
                day6: getTimetablesByDay(times[i].departments,6),
            }
        })
    }
    const count = await TimeTable.count({where: {semester: req.params.semester,college_id: req.user.college_id}})
    res.status(200).json({
        success: true,
        data: data,
        create: count == 0,
    })
});


time_table.delete = asyncHandler(async (req, res, next) => {
    await TimeTable.destroy({ where: { college_id: req.user.college_id,semester: Number(req.params.semester) } });
    res.status(200).json({
        success: true,
        message: 'time table has been deleted successfully'
    });
});

time_table.deleteSingle = asyncHandler(async (req, res, next) => {
    await TimeTable.destroy({ where: { id: req.params.id } });
    res.status(200).json({
        success: true,
        message: 'time table has been deleted successfully'
    });
});

const countStudents = async (depList, collegeID, semester) => {
    var filter = { college_id: collegeID, semester: semester, $or: [] };
    for (var i = 0; i < depList.length; i++) {
        filter.$or.push({
            department_id: {
                $eq: depList[i]
            }
        })
    }
    return await User.count({ where: filter });
}

const getTimetablesByDay = (arr, day)=>{
    let times = [];
    for (let i = 0; i < arr.length; i++) {
        times.push(...arr[i].subject.time_tables.filter(x=> x.day == day))
    }
    return times;
}

const randomizeTime = async (tables) => {
    var times = [
        {
            start: "08:00:00",
            finish: "10:00:00",
        },
        {
            start: "11:00:00",
            finish: "13:00:00",
        },
        {
            start: "13:00:00",
            finish: "15:00:00",
        },
        {
            start: "15:00:00",
            finish: "17:00:00",
        }
    ];

    for (var i = 0; i < tables.length; i++) {
        times = times.filter(x => x.start != tables[i].start_time);
    }
    return times;
}

module.exports = time_table;
