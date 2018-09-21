const express = require("express");
const router = express.Router();
const User = require("../../models/User");

router.get("/", (req, res) => {
  User.findOne({ _id: req.user._id })
    .then(result => {
      const user = {
        name: result.name,
        age: result.age,
        description: result.description,
        skills: result.skills,
        gender: result.gender,
        available: result.available
      };
      console.log(user);
      res.send(user);
    })
    .catch(error => {
      console.log(error);
      res.send({ result: false });
    });
});

router.post("/update", (req, res) => {
  console.log("incoming", req.body.data);
  const newData = {
    name: req.body.data.name,
    age: req.body.data.age,
    description: req.body.data.description,
    skills: req.body.data.skills,
    gender: req.body.data.gender,
    available: req.body.data.available
  };
  User.findOneAndUpdate({ _id: req.user._id }, newData, { new: true, runValidators: true })
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
