const router = require("express").Router();
let Note = require("../db/notes");
let db = require("../public/db.json");

let notes = new Note();

// creating a note
router.post("/notes", function(req, res) {
  console.log(req.body);
  req.body.id = parseInt(req.body.id)
  if(db !== []) {
    req.body.id = 0
    db.push(req.body)
    if(req.body.id === 0){
      req.body.id = db[db.length - 1].id + 1
      res.json(db)
    } else if (req.body.id === 0){
      req.body.id = db[db.length - 1].id + 1
      db.push(req.body)
      res.json(db)
    }
  }
  }
  // notes
  //   .addNotes(req.body)
  //   .then(notes => res.json(notes))
  //   .catch(err => res.status(500).json(err));
);

// // retrieve a single note with id
router.get("/notes/:id", function(req, res) {
    console.log("something happened")
  return res.json(db);
});

// // delete a note
router.delete("/notes/:id", function(req, res) {
  notes
    .deleteNotes(req.params.id)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

module.exports = router;