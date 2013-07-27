var staticMapper = require('./staticMapper.js');
var globalMapper= {
  className: 'globalMapper',
  ext: ['/**.html', '/'],
  process: function(req, res){
    
    if(req.url == '/'){
      return staticMapper._process(req, res, '/html/index.html', false);
    }
    
    return staticMapper._process(req, res, '/html' + req.url, false);
  }
};

module.exports = globalMapper;