const mongoose = require('mongoose');

const chapterScehma = new mongoose.Schema({
  chapterId: {
    type: Number,
    required: true,
    min: 0,
  },
  mangaName: {
    ref: 'Manga',
    type: mongoose.Schema.Types.ObjectId,
  },
  chapterTitle: {
    type: String,
    required: true,
    trim: true,
  },
  postedAt: {
    type: String,
  },
  chapterUrl: {
    type: String,
    required: true,
  },
  chapterImgUrl: [
    {
      type: String,
      trim: true,
    },
  ],
});

const Chapter = mongoose.model('Chapter', chapterScehma);

module.exports = Chapter;
