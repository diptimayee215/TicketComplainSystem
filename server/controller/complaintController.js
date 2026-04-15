// const Complaint = require("../model/Complaint");


// // =============================
// // 1️⃣ Create Complaint (User)
// // =============================
// exports.createComplaint = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const complaint = await Complaint.create({
//       user: req.user.id,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       data: complaint,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =============================
// // 2️⃣ Get Logged-in User Complaints
// // =============================
// exports.getMyComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find({ user: req.user.id })
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: complaints,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =============================
// // 3️⃣ Admin: Get All Complaints
// // =============================
// exports.getAllComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find()
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: complaints,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // =============================
// // 4️⃣ Admin: Update Complaint Status
// // =============================
// exports.updateComplaintStatus = async (req, res) => {
//   try {
//     const { status, adminRemark } = req.body;

//     const complaint = await Complaint.findById(req.params.id);

//     if (!complaint) {
//       return res.status(404).json({
//         success: false,
//         message: "Complaint not found",
//       });
//     }

//     complaint.status = status || complaint.status;
//     complaint.adminRemark = adminRemark || complaint.adminRemark;

//     await complaint.save();

//     res.json({
//       success: true,
//       message: "Complaint updated successfully",
//       data: complaint,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.deleteComplaint = async (req, res) => {
//   const complaint = await Complaint.findById(req.params.id);

//   if (!complaint) {
//     return res.status(404).json({ message: "Complaint not found" });
//   }

//   await complaint.deleteOne();

//   res.json({ message: "Complaint deleted successfully" });
// };

const Complaint = require("../model/Complaint");  // ← FIXED: models not model

exports.createComplaint = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Message is required" });
    }

    const complaint = await Complaint.create({
      user: req.user.id,
      message,
    });

    res.status(201).json({ success: true, data: complaint });
  } catch (error) {
    console.error("Create complaint error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    if (status)                      complaint.status      = status;
    if (adminRemark !== undefined)   complaint.adminRemark = adminRemark;

    await complaint.save();

    res.json({ success: true, message: "Updated successfully", data: complaint });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    await complaint.deleteOne();
    res.json({ success: true, message: "Complaint deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};