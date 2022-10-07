const { optionsMySql } = require('./mysql/options');
const { optionsSqlite } = require('./sqlite3/options');

const express = require('express');
const app = express();

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const ContenedorMemoria = require('./controllers/ContenedorMemoria.js');
const ContenedorArchivo = require('./controllers/ContenedorArchivo.js');

//SERVER-----------------
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP en puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);
//-----------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const products = new ContenedorMemoria(optionsMySql, 'products');
const messages = new ContenedorArchivo(optionsSqlite);

io.on('connection', async (socket) => {
  console.log('Usuario nuevo conectado');

  io.sockets.emit('products', products.listarAll());
  io.sockets.emit('messages', await messages.listarAll());

  socket.on('new-product', (data) => {
    products.guardar(data);
    io.sockets.emit('products', products.listarAll());
  });

  socket.on('new-message', async (data) => {
    await messages.guardar(data);
    io.sockets.emit('messages', await messages.listarAll());
  });
});

app.get('/', (req, res) => {
  res.render('index', { products });
});
