//  Responsável pelas regras de negócio / Lógica da aplicação

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    // Retorna todas os pots, ordenados por data da envio
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts); // retorna em formato JSON
  },
  async store(req, res) {
    const { author, place, description, hashtags } = req.body; // Recebe as informações do arquivo
    const { filename: image } = req.file; // Recebe a imagem

    const [name] = image.split('.');
    const fileName = `${name}.jpg`; // Transforma o arquivo em .jpg

    await sharp(req.file.path) // Converte o arquivo enviado
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', fileName));

    fs.unlinkSync(req.file.path); // Deleta o arquivo original

    const post = await Post.create({
      // Salva/Envia para o banco de dados
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post); // Envia uma informação em tempo real para os usuários logados

    return res.json(post);
  },
};
