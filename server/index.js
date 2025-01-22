import express from "express";
const app = express();

import cors from "cors";
import bp from "body-parser";

import connectDB from "./config/db.js";
import dotenv from "dotenv";

import authenticationRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import firebaseRoutes from "./routes/firebaseRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(bp.json());
dotenv.config();
// app.use((req, res, next) => {
//     res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//     next();
//   });

connectDB();

app.use("/api/v1", authenticationRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", firebaseRoutes);
app.use("/api/v1", categoriesRoutes);
app.use("/api/v1", notesRoutes);
app.use("/api/v1", profileRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", passwordRoutes);
app.use("/api/v1", deviceRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
