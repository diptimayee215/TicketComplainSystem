const express = require("express");
const router  = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controller/complaintController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// User routes
router.post("/",      protect,            createComplaint);
router.get("/my",     protect,            getMyComplaints);

// Admin routes
router.get("/",       protect, adminOnly, getAllComplaints);
router.put("/:id",    protect, adminOnly, updateComplaintStatus);
router.delete("/:id", protect, adminOnly, deleteComplaint);

module.exports = router;