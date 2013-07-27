var http = require('http');
var mappers = require('./server/mappers.js');

http.createServer(function (req, res) {
  var status = !mappers.execute(req, res);
  console.log('Result status', status ? 'ok' : 'bad');
}).listen(3000, '0.0.0.0');
console.log('Server running at http://0.0.0.0:3000/');
