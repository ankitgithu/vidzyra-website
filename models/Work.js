import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    title: String,
    category: String,   // ✅ FIX
    before: String,
    after: String,
    file: String        // ✅ ADD
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema);