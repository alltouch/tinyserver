var staticMapper = require('./staticMapper.js'),
    compile = require('./sys/compile.js');

var globalMapper= {
  className: 'globalMapper',
  ext: ['/**.html', '/'],
  process: function(req, res){
    var url = (req.url == '/' ? '/index.html' : req.url );

    return this.parent('process', [req, res, '/html' + url]);
  }
};

module.exports = compile.do(globalMapper, staticMapper);
