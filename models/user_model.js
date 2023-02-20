const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "owner"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", User);
