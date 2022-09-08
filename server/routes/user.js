const user = require("../controllers/user_CTL");
const isAuthenticated = require("../middlewares/authenticated").isAuthenticated;
const isAdmin = require("../middlewares/authenticated").isAdmin;

const router = require("express").Router();

router.route("/").get(isAuthenticated, user.getAll).post(isAuthenticated, user.create);
router.route("/registerer").get(isAuthenticated, user.getAllRegisterer).post(isAuthenticated, user.createRegisterer);
router.route("/teacher").get(isAuthenticated, user.getAllTeacher);
router.route("/:id").get(isAuthenticated, user.getSingle).put(isAuthenticated, user.update).delete(isAuthenticated, user.delete);

module.exports = router;