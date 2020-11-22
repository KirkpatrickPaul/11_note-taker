const router = require("express").Router();
const fs = require("fs");

function readDB() {
  fs.readFile("../db/db.json", "utf8", (err, data) => {
    if (err) console.log(err);
    return data;
  });
}

router
  .route("api/notes/:id")
  .get((_, res) => {
    notes = readDB();
    res.json(notes);
  })
  .post((req, res) => {
    const newNote = JSON.parse(req.body);
    iterator = 1;
    newNote.id = iterator;
    iterator++;
    const noteJSON = JSON.stringify(newNote);
    fs.appendFile("../db/db.json", noteJSON, (err) => {
      if (err) console.log(err);
    });
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
    fs.writeFile("../db/db.json", newJSON, (err) => {
      if (err) console.log(err);
    });
  });

module.exports = router;
