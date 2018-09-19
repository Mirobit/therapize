const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  therapist: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  startat: {
    type: Date
  },
  endat: {
    type: Date
  },
  inhouse: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model("Meeting", meetingSchema);
