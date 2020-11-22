const router = require("express").Router();
const fs = require("fs");

router
  .route("api/notes")
  .get((_, res) => {
    function readDB() {
      fs.readFile("../db/db.json", "utf8", (err, data) => {
        if (err) console.log(err);
        return data;
      });
    }

    notes = readDB();
    res.json(notes);
  })
  .post((req, _res) => {
    const newNote = JSON.parse(req.body);
    iterator = 1;
    newNote.id = iterator;
    iterator++;
    const noteJSON = JSON.stringify(newNote);
    fs.appendFile("../db/db.json", noteJSON, (err) => {
      if (err) console.log(err);
    });
  });
