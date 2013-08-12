var defaultMapper = {
    className: 'defaultMapper',
    ext: [],
    log: function(){
        var arr = [this.className, ':'];
        for(var i =0; i < arguments.length; i++){
            arr.push(arguments[i]);
        }
        console.log.apply(console, arr);
    },
    process: function(){
        this.log('default process handler. should be overriden.');
        throw "Process handler should be overriden";
    },
    correctPath: function(path){
        var result = path;
        result = result.replace(/\./g, '\.'); // . -> \.
        result = result.replace(/^\*([^\*])/, '.*$1'); // start * -> .*
        result = result.replace(/([^\*])\*([^\*])/g, '$1.*$2'); //middle * -> .*
        result = result.replace(/([^\*])\*$/, '$1.*'); // end * -> .*
        result = result.replace(/^\*$/, '.*'); // single * -> .*
        result = result.replace(/\*{2,2}/i, '[^/]*'); // ** -> [^/]*
        return '^' + result + '$';
    },
    getExt: function(){
        var ext = this.ext.length ? this.ext : [this.ext];
        return ext.map(function(ext){
            return this.correctPath(ext);
        }, this);
    }
};

var compile = require('./compile.js');
module.exports = compile.do(defaultMapper);