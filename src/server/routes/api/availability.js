const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Slot = require("../../models/Slot");

router.get("/", (req, res) => {
  Slot.findOne({ therapist: req.user._id }, (error, entry) => {
    if (error || entry == null) {
      res.send(false);
    } else {
      console.log(entry);
      res.send(entry.slots);
    }
  });
});

router.post("/update", (req, res) => {
  console.log(req.body.data);
  Slot.findOneAndUpdate({ therapist: req.user._id }, { slots: req.body.data }, { upsert: true })
    .then(result => {
      console.log(" slot saved in db");
      res.send({ result: true });
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

module.exports = router;
