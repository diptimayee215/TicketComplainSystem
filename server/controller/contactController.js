const Contact = require("../model/Contact");

const AddContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while creating contact",
      error: err.message,
    });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   DELETE CONTACT (Admin)
================================ */
const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  AddContact,getAllContacts,deleteContact
};




