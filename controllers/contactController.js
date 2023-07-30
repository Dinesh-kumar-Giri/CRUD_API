import asyncHandler from "express-async-handler";
import contact from "../models/contactModle.js";
/**
 * @description Get all contacts
 * @rout GET /api/contacts
 * @access public
 */

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contact.find();
  console.log("dfakjk", contacts);
  res.status(200).json(contacts);
});

/**
 * @description createContact
 * @rout GET /api/contacts
 * @access public
 */
const createContact = asyncHandler(async (req, res) => {
  console.log("req--------", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all field are mandatory !");
  }

  const contactus = await contact.create({
    name,
    email,
    phone,
  });
  console.log("he------", contactus);
  res.status(201).json(contactus);
});

/**
 * @description get contact
 * @rout GET /api/contacts/:id
 * @access public
 */

const getContact = asyncHandler(async (req, res) => {
  const Contact = await contact.findById(req.params.id);
  if (!Contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  console.log("get contact through by id: ", Contact);
  res.status(200).json(Contact);
});

/**
 * @description  updateContact
 * @rout GET /api/contacts/:id
 * @access public
 */

const updateContact = asyncHandler(async (req, res) => {
  const Contact = await contact.findById(req.params.id);
  if (!Contact) {
    res.status(404);
    throw new Error("contact is not found");
  }
  console.log("before update:-----", Contact);
  const updateContacts = contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateContacts);
});

/**
 * @description  deleteContact
 * @rout GET /api/contacts/id
 * @access public
 */

const deleteContact = asyncHandler(async (req, res) => {
  const contactId = req.params.id;
  const Contact = await contact.findById(contactId);
  
  if (!Contact) {
    res.status(404);
    throw new Error("Contact is not found");
  }

  console.log("Contact before deletion:", Contact);
  await contact.remove();
  console.log("Contact after deletion:", Contact);

  res.status(200).json({ message: "Contact deleted successfully" });
});


// export default getContact;
export { getContacts, createContact, getContact, updateContact, deleteContact };
