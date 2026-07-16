import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    // 🔥 CATEGORY (video / ai / creative / branding)
    category: {
      type: String,
      required: true,
    },

    // 🎬 VIDEO COMPARISON (Before/After)
    before: {
      type: String,
      default: null,
    },
    after: {
      type: String,
      default: null,
    },

    // 📁 SINGLE FILE (image OR ai video)
    file: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

export default Work;