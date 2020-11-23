const router = require("express").Router();
const fs = require("fs");

function readDB() {
  fs.readFile("../db/db.json", "utf8", (err, data) => {
    if (err) console.log(err);
    return data;
  });
}

function writeDB(toWrite) {
  fs.writeFile("../db/db.json", toWrite, (err) => {
    if (err) console.log(err);
  });
}
let idIterator = 1;

router
  .route("api/notes/:id")
  .get((_, res) => {
    notes = readDB();
    res.json(notes);
  })
  .post((req, res) => {
    const newNote = JSON.parse(req.body);
    newNote.id = idIterator;
    idIterator++;
    const noteJSON = JSON.stringify(newNote);
    const oldNote = readDB();
    const notesArr = JSON.parse(oldNote);
    notesArr.push(newNote);
    const noteJSON = JSON.stringify(notesArr);
    writeDB(notesArr);
    res.json(noteJSON);
  })
  .delete((_req, _res) => {
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
