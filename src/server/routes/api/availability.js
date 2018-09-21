const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Slot = require("../../models/Slot");

router.get("/", (req, res) => {
  User.findOne({ _id: req.user._id }, (error, entry) => {
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
  User.findOneAndUpdate({ _id: req.user._id }, { slots: req.body.data })
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
