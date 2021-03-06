const express = require('express');
const app = express();

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//SERVER
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP en puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

const products = [];
const messages = [];

io.on('connection', (socket) => {
  console.log('Usuario nuevo conectado');
  socket.emit('products', products);
  socket.emit('messages', messages);

  socket.on('new-product', (data) => {
    products.push(data);
    io.sockets.emit('products', products);
  });

  socket.on('new-message', (data) => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });
});

app.get('/', (req, res) => {
  res.render('index', { products });
});
