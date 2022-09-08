const department = require("../controllers/department_CTL");
const isAdmin = require("../middlewares/authenticated").isAdmin;
const isAuthenticated = require("../middlewares/authenticated").isAuthenticated;
const router = require("express").Router();

router.route("/").get(isAuthenticated, department.getAll).post(isAuthenticated, department.create);
router.route("/:id").get(isAuthenticated, department.getSingle).put(isAuthenticated, department.update).delete(isAuthenticated, department.delete);

module.exports = router;