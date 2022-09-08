const college = require("../controllers/college_CTL");
const isAdmin = require("../middlewares/authenticated").isAdmin;
const isAuthenticated = require("../middlewares/authenticated").isAuthenticated;
const router = require("express").Router();

router.route("/").get(isAuthenticated, college.getAll).post(isAuthenticated, college.create);
router.route("/:id").get(isAuthenticated, college.getSingle).put(isAuthenticated, college.update).delete(isAuthenticated, college.delete);

module.exports = router;