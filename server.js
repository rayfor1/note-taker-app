const express = require("express");

const app = express();
const PORT = process.env.PORT || 8088;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


const router = require("express").Router();
const path = require("path");
const notes = require("../db/notes.js");


// GET request to return the `index.html` file
router.get("*", function(req, res){
    res.sendFile(path.join(__dirname,"../public/index.html"))
})

// GET request to return the `notes.html` file
router.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname,"../public/notes.html"))
})

// GET request to read the `db.json` file and return all saved notes as JSON
router.get("/api/notes", function(req, res){
    notes.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})
// POST request to receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client
router.post("/api/notes", function(req, res){
    notes.addNotes(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})

// DELETE request to receive a query parameter containing the id of a note to delete.
router.delete("/api/notes/:id", function(req, res){
    notes.removeNote(req.params.id)
    .then(() => res.json(true))
    .catch(err => res.status(500).json(err));
})


app.listen(PORT,()=> console.log("Listening on PORT : " + PORT));