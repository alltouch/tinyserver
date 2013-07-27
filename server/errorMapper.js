var defaultMapper = require('./sys/defaultMapper.js'),
    compile = require('./sys/compile.js');

var errorMapper = {
  className: 'errorMapper',
  ext: ['*'],
  process: function(req, res){
    this.log('File not found for', req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('File not found for ' + req.url + '\n');
    return true;
  }
};

module.exports = compile.do(errorMapper, defaultMapper);
