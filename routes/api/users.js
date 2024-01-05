const express = require("express");
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/ROLES_LIST");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/usersController");

/* GET users listing. */
router.route("/").get(verifyRoles(ROLES_LIST.Admin), getAllUsers);
router
  .route("/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

module.exports = router;
