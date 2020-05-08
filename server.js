const express = require("express");

const app = express();
const PORT = process.env.PORT || 8088;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);


const router =require("express").Router();
const notes = require("../db/notes.js");


router.get("/notes", function(req, res){
    notes.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})
router.post("/notes", function(req, res){
    notes.addNotes(req.body)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
})
router.delete("/notes/:id", function(req, res){
    notes.removeNote(req.params.id)
    .then(() => res.json(true))
    .catch(err => res.status(500).json(err));
})


app.listen(PORT,()=> console.log("Listening on PORT : " + PORT));