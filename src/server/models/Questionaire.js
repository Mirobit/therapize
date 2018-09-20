const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionaireSchema = new Schema({
  therapist: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String
  },
  questions: {
    type: [
      {
        question: String,
        answers: [
          {
            text: String,
            value: Number
          }
        ]
      }
    ]
  },
  results: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      score: Number,
      answers: [Number]
    }
  ],
  status: {
    type: String,
    enum: ["Unconfirmed", "Confirmed", "Live", "Done", "Canceled"]
  }
});

module.exports = mongoose.model("Questionaire", questionaireSchema);
