import asyncHandler from "express-async-handler";
import contact from "../models/contactModle.js";
/**
 * @description Get all contacts
 * @rout GET /api/contacts
 * @access private
 */

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await contact.find({ user_id: req.user.id });
  console.log("contact-----------", contacts);
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
    user_id: req.user.id
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
  if(Contact.user_id.toString() !== req.user.id){
    res.status(404);
    throw new Error("user  don't have permission to update other  user contact")
  }
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
  if(Contact.user_id.toString() !== req.user.id){
    res.status(404);
    throw new Error("user  don't have permission to delte other  user contact")
  }
  console.log("Contact before deletion:", Contact);
  await contact.delete();
  console.log("Contact after deletion:", Contact);

  res.status(200).json({ message: "Contact deleted successfully" });
});

// export default getContact;
export { getContacts, createContact, getContact, updateContact, deleteContact };
