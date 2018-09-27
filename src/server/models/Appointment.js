const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  therapist: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  day: {
    type: String,
    enum: ["Monday", "Tuesday", "Wensday", "Thursday", "Friday"]
  },
  starttime: {
    type: String
  },
  endtime: {
    type: String
  },
  startat: {
    type: Date
  },
  endat: {
    type: Date
  },
  duration: {
    type: Number,
    enum: [25, 55]
  },
  inhouse: {
    type: Boolean,
    default: true
  },
  reason: {
    type: String
  },
  roomid: {
    type: String
  },
  skype: {
    type: String
  },
  status: {
    type: String,
    enum: ["Unconfirmed", "Confirmed", "Live", "Done", "Canceled"]
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
