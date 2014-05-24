
var socket = io.connect('http://192.168.1.4:3000');
socket.on('news', function (data) {
  console.log(data);
  $('.sockets').append('<div>' + data.tweet + '</div>');
  socket.emit('my other event', { my: 'data' });
});
