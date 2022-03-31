const express = require('express');
const app = express();

const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//SERVER
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on('error', (error) =>
  console.log(`Error en servidor ${error}`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
