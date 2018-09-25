require("dotenv").config();

module.exports = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/therapize",
  SECRET_JWT_PASSPHRASE: process.env.SECRET_JWT_PASSPHRASE || "testphrase",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || "",
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY || "",
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET || "",
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || "",
  TWILIO_API_KEY: process.env.TWILIO_API_KEY || "",
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET || ""
};
