const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const availabilityRoutes = require("./availability");
const profileRoutes = require("./profile");
const matchRoutes = require("./match");
const chatRoutes = require("./chat");
const messageRoutes = require("./message");
const appointmentsRoutes = require("./appointments");
const { userMiddleware, checkLoggedIn } = require("../../utils/middleware");

router.use(userMiddleware);

router.get("/", (req, res) => {
  res.send({ hello: true });
});

router.get("/protected", checkLoggedIn, (req, res) => {
  console.log("USER", req.user);
  res.send({ success: true });
});

router.use("/auth", authRoutes);
router.use("/availability", availabilityRoutes);
router.use("/profile", profileRoutes);
router.use("/match", matchRoutes);
router.use("/chat", chatRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/message", messageRoutes);

router.use((req, res) => {
  res.status(404).send({ error: "not-found" });
});

module.exports = router;
