const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  therapist: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  slots: {
    Monday: [{}],
    Tuesday: [{}],
    Wensday: [{}],
    Thursday: [{}],
    Friday: [{}]
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wensday", "Thursday", "Friday"]
  },
  startTime: String,
  endTime: String,
  startate: {
    type: Date
  },
  endate: {
    type: Date
  },
  reccuring: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Slot", slotSchema);
