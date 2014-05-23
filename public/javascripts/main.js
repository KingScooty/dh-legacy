
var socket = io.connect('http://localhost');
socket.on('news', function (data) {
  console.log(data);
  $('.sockets').append('<div>' + data.hello + '</div>');
  socket.emit('my other event', { my: 'data' });
});
