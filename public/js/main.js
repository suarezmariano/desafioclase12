const socket = io.connect();

socket.on('products', { products });

const addProduct = (e) => {
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: document.getElementById('thumbnail').value,
  };
  socket.emit('new-product', product);
  return false;
};

const render = (data) => {
  const chat = data
    .map((elem, index) => {
      return `<div>
      <strong>${elem.mail}</strong> 
      <strong> [${elem.fyh}] </strong>
      <em>: ${elem.text}</em>
      </div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = chat;
};

socket.on('messages', (data) => render(data));

const addMessage = (e) => {
  e.preventDefault();
  const message = {
    mail: document.getElementById('mail').value,
    fyh: new Date().toLocaleString(),
    text: document.getElementById('texto').value,
  };
  socket.emit('new-message', message);
  return false;
};
