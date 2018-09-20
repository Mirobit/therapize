const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  therapist: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  slots: {
    monday: [{}],
    tuesday: [{}],
    wensday: [{}],
    thursday: [{}],
    friday: [{}]
  },
  day: {
    type: String,
    enum: ["monday", "tuesday", "wensday", "thursday", "friday"]
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
