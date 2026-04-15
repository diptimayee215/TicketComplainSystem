const User = require("../model/User");

exports.getAllTickets = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Tickets route working",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.error("Get All Users Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};

// ======================================
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent deleting yourself
    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};


    