const socket = io("http://localhost:3000");
socket.on("connect", () => {
  socket.emit('message', 'Hello server!', 'Hello again, server!', { anio: 2021 }, function (response) {
    document.getElementById('message').innerHTML = response;
  })
});