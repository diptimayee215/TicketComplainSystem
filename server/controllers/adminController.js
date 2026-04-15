const User      = require("../model/User");
const Complaint = require("../model/Complaint");
const Ticket    = require("../model/Ticket");

// ── Get All Users ─────────────────────────────────────────
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// ── Delete User ───────────────────────────────────────────
exports.deleteUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// ── Dashboard Stats ───────────────────────────────────────
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers      = await User.countDocuments({ role: "user" });
    const totalComplaints = await Complaint.countDocuments();
    const totalTickets    = await Ticket.countDocuments();
    const pending         = await Complaint.countDocuments({ status: "pending" });
    const resolved        = await Complaint.countDocuments({ status: "resolved" });
    const inProgress      = await Complaint.countDocuments({ status: "in-progress" });

    res.status(200).json({
      success: true,
      data: { totalUsers, totalComplaints, totalTickets, pending, resolved, inProgress },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};