const Contact = require("../models/Contact");

// Create Contact
const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user._id,
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Contact
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    const updatedContact =
      await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Contact
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
};