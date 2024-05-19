const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    urlLink: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Url", urlSchema);
