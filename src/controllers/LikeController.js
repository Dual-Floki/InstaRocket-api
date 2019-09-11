const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1; // Adiciona um novo 'Like' para a foto sempre que é feita a requisição

    await post.save();

    req.io.emit('like', post); // Envia uma informação em tempo real para os usuários logados

    return res.json(post);
  },
};
