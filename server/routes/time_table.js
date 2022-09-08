const time_table = require("../controllers/time_table_CTL");
const isAuthenticated = require("../middlewares/authenticated").isAuthenticated;

const router = require("express").Router();

router.route("/add_table").post(isAuthenticated, time_table.createSingle)
router.route("/slots/:id").get(isAuthenticated, time_table.getSlots)
router.route("/student").get(isAuthenticated, time_table.getStudentTimetable);
router.route("/registerar/:semester").get(isAuthenticated, time_table.getTimetables).post(isAuthenticated, time_table.create).delete(isAuthenticated, time_table.delete);
router.route("/teacher").get(isAuthenticated, time_table.getTeacherTimetable);
router.route("/:id").delete(isAuthenticated, time_table.deleteSingle);

module.exports = router;