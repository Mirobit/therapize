const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const crypto = require("crypto");
const Appointment = require("../../models/Appointment");
const moment = require("moment");

router.get("/", (req, res) => {
  if (req.user.role === "Therapist") {
    Appointment.find({ therapist: req.user._id, status: { $ne: "Canceled" } })
      .populate({
        path: "user",
        select: "name diagnose"
      })
      .sort({ day: 1, starttime: 1 })
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
        res.send(false);
      });
  } else {
    Appointment.find({ user: req.user._id })
      .sort([["day", 1]])
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        console.log(error);
        res.send(false);
      });
  }
});

router.post("/confirm", (req, res) => {
  Appointment.findOneAndUpdate({ _id: req.body.id }, { status: "Confirmed" })
    .then(result => {
      res.send(true);
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

router.post("/delete", (req, res) => {
  Appointment.findOneAndUpdate({ _id: req.body.id }, { status: "Canceled" })
    .then(result => {
      res.send(true);
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

module.exports = router;
