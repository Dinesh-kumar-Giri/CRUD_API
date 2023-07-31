import express from "express";
const router = express.Router();
import {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";
import { validateToken } from "../middleware/uservalidateToken.js";

router.use(validateToken);
router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

// router.route("/:id").delete((req, res) => {
//   res.status(200).json({ message: `Delete contacts for ${req.params.id}` });
// });
router.route("/:id").delete(deleteContact);

export default router;
