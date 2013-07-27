var staticMapper = require('./staticMapper.js'),
    globalMapper = require('./globalMapper.js'),
    errorMapper = require('./errorMapper.js');



module.exports = {
  mappers: [globalMapper, staticMapper, errorMapper],
  execute: function(req, res){
    return this.mappers.every(function(mapperClass){
      var mapper = new mapperClass();
      console.log('Checking', mapper.className);

      return mapper.getExt().every(function(pattern){
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
  }
};
