const router = require("express").Router();
const controller = require("../controllers/contact_controller");
const {
  validateToken,
  validateBody,
  validateMongoId,
  validateRole,
} = require("../utils/validator");
const { save } = require("../utils/uploader");
const { contact_create } = require("../utils/validate_schema");

router.get("/", [controller.get]);
router.post("/add", [
  validateToken(),
  validateBody(contact_create),
  save,
  controller.create,
]);
router
  .route("/:id")
  .patch([validateMongoId(), controller.update])
  .delete([validateRole(["admin", "owner"]), controller.drop]);

module.exports = router;
