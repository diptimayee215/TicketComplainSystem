const express = require("express");
const router  = express.Router();
const {
  AddContact,
  getAllContacts,
  deleteContact,
} = require("../controller/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/add",      AddContact);
router.get("/all",       protect, adminOnly, getAllContacts);
router.delete("/:id",    protect, adminOnly, deleteContact);

module.exports = router;