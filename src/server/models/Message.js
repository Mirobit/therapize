const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  type: {
    type: String,
    enum: ["Main", "Reply"],
    default: "Main"
  },
  content: String,
  date: Date,
  title: {
    type: String
  },
  delivered: {
    type: Boolean,
    default: false
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
