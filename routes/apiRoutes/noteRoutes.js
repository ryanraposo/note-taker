const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { uid } = require('uid');
const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/notes');


router.get('/notes', (req, res) => {
    let results = notes;
    if (notes) {
        res.json(results);
    } else {
        res.sendStatus(404);
    };
});


router.post('/notes', (req, res) => {
    req.body.id = uid();

    if (!validateNote(req.body)) {
        res.status(400).send("Improperly formatted note.")
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});


router.delete('/notes/:id', (req, res) => {
    notes.forEach((note, index) => {
        if (note.id == req.params.id) {
            notes.splice(index, 1);
        }
    })
    fs.writeFileSync(path.join(__dirname, "../../data/notes.json"), JSON.stringify(notes));
    res.json(notes);
});


module.exports = router;