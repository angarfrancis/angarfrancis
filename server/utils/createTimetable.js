const asyncHandler = require("../middlewares/asyncHandler");
const TimeTable = require("../models").time_table;
const Subject = require("../models").subject;
const Room = require("../models").rooms;
const User = require("../models").user;
const SubjectWithDepartments = require("../models").subject_with_departments;
const Department = require("../models").department;

module.exports = async (college_id, semester) => {
    const subjects = await Subject.findAll({
        where: { semester: semester, college_id: college_id },
        include: [
            {
                model: SubjectWithDepartments,
                as: "departments",
                include: [
                    {
                        model: Department,
                        as: "department",
                    }
                ]
            }
        ]
    });
    for (var i = 0; i < subjects.length; i++) {
        var students = await countStudents(subjects[i].departments.map(x => x.department_id), college_id, semester);
        console.log(students);
        let luc = Math.ceil(subjects[i].hours / 2);
        for (var y = 1; y < 7; y++) {
            var rooms = await Room.findAll({
                where: {
                    capacity: { $gte: students },
                    is_lab: subjects[i].is_lab
                },
                include: [
                    {
                        model: TimeTable,
                        as: "time_tables"
                    }
                ]
            });

            for (var j = 0; j < rooms.length; j++) {
                if (rooms[j].time_tables.filter(x => x.day == y).length < 3 && luc > 0) {
                    let time = await randomizeTime(rooms[j].time_tables.filter(x => x.day == y), subjects[i].teacher_id, y);
                    if (time) {
                        let found = await TimeTable.findOne({
                            where: {
                                room_id: rooms[j].id,
                                semester: semester,
                                day: y,
                                start_time: time.start,
                            }
                        });
                        if (!found) {
                            await TimeTable.create({
                                day: y,
                                semester: semester,
                                college_id: college_id,
                                subject_id: subjects[i].id,
                                room_id: rooms[j].id,
                                start_time: time.start,
                                finish_time: time.finish
                            });
                            luc--;
                            y++;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }

};

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

const randomizeTime = async (tables, teacher_id, day) => {
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
        }
    ];
    let subs = await Subject.findAll({
        where: { teacher_id: teacher_id }, include: [
            {
                model: TimeTable,
                as: "time_tables",
                where: {
                    day: day
                }
            }
        ]
    });

    for (let j = 0; j < subs.length; j++) {
        for (let y = 0; y < subs[j].time_tables.length; y++) {
            times = times.filter(x => x.start != subs[j].time_tables[y].start_time)
        }
    }

    for (var i = 0; i < tables.length; i++) {
        times = times.filter(x => x.start != tables[i].start_time);
    }

    return shuffle(times)[0];
}

function shuffle(array) {
    var currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}