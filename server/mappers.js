var staticMapper = require('./staticMapper.js'),
    globalMapper = require('./globalMapper.js'),
    errorMapper = require('./errorMapper.js'),
    controllerMapper = require('./controllerMapper.js'),
    Logger = require('./sys/logger.js');



module.exports = {
  mappers: [globalMapper, staticMapper, controllerMapper, errorMapper],
  execute: function(req, res){
    return this.mappers.every(function(mapperClass){
      var mapper = new mapperClass();
      Logger.log('Checking', mapper.className);

      return mapper.getExt().every(function(pattern){
        Logger.log('Checking', pattern);
        if(req.url.match(new RegExp(pattern))){
          Logger.log('mapping founded for', req.url);
          if(mapper.process(req, res)){
            return false;
          }
          Logger.log(mapper.className, 'cannot handle it');
        }
        return true;
      });

    });
  }
};
