const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/find", (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(result => {
      const user = {
        topics: result.diagnose
      };
      console.log(user);
      res.send(user);
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

router.post("/find", (req, res) => {
  console.log("incoming", req.body.data);
  const newData = {
    name: req.body.data.name,
    age: req.body.data.age,
    description: req.body.data.description,
    skills: req.body.data.skills,
    gender: req.body.data.gender,
    available: req.body.data.available
  };
  User.findOne({ available: true, role: "Therapist" })
    .then(result => {
      console.log(result);
      console.log("profile updated");
      res.send({ result: true });
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

module.exports = router;
