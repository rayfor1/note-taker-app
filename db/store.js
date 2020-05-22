const fs = require("fs");
const path = require("path");
const util = require("util");
const express = require("express");
const app = express();

// Creates a promise, which the program will complete before continuing to run. 
const readFileAsync = util.promisify(fs.readFile);
// Creates a promise, which the program will complete before continuing to run. 
const writeFileAsync = util.promisify(fs.writeFile);

// Creates a new class called "Store"

class Store {
    constructor() {
        this.lastId = 0;
    };
    read() {
        return readFileAsync(path.join(__dirname, "db.json"), "utf8");
    };

    // To write notes
    write(note) {
        return writeFileAsync(path.join(__dirname, "db.json"), JSON.stringify(note));
    };

    // To get notes
    getNotes() {
        return this.read().then(notes => {
            let parsedNotes = JSON.parse(notes);
            console.log(parsedNotes);
            return parsedNotes;
        });
    };

    // To add Notes:
    addNote(newNote) {

        console.log(newNote);
        return this.getNotes().then(notes => {
            const newNoteList = [...notes, newNote];
            console.log(newNoteList);
            return this.write(newNoteList);
        })

    };

    // To delete notes
    deleteNotes(title) {
        return this.getNotes()
            .then(notes => {
                console.log("This note says " + title);
                for (var i = 0; i < notes.length; i++) {
                    if (notes[i].title === title) {
                        notes.splice(i, 1);
                        console.log(notes);
                        break;
                    }
                }
                this.write(notes);
            })
    }
};

const store = new Store();

module.exports = store;