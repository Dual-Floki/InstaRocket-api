const express = require('express'); // Usado para lidar com rotas, parametros e respostas para os usuários
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
// Dependência para poder acessar o backend pelo ReactJS e ReactNative
const app = express();

const server = require('http').Server(app); // Para permitir protocolo HTTP
const io = require('socket.io')(server); // Para permitir protocolo "Web socket", comunicação em tempo real

mongoose.connect(
  'mongodb+srv://semana:semana@cluster0-v3mcw.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
); // Conexão com o banco de dados

app.use((req, res, next) => {
  // Repassa as informações em tempo real para o Front End
  req.io = io;

  next();
});

app.use(cors()); // Permitir que todos os endereços tenham acesso à aplicação.

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
);
// --LINHA DE CIMA-- Uma rota para acessar as imagens que foram enviadas

app.use(require('./routes')); // Arquivo separado de rotas

server.listen(3333);
