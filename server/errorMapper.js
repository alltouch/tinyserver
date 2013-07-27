var errorMapper= {
  className: 'errorMapper',
  ext: ['*'],
  log: function(){
    var arr = [this.className, ':'];
    for(var i =0; i < arguments.length; i++){
      arr.push(arguments[i]);
    }
    console.log.apply(console, arr);
  },
  process: function(req, res){
    this.log('mapping not found for ', req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Mapping not found for ' + req.url + '\n');
    return true;
  }
};
  
module.exports = errorMapper;
