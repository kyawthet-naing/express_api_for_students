const router = require("express").Router();
const controller = require("../controllers/user_controller");
const { validateToken, validateMongoId } = require("../utils/validator");
router.post("/register", [controller.register]);
router.post("/login", [controller.login]);
router.get("/", [controller.get]);
router
  .route("/:id")
  .patch([validateToken(), validateMongoId(), controller.update])
  .delete([validateToken(), validateMongoId(), controller.drop]);

module.exports = router;
