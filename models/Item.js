const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  
    item: { type: String, required: true, trim: true },
    cost: { type: String, default: "" },
    store: { type: String, required: true},
    category: { type: String, default: "general" }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
