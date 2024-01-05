const express = require("express");
const router = express.Router();
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/ROLES_LIST");

const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage,
  selectPackage,
} = require("../../controllers/packagesController");

router
  .route("/")
  .get(getPackages)
  .post(verifyRoles(ROLES_LIST.Admin), createPackage);

router
  .route("/:id")
  .get(getPackage)
  .patch(verifyRoles(ROLES_LIST.Admin), updatePackage)
  .delete(verifyRoles(ROLES_LIST.Admin), deletePackage)
  .put(selectPackage);

module.exports = router;
