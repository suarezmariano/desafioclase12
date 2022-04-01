const socket = io.connect();

const render = (data) => {
  const html = data
    .map((elem, index) => {
      return `<div>
      <strong>${elem.mail}</strong>
      <em>${elem.text}</em>
      </div>`;
    })
    .join(' ');
  document.getElementById('messages').innerHTML = html;
};

socket.on('messages', (data) => render(data));

const addMessage = (e) => {
  const message = {
    mail: document.getElementById('mail').value,
    text: document.getElementById('texto').value,
  };
  socket.emit('new-message', message);
  return false;
};
