const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

router.route("/")
  .post(protect, createContact)
  .get(protect, getContacts);

router.route("/:id")
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;