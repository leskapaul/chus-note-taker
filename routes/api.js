//const db = require("../db/db.json");
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.send(fs.readFileSync(__dirname + "/../db/db.json", "utf8"));
  });
  app.post("/api/notes", function (req, res) {
    // load our database
    let savedNotes = JSON.parse(fs.readFileSync(__dirname + "/../db/db.json", "utf8"));

    // figure out what the next note id is by looking at what's already in the database
    var newNote = {
      id: savedNotes.length + 1,
      title: req.body.title,
      text: req.body.text,
    }
    
    // add the new node and save it in our database
    savedNotes.push(newNote)
    fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(savedNotes));

    // return true, i guess to tell client that the post was successful
    res.json(true);
  
  })
  app.delete("/api/notes/:id", function(req, res) {
    let savedNotes = JSON.parse(fs.readFileSync(__dirname + "/../db/db.json", "utf8"));
    let noteID = req.params.id;
    let newID = 0;
    console.log(`Deleting note with ID ${noteID}`);
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteID;
    })
    // for (currentNote of savedNotes) {
    //   currentNote.id = newID.toString();
    //   newID++;
  //}

  fs.writeFileSync(__dirname + "/../db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);
    // fs.readFile(__dirname + "/../db/db.json", "utf8", (err, data) => {
    //   if (err) throw err;
    //   const allNotes = JSON.parse(data);
    //   const newAllNotes = allNotes.filter(note => note.id != noteID);
    //   fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(newAllNotes, null, 2), (err) => {
    //     if (err) throw err;
    //     res.send(db)
    //   });
    // });
  });
};
