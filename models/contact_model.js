const mongoose = require("mongoose");
const { Schema } = mongoose;
const Contact = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    cover: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", Contact);
