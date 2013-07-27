var fs = require('fs');
var staticMapper= {
  className: 'staticMapper',
  ext: ['/html/*', '/css/*'],
  log: function(){
    var arr = [this.className, ':'];
    for(var i =0; i < arguments.length; i++){
      arr.push(arguments[i]);
    }
    console.log.apply(console, arr);
  },
  getMime: function(path){
    var arr = path.split('.');
    var ext = arr[arr.length-1];
    if( ['html', 'css'].indexOf(ext) > -1 ){
      return 'text/' + ext;
    } else if(['jpg', 'gif', 'png'].indexOf(ext) > -1){
      return 'image/' + ext;
    } else {
      return 'text/plain';
    }
  },
  process: function(req, res){
    return this._process(req, res, req.url, true);
  },
  _process: function(req, res, url, sendError){
    var finished = false;
    var path = '..' + url.replace(/\.\./i, '');
    this.log(path);
    fs.existsSync(path, function(exists){
      if(!exists){
        if(sendError){
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end(req.url + ' File not found\n');
        }
        finished = true;
      }
    });
    this.log('Static file founded');
    
    if(finished){
      return sendError;
    }
    
    var stat = fs.statSync(path);
    this.log('file size', stat.size);
    res.writeHead(200, {
      'Content-Type': this.getMime(path),
      'Content-Length': stat.size
    });
    var readStream = fs.createReadStream(path);
    readStream.pipe(res);
    return true;
  }
};

module.exports = staticMapper;
