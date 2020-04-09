const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    // GET stored notes then render notes  (call in POST and DELETE)
    app.get("/api/notes", (req, res) => {
        return res.sendFile(path.join(__dirname, "./db/db.json"));
    });


    // function to save all notes to json file
    const writeNotes = (notes) => {
        fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
            if (err) throw err;
            console.log("Notes saved!");
        });
    };


    // POST new notes
    app.post("/api/notes", (req, res) => {
        let newNote = req.body;

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) throw err;
            let storedNotes = JSON.parse(data)
            storedNotes.push(newNote);
            // create a unique id for each note saved
            for (i = 0; i < storedNotes.length; i++) {
                storedNotes[i].id = i + 1;
            };
            writeNotes(storedNotes);
        });
        res.json(true)
    });

    // DELETE saved notes
    app.delete("/api/notes/:id", (req, res) => {
        let deletedNote = req.params.id

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) throw err;

            let storedNotes = JSON.parse(data)
            storedNotes.splice(deletedNote - 1, 1);
            // restore ids for all elements of the array
            for (i = 0; i < storedNotes.length; i++) {
                storedNotes[i].id = i + 1;
            };
        
            console.log("object deleted!")
            writeNotes(storedNotes);
        });
        res.json(true)
    });

}