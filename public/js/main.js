const socket = io.connect();

//PRODUCTOS DE TABLA

const addProduct = (e) => {
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('new-product', product);
  //document.getElementById('product-table').reset();
  //document.getElementById('formProduct').reset();
  return false;
};

//MENSAJES DE CHAT
socket.on('messages', (data) => renderMsj(data));

const renderMsj = (data) => {
  const chat = data
    .map((elem) => {
      return `<div>
      <strong>${elem.mail}</strong> 
      <strong> [${elem.fyh}] </strong>
      <em>: ${elem.text}</em>
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
