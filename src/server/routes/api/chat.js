const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const crypto = require("crypto");
const Appointment = require("../../models/Appointment");
const moment = require("moment");
let AccessToken = require("twilio").jwt.AccessToken;
let VideoGrant = AccessToken.VideoGrant;
const config = require("../../config");

router.get("/token", (req, res) => {
  var identity = req.user._id;

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  var token = new AccessToken(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_API_KEY,
    config.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token
  token.identity = identity;

  const grant = new VideoGrant();
  // Grant token access to the Video API features
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response
  res.send({
    identity: identity,
    token: token.toJwt()
  });
});

module.exports = router;
