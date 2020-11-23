const router = require("express").Router();
const path = require("path");

router.route("/notes").get((_, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

router.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
