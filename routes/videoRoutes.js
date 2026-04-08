import express from "express";
import multer from "multer";
import Work from "../models/Video.js";

const router = express.Router();

// 🔥 MULTER SETUP
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({ storage });


// 🔥 UPLOAD (ALL TYPES)
router.post(
  "/upload-work",
  upload.fields([
    { name: "before" },
    { name: "after" },
    { name: "file" },
  ]),
  async (req, res) => {
    try {
      const { category } = req.body;

      let newWork;

      // 🎬 VIDEO (Before / After)
      if (category === "video") {
        if (!req.files.before || !req.files.after) {
          return res.status(400).json({ error: "Before & After required" });
        }

        newWork = new Work({
          category,
          before: req.files.before[0].filename,
          after: req.files.after[0].filename,
        });
      }

      // 🤖 AI VIDEO (single video)
      else if (category === "ai") {
        if (!req.files.file) {
          return res.status(400).json({ error: "File required" });
        }

        newWork = new Work({
          category,
          file: req.files.file[0].filename,
        });
      }

      // 🖼 IMAGE (Creative / Branding)
      else if (category === "creative" || category === "branding") {
        if (!req.files.file) {
          return res.status(400).json({ error: "Image required" });
        }

        newWork = new Work({
          category,
          file: req.files.file[0].filename,
        });
      }

      else {
        return res.status(400).json({ error: "Invalid category" });
      }

      await newWork.save();

      res.json({
        message: "Uploaded successfully ✅",
        data: newWork,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Upload failed ❌" });
    }
  }
);


// 🔥 GET ALL WORKS
router.get("/works", async (req, res) => {
  try {
    const works = await Work.find().sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed ❌" });
  }
});

export default router;