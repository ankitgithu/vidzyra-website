import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import workRoutes from "./routes/workRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import User from "./models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

const app = express();

// ✅ __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ uploads folder ensure
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ static folder
app.use("/uploads", express.static(uploadPath));


// 🔥🔥🔥 MAIN FIX (IMPORTANT)
app.use("/api/upload-work", workRoutes);  // ✅ FRONTEND MATCH

// optional routes
app.use("/api/video", videoRoutes);


// ✅ test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// ---------- USER CRUD ----------

// POST
app.post("/add-data", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.json({
      message: "Data saved successfully ✅",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET
app.get("/get-data", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      message: "Data fetched successfully ✅",
      data: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
app.put("/update-data/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Data updated successfully ✏️",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
app.delete("/delete-data/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Data deleted successfully 🗑️"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔥 MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));


// 🔥 server start
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});