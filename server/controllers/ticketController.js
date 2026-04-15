const Ticket = require("../model/Ticket");

// ── Create Ticket ─────────────────────────────────────────
const createTicket = async (req, res) => {
  try {
    const { name, email, phone, category, priority, subject, description } = req.body;

    if (!category || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "Category, subject, and description are required.",
      });
    }

    const ticketId = "TKT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const ticket = await Ticket.create({
      ticketId,
      user:        req.user._id,
      name:        name  || req.user.name,
      email:       email || req.user.email,
      phone:       phone || "",
      category,
      priority:    priority || "medium",
      subject,
      description,
      status:      "pending",
    });

    res.status(201).json({
      success:  true,
      ticketId: ticket.ticketId,
      data:     ticket,
    });
  } catch (error) {
    console.error("Create ticket error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get My Tickets ────────────────────────────────────────
const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Get All Tickets (admin) ───────────────────────────────
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Update Ticket ─────────────────────────────────────────
const updateTicket = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    if (status)                    ticket.status      = status;
    if (adminRemark !== undefined) ticket.adminRemark = adminRemark;

    await ticket.save();
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Delete Ticket ─────────────────────────────────────────
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }
    res.status(200).json({ success: true, message: "Ticket deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createTicket, getMyTickets, getAllTickets, updateTicket, deleteTicket };