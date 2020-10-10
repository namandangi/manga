const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  mangaUrl: String,
  imgUrl: String,
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Unrated'],
    max: 5,
  },
  release: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  genre: [String],
  chapter: [
    {
      ref: 'Chapter',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
