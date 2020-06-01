const express = require ("express");
const path = require ("path");
const app = express();

var PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/api")(app);
require("./routes/html")(app);

app.listen(PORT, function(){
  console.log("http://localhost:" + PORT);
  })



















// Displays all characters
//app.get("/api/characters", function(req, res) {
 // return res.json(characters);
//});
