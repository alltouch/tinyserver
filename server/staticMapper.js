var fs = require('fs'),
    defaultMapper = require('./sys/defaultMapper.js'),
    compile = require('./sys/compile.js');

var staticMapper = {
  className: 'staticMapper',
  ext: ['/html/*', '/css/*', '/fonts/*', '/images/*', '/js/*'],
  getMime: function(path){
    var arr = path.split('.');
    var ext = arr[arr.length-1];
    if( ['html', 'css'].indexOf(ext) > -1 ){
      return 'text/' + ext;
    } else if(['jpg', 'gif', 'png'].indexOf(ext) > -1){
      return 'image/' + ext;
    } else if(ext == 'js'){
        return 'application/javascript';
    } else {
      return 'text/plain';
    }
  },
  process: function(req, res, url){
    url = url || req.url;

    var path = 'app' + url.replace(/\.\./i, '');
    this.log('Compiled path', path);

    if(!fs.existsSync(path)){
        return false;
    }

    var stat = fs.statSync(path);
    this.log('Static file found. Size:', stat.size);

    res.writeHead(200, {
      'Content-Type': this.getMime(path),
      'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(path);
    readStream.pipe(res);
    return true;
  }
};

module.exports = compile.do(staticMapper, defaultMapper);
