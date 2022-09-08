const auth = require("../controllers/auth_CTL");
const { isAuthenticated } = require("../middlewares/authenticated");

const router = require("express").Router();

router.route("/").post(auth.login).get(isAuthenticated,auth.me);
module.exports = router;