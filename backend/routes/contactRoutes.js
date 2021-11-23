import express from 'express';
import asyncHandler from 'express-async-handler';
import Contact from '../models/contactModel.js';

const router = express.Router();

// @description      Fetch all contacts
// @route            GET /api/contacts
// @access           Public
router.get('/', asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.json(contacts);
}));

// @description      Fetch single contact
// @route            GET /api/contacts/:id
// @access           Public
router.get('/:id', asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404);
    throw new Error('Contact not found');
  }
}));

// @description      Create Contact
// @route            POST /api/contacts/create
// @access           Public
router.post('/create', asyncHandler(async (req, res) => {
  const newContact = await new Contact(req.body).save();
  if (newContact) {
    res.json(newContact);
  } else {
    res.status(404);
    throw new Error('Contact Create Failed');
  }
}));


// @description      Update Contact
// @route            PUT /api/contacts/:id
// @access           Public
router.put('/:id', asyncHandler(async (req, res) => {
  const updated = await Contact.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
  if (updated) {
    res.json(updated);
  } else {
    res.status(404);
    throw new Error('Contact Update Error');
  }
}));



// @description      Delete Contact
// @route            DELETE /api/contacts/:id
// @access           Public
router.delete('/:id', asyncHandler(async (req, res) => {
  try {
    const deleted = await Contact.findOneAndRemove({ _id: req.params.id }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Contact Delete Failed');
  }
}));


export default router;