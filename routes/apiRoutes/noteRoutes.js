const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const { uid } = require('uid');
const { createNewNote, validateNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');


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