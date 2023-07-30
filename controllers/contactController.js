import asyncHandler from "express-async-handler";
/**
 * @description Get all contacts
 * @rout GET /api/contacts
 * @access public
 */

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
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

  res.status(201).json({ message: "Create contacts" });
});

/**
 * @description get contact
 * @rout GET /api/contacts/:id
 * @access public
 */

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
});

/**
 * @description  updateContact
 * @rout GET /api/contacts/:id
 * @access public
 */

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
});

/**
 * @description  deleteContact
 * @rout GET /api/contacts/id
 * @access public
 */

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
});

// export default getContact;
export { getContacts, createContact, getContact, updateContact, deleteContact };
