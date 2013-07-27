var staticMapper = require('./staticMapper.js'),
    globalMapper = require('./globalMapper.js'),
    errorMapper = require('./errorMapper.js');

function correctPath(path){
  var result = path;
  result = result.replace(/\./g, '\.'); // . -> \.
  result = result.replace(/^\*([^\*])/, '.*$1'); // start * -> .*
  result = result.replace(/([^\*])\*([^\*])/g, '$1.*$2'); //middle * -> .*
  result = result.replace(/([^\*])\*$/, '$1.*'); // end * -> .*
  result = result.replace(/^\*$/, '.*'); // single * -> .*
  result = result.replace(/\*{2,2}/i, '[^/]*'); // ** -> [^/]*
  return '^' + result + '$';
};

module.exports = {
  mappers: [globalMapper, staticMapper, errorMapper],
  execute: function(req, res){
    var result = this.mappers.every(function(mapper){
      console.log('Checking', mapper.className);
      mapper.ext = mapper.ext.length ? mapper.ext : [mapper.ext];
      return mapper.ext.every(function(path){
        var pattern = correctPath(path);
        console.log('Checking', pattern);
        if(req.url.match(new RegExp(pattern))){
          console.log('mapping founded for', req.url);
          if(mapper.process(req, res)){
            return false;
          }  
          console.log(mapper.className, 'cannot handle it');
        }
        return true;
      });
    });
    console.log('Result status', result ? 'bad' : 'ok');
  }
};
