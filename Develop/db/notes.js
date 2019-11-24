const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

 class Notes {
  constructor() {
    this.lastid = 0;
  }
  getNotes() {
    return this.read().then(notes => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }
  
  addNotes(newNotes) {
    const { title, text } = newNotes;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Increment `this.lastId` and assign it to `newNote.id`
    const newNote = { title, text, id: 1 };
    console.log(newNote)

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then(notes => [...notes, newNote])
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);
  }
  deleteNotes(id) {
    const deletedNote = this.getNotes()
    .then(notes => notes.filter(note => note.id !== parseInt(id)))
    .then(filteredNotes => this.write(filteredNotes))
    .then(console.log(deletedNote))

    return deletedNote

  }
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
}


module.exports = Notes