// create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
// create server
var server = require('http').createServer(app);
// create server
var io = require('socket.io')(server);
// create server
var port = process.env.PORT || 3000;
// create server
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});
// create server
app.use(bodyParser.json());
// create server
app.use(bodyParser.urlencoded({ extended: true }));
// create server
app.use(express.static(__dirname));
// create server
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
// create server
app.get('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});
// create server
app.post('/comments', function(req, res) {
  fs.readFile(__dirname + '/comments.json', function(err, data) {
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(comments));
    });
  });
});
// create server
io.on('connection', function(socket) {
  console.log('A user connected');
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});
// create server
io.on('connection', function(socket) {
  socket.on('comment', function(comment) {
    io.emit('comment', comment);
  });
});
// create server
io.on('connection', function(socket) {
  socket.on('comment', function(comment) {
    fs.readFile(__dirname + '/comments.json', function(err, data) {
      var comments = JSON.parse(data);
      comments.push(comment);
      fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
        io.emit('comment', comment);
      });
    });
  });
});
