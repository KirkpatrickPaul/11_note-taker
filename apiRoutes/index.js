const router = require("express").Router();
const fs = require("fs");
const path = require("path");

var date = new Date();

function readDB() {
  return fs.readFileSync(
    path.join(__dirname, "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
      }
      return data;
    }
  );
}

function writeDB(toWrite) {
  fs.writeFileSync(
    path.join(__dirname, "..", "db", "db.json"),
    toWrite,
    (err) => {
      if (err) console.error(err);
    }
  );
}

router
  .route("/api/notes")
  .get((_, res) => {
    res.json(readDB());
  })
  .post((req, res) => {
    const newNote = req.body;
    // found this quasi-unique id generator at
    // https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time
    // will be unique for this, but can add Math.random to it to make it more unique
    // if there will be more server calls in the same millisecond.
    newNote.id = date.getTime();
    const newNoteJSON = JSON.stringify(newNote);
    const bab = readDB();
    const notesArr = JSON.parse(readDB());
    notesArr.push(newNote);
    const notesJSON = JSON.stringify(notesArr);
    writeDB(notesJSON);
    res.json(newNote);
  });
router.route("/api/notes/:noteID").delete((req, res) => {
  noteArr = JSON.parse(readDB());
  let toDel;
  noteArr.forEach((note, idx) => {
    if ((note.id = req.params.noteID)) {
      toDel = idx;
    }
  });
  noteArr.splice(toDel, 1);
  const newJSON = JSON.stringify(noteArr);
  writeDB(newJSON);
  res.sendStatus(204);
});

module.exports = router;
