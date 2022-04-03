const socket = io.connect();

//PRODUCTOS DE TABLA
const addProduct = (e) => {
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('new-product', product);
  document.getElementById('product-table').reset();
  return false;
};

//MENSAJES DE CHAT
socket.on('messages', (data) => renderMsj(data));

const renderMsj = (data) => {
  const chat = data
    .map((elem) => {
      return `<div>
      <b style="color:blue;">${elem.mail}</b> 
      <span style="color:brown;"> [${elem.fyh}] </span>
      <i style="color:green;">: ${elem.text}</i>
      </div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = chat;
};

const addMessage = (e) => {
  const message = {
    mail: document.getElementById('mail').value,
    fyh: new Date().toLocaleString(),
    text: document.getElementById('texto').value,
  };
  socket.emit('new-message', message);
  return false;
};
