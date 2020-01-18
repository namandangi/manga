var mongoose = require('mongoose');

var mangaSchema = new mongoose.Schema({
    title : String,
    name : String,
    url : [String]
});

var Manga = mongoose.model("Manga",mangaSchema);

module.exports = Manga;