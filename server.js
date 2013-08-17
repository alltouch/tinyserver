var http = require('http');
var mappers = require('./server/mappers.js');
var Logger = require('./server/sys/logger.js');

http.createServer(function (req, res) {
  var status = !mappers.execute(req, res);
    Logger.log('Result status ' + (status ? 'ok' : 'bad'));
}).listen(3000, '0.0.0.0');
Logger.log('Server running at http://0.0.0.0:3000/');
