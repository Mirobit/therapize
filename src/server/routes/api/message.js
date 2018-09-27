const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const User = require("../../models/User");

router.get("/", (req, res) => {
  Message.find({ to: req.user._id })
    .populate({
      path: "from",
      select: "name"
    })
    .then(messages => {
      console.log(messages);
      const contacts = [];
      for (let msg of messages) {
        if (contacts[msg.from._id] == undefined) {
          console.log("from", msg.from);
          let startCounter = 0;
          if (!msg.delivered) {
            startCounter = 1;
          }
          contacts[msg.from._id] = {
            messages: [msg],
            name: msg.from.name,
            _id: msg.from._id,
            counter: startCounter
          };
        } else {
          if (!msg.delivered) {
            contacts[msg.from._id].counter++;
          }

          contacts[msg.from._id].messages.unshift(msg);
        }
      }
      console.log(contacts);
      contactsarr = [];
      const keys = Object.keys(contacts);
      for (let key of keys) {
        contactsarr.push(contacts[key]);
      }
      res.send(contactsarr);
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

router.get("/unreadcount", (req, res) => {
  Message.countDocuments({ to: req.user._id, delivered: false })
    .then(count => {
      console.log("unread", count);
      res.send({ count });
    })
    .catch(error => {
      console.log(error);
      res.send({ count: 0 });
    });
});

router.get("/:id", (req, res) => {
  Message.findOneAndUpdate({ _id: req.params.id }, { delivered: true }).then(message => {
    console.log(message);
    res.send(message);
  });
});

router.delete("/:id", (req, res) => {
  Message.deleteOne({ _id: req.params.id })
    .then(result => {
      res.send(true);
    })
    .catch(error => {
      console.log(error);
      res.send(false);
    });
});

router.post("/", (req, res) => {
  console.log("body", req.body);
  new Message({
    title: req.body.title,
    content: req.body.content,
    to: req.body.to,
    from: req.user._id,
    date: Date.now()
    // dateStr: moment(req.body.date).format("ddd DD/MM/YYYY"),
  })
    .save()
    .then(result => {
      console.log("message saved in db");
      res.send({ result: true });
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

module.exports = router;
