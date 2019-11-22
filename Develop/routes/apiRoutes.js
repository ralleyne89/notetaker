const router = require('express').Router();
let Note =  require('../db/notes');

let notes = new Note()




router.get('/notes', function(req, res){
    console.log('running get request')
    notes.getNotes() .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

router.post('/notes', function(req, res){
    console.log(req.body)
    notes.addNotes(req.body) .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

router.delete('/notes/:id', function(req, res){
    notes.deleteNotes(req.params.id) .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

module.exports = router;