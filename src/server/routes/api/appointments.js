const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const crypto = require("crypto");
const Appointment = require("../../models/Appointment");
const moment = require("moment");
const Message = require("../../models/Message");

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
    Appointment.find({ user: req.user._id, status: { $ne: "Canceled" } })
      .populate({
        path: "therapist",
        select: "name"
      })
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
      new Message({
        title: "Your Appointment has been confirmed",
        content: "A therapist has confirmed your weekly appointment",
        to: result.user,
        from: req.user._id,
        date: Date.now()
        // dateStr: moment(req.body.date).format("ddd DD/MM/YYYY"),
      }).save();
      User.findOneAndUpdate({ _id: result.user }, { $push: { therapists: req.user._id } }).exec();
      User.findOneAndUpdate({ _id: req.user._id }, { $push: { clients: result.user } }).then(
        result => {
          console.log(result);
          res.send(true);
        }
      );
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

router.post("/delete", (req, res) => {
  // let mode = "therapist";
  // let modeApp = "therapists";
  // if (req.user.role === "Therapist") {
  //   mode = "user";
  //   modeApp = "clients";
  // }

  Appointment.findOneAndUpdate({ _id: req.body.id }, { status: "Canceled" })
    .then(result => {
      User.findOneAndUpdate(
        { _id: result.therapist },
        { $pull: { appointments: req.body.id } }
      ).exec();
      User.findOneAndUpdate({ _id: result.user }, { $pull: { appointments: req.body.id } }).then(
        result => {
          res.send(true);
        }
      );
      console.log("cancel", result);
      if (req.user.role === "Therapist") {
        new Message({
          title: "An appointment was canceled by your therapist",
          content: "Please shedule a new appoint or contact your therapist",
          to: result.user,
          from: result.therapist,
          date: Date.now()
        }).save();
      } else {
        new Message({
          title: "An appointment was canceled by a client",
          content: "Please contact your client for futher appointsments",
          to: result.therapist,
          from: result.user,
          date: Date.now()
        }).save();
      }
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

module.exports = router;
