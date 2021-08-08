const util = require("util");
const fs = require("fs");
const { PassThrough } = require("stream");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Db {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        return this.read().then((notes) =>{
            let parseNotes
            try{
                parseNotes = [].concat(JSON.stringify(notes))
            
            } catch (err) {
                parseNotes = []
            }
            return parseNotes
        });
    }
    saveNotes(note) {
        const {title, text} = note;
        const id = 1;
        const newNote = {title, text, id};
        return this.getNotes()
        .then((notes)=> {
            [...notes,newNote]
        })
        .then((updateNotes) => {
            this.write(updateNotes)
        })
        .then(() =>{
            newNote
        });
    }
    deleteNotes(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note)=> note.id !== id))
        .then((filterNotes) =>{
            this.write(filteredNotes)
        })
    }
    
    
    
};

module.export = new Db();