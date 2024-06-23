const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  endpoint: { type: String, required: true },
  method: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", LogSchema);
