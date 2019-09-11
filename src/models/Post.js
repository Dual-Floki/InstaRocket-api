const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    // Criando as tabelas/campos do banco de dados
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', PostSchema);
