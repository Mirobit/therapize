const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ip: {
    type: String
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  age: {
    type: Number
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  country: {
    type: String
  },
  paying: {
    type: Boolean,
    default: false
  },
  diagnose: {
    type: [String]
  },
  skills: {
    type: [String],
    enum: ["depression", "anxiety", "stress", "anorexia"]
  },
  available: {
    type: Boolean,
    defautl: false
  },
  therapists: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  slots: {
    monday: [{}],
    tuesday: [{}],
    wensday: [{}],
    thursday: [{}],
    friday: [{}]
  },
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment"
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  role: {
    type: String,
    enum: ["User", "Therapist", "Admin"],
    default: "User"
  },
  profilePicture: {
    type: String,
    default: "/placeholder-male.png"
  }
});

module.exports = mongoose.model("User", userSchema);
