import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Work from "../models/Work.js";
import { fileURLToPath } from "url";

const router = express.Router();

// ✅ __dirname fix (ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ uploads folder path (ABSOLUTE)
const uploadPath = path.join(__dirname, "../uploads");

// ✅ ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 📂 STORAGE SETUP (FIXED)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // ✅ absolute path
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({ storage });

// 🚀 UPLOAD ROUTE
router.post(
  "/upload",
  upload.fields([
    { name: "before", maxCount: 1 },
    { name: "after", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { category, title } = req.body;

      // 🧪 DEBUG (optional)
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }

      let newWork;

      // 🎬 VIDEO (Before / After)
      if (category === "video") {
        if (!req.files?.before || !req.files?.after) {
          return res.status(400).json({
            error: "Before & After videos are required",
          });
        }

        newWork = new Work({
          title,
          category,
          before: req.files.before[0].filename,
          after: req.files.after[0].filename,
        });
      }

      // 📁 OTHER FILES
      else {
        if (!req.files?.file) {
          return res.status(400).json({
            error: "File is required",
          });
        }

        newWork = new Work({
          title,
          category,
          file: req.files.file[0].filename,
        });
      }

      await newWork.save();

      res.json({
        message: "Uploaded Successfully ✅",
        data: newWork,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// 📥 GET ALL WORKS
router.get("/", async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE WORK + FILES
router.delete("/:id", async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    const deleteFile = (filename) => {
      if (!filename) return;

      const filePath = path.join(uploadPath, filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    };

    deleteFile(work.before);
    deleteFile(work.after);
    deleteFile(work.file);

    await Work.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;