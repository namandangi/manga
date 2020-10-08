const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { saltRounds } = process.env;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribedMangas: [
    {
      ref: 'Manga',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  likedChapters: [
    {
      id: Number,
      chapterTitle: String,
      postedAt: String,
      chapterUrl: String,
    },
  ],
  genres: [
    {
      genreName: String,
      genreCount: Number,
    },
  ],
});

userSchema.pre('save', async function encrptPassword(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hashSync(user.password, Number(saltRounds));
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
