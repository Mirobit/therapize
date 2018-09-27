const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/*", (req, res) => {
  const indexPath = process.env.IS_PRODUCTION
    ? "../public/app/index.html"
    : "../../../dist/index.html";
  res.sendFile(path.join(__dirname, indexPath));
});

module.exports = router;
