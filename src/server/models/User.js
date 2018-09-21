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
    enum: ["drepession", "anxiety", "stress", "anorexia"]
  },
  available: {
    type: Boolean,
    defautl: false
  },
  therapist: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  clients: {
    type: [Schema.Types.ObjectId],
    ref: "User"
  },
  role: {
    type: String,
    enum: ["User", "Therapist", "Admin"],
    default: "User"
  },
  profilePicture: {
    type: String,
    default: "./placeholder-male.png"
  }
});

module.exports = mongoose.model("User", userSchema);
