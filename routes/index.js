const router = require("express").Router();
const fs = require("fs");
const path = require("path");

function readDB() {
  return fs.readFileSync(
    path.join(__dirname, "..", "db", "db.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log("data :>> ", data);
      return data;
    }
  );
}

function writeDB(toWrite) {
  console.log("toWrite :>> ", toWrite);
  fs.writeFileSync(
    path.join(__dirname, "..", "db", "db.json"),
    toWrite,
    (err) => {
      if (err) console.error(err);
    }
  );
}
let idIterator = 1;

router.route("/api/notes").post((req, res) => {
  const newNote = req.body;
  newNote.id = idIterator;
  idIterator++;
  const newNoteJSON = JSON.stringify(newNote);
  const bab = readDB();
  console.log("readDB() :>> ", readDB());
  const notesArr = JSON.parse(readDB());
  console.log("notesArr :>> ", notesArr);
  notesArr.push(newNote);
  const notesJSON = JSON.stringify(notesArr);
  writeDB(notesJSON);
  res.json(newNoteJSON);
});
router.route("api/notes/:id").delete((_req, _res) => {
  notesJSON = readDB();
  noteArr = JSON.parse(notesJSON);
  const toDel = noteArr.forEach((note, idx) => {
    if ((note.id = id)) {
      return idx;
    }
  });
  noteArr.splice(toDel, 1);
  const newJSON = JSON.parse(noteArr);
  writeDB(newJSON);
});

module.exports = router;
