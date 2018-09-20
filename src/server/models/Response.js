const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  questionaire: {
    type: Schema.Types.ObjectId,
    ref: "Questionaire"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number,
  answers: [Number],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Response", responseSchema);
