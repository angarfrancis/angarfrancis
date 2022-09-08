const subject = require("../controllers/subject_CTL");
const isAuthenticated = require("../middlewares/authenticated").isAuthenticated;
const router = require("express").Router();

router.route("/").get(isAuthenticated, subject.getAll).post(isAuthenticated, subject.create);
router.route("/:id").get(isAuthenticated, subject.getSingle).put(isAuthenticated, subject.update).delete(isAuthenticated, subject.delete);
router.route("/department/:id/:semester").get(isAuthenticated, subject.getAllByDepartment)

module.exports = router;