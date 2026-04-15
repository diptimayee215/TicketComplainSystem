const express = require("express");
const router  = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketController");   // ← FIXED: controller not controllers

// User routes
router.post("/",      protect,            createTicket);
router.get("/my",     protect,            getMyTickets);

// Admin routes
router.get("/",       protect, adminOnly, getAllTickets);
router.put("/:id",    protect, adminOnly, updateTicket);
router.delete("/:id", protect, adminOnly, deleteTicket);

module.exports = router;