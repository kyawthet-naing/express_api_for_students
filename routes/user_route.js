const router = require("express").Router();
const controller = require("../controllers/user_controller");

router.post("/register", [controller.register]);
router.post("/login", [controller.login]);
router.get("/", [controller.get]);
router.route("/:id").patch([controller.update]).delete([controller.drop]);

module.exports = router;
