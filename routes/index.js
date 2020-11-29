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

router
  .route("/api/notes")
  .get((_, res) => {
    res.json(readDB());
  })
  .post((req, res) => {
    const newNote = req.body;
    newNote.id = idIterator;
    idIterator++;
    const newNoteJSON = JSON.stringify(newNote);
    console.log("newNoteJSON :>> ", newNoteJSON);
    const bab = readDB();
    const notesArr = JSON.parse(readDB());
    notesArr.push(newNote);
    const notesJSON = JSON.stringify(notesArr);
    writeDB(notesJSON);
    res.json(newNote);
  });
router.route("api/notes/:id").delete((_req, _res) => {
  noteArr = JSON.parse(readDB());
  const toDel = noteArr.forEach((note, idx) => {
    if ((note.id = id)) {
      return idx;
    }
  });
  noteArr.splice(toDel(), 1);
  const newJSON = JSON.parse(noteArr);
  writeDB(newJSON);
});

module.exports = router;
