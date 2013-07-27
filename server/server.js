var http = require('http');
var mappers = require('./mapping.js');

http.createServer(function (req, res) {
  mappers.execute(req, res);
}).listen(3000, '0.0.0.0');
console.log('Server running at http://0.0.0.0:3000/');