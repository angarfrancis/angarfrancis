const room = require("../controllers/rooms_CTL");
const isAuthenticated = require("../middlewares/authenticated").isAuthenticated;
const router = require("express").Router();

router.route("/").get(isAuthenticated, room.getAll).post(isAuthenticated, room.create);
router.route("/:id").get(isAuthenticated, room.getSingle).put(isAuthenticated, room.update).delete(isAuthenticated, room.delete);

module.exports = router;