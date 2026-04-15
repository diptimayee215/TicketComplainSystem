const express = require("express");
const router  = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  deleteUser,
  getDashboardStats,
} = require("../controllers/adminController");  // ← controller (singular)

router.get("/users",        protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/stats",        protect, adminOnly, getDashboardStats);

module.exports = router;