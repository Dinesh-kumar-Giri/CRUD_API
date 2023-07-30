import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import contactRoutes from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbconnection.js";

connectDb();
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is runnint port ${port}`);
});
