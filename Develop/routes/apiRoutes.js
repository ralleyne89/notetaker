const router = require('express').Router();
let Note =  require('../db/notes');
const path = require('path');
let notes = new Note()

router.get('/notes', function(req, res){
    console.log('running get request')
    notes.getNotes() .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

router.post("/notes", function(req, res) {
    var newNote = req.body;
  
    console.log(newNote);
  
    notes.push(newNote);
  
    res.json(newNote);
  });

router.delete('/notes/:id', function(req, res){
    notes.deleteNotes(req.params.id) .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

module.exports = router;