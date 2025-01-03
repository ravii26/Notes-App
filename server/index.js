import express from "express";
const app = express();

import cors from "cors";
import bp from "body-parser";

import connectDB from "./config/db.js";
import dotenv from "dotenv";

import userRoutes from "./routes/authentication/users.js";
import authRoutes from "./routes/authentication/auth.js";
import forgetPasswordRoutes from "./routes/authentication/forgetPassword.js";
import resetPasswordRoutes from "./routes/authentication/resetPassword.js";
import verifyOtpRoutes from "./routes/authentication/verifyotp.js";

import createNoteRoutes from "./routes/notes/createnotes.js";
import notesRoutes from "./routes/notes/notes.js";
import deleteNoteRoutes from "./routes/notes/deletenote.js";
import noteRoutes from "./routes/notes/note.js";
import noteUpdateRoutes from "./routes/notes/noteupdate.js";

import createCategoryRoutes from "./routes/categories/createcategory.js";
import categoriesRoutes from "./routes/categories/getcategories.js";
import deleteCategoryRoutes from "./routes/categories/deletecategory.js";

import profileDataRoutes from "./routes/authentication/profileData.js";
import profileUpdateRoutes from "./routes/authentication/profileUpdate.js";

import removeDeviceRoutes from "./routes/authentication/removeDevice.js";
import getDevicesRoutes from "./routes/authentication/getDevices.js";
import deleteDeviceRoutes from "./routes/authentication/deleteDevice.js";

// CHANGE

import authenticationRoutes from "./routes/authRoutes.js";

import productRoutes from "./routes/productRoutes.js";

// _________________________________

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bp.json());
dotenv.config();

connectDB();

// CHANGE

app.use("/api/v1", authenticationRoutes)

app.use("/api/v1", productRoutes);

// _________________________________

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forgetPassword", forgetPasswordRoutes);
app.use("/api/resetPassword", resetPasswordRoutes);
app.use("/api/verifyotp", verifyOtpRoutes);

app.use("/api/createnote", createNoteRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/deletenote", deleteNoteRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/noteupdate", noteUpdateRoutes);

app.use("/api/createcategory", createCategoryRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/deletecategory", deleteCategoryRoutes);

app.use("/api/profile", profileDataRoutes);
app.use("/api/profileupdate", profileUpdateRoutes);

app.use("/api/logout", removeDeviceRoutes);
app.use("/api/devices", getDevicesRoutes);
app.use("/api/deletedevice", deleteDeviceRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
