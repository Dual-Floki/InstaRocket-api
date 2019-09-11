const multer = require('multer');
const path = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    // --LINHA DE CIMA-- Caminho para receber as imagens enviadas
    filename(req, file, cb) {
      cb(null, file.originalname); // Salvar o arquivo com o nome original
    },
  }),
};
