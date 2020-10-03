const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: String,
  name: String,
  url: [String],
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
