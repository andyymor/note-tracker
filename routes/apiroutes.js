const router = require("express").Router();

const database = require('../db/database.js');
//routes
router.get("/notes", (req, res) => {
    db.getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch(err => {
            res.status(500).json(err);
        });

});

router.post("/notes", (req, res) => {
    db.saveNotes(req.body)
        .then((notes) => {
            res.json(notes);
        })
        .catch(err => {
            res.status(500).json(err);
        });

});

router.delete("/notes/:id", (req, res) => {
    db.deleteNotes(req.params.id)
        .then(() => {
            res.json({ ok: true });
        })
        .catch(err => {
            res.status(500).json(err);
        });

});

module.exports = router;