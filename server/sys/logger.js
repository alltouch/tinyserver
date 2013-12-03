var fs = require('fs');

var Logger = {
    className: 'Logger',

    /**
     * Syntax:
     * [Time]: [Message]
     */
    log: function(){
        fs.appendFileSync(this.logFile, this.createText(arguments) + "\r\n");
        //console.log.apply(console, arr);
    },

    logArray: function(className, arr){
        fs.appendFileSync(this.logFile, this.createText([className, ':'], arr) + "\r\n");
    },

    createText: function(params, params2){
        params2 = params2 || [];

        var result = ['[', this.getTime(), '] :'];
        for(var i=0; i<params.length; i++){
            result.push(params[i]);
        }
        for(i=0; i<params2.length; i++){
            result.push(params2[i]);
        }
        return result.join(' ');
    },

    sysLog: function(){
        var arr = ['[', this.getTime(), '] :'];
        for(var i =0; i < arguments.length; i++){
            arr.push(arguments[i]);
        }
        console.log.apply(console, arr);
    },

    init: function(){
        var file = this.getFile();
        this.sysLog('Init log file :', file);

        this.logFile = file;

        if(!fs.existsSync(file)){
            console.log(process.cwd());
            console.log(__filename);
            console.log(__dirname);
            var fd = fs.openSync("/app/server/" + file, "a+");
            fs.closeSync(fd);
        }
    },

    getFile: function(index){
        var logName = this.getLogName();
        index = index || 0;
        var fileName = this.getFormattedLogName(logName, index);

        if(!fs.existsSync(fileName)){
            return fileName;
        }

        var stat = fs.statSync(fileName);
        if(stat.size < 1024 * 1024 * 10){
            return fileName;
        }

        return this.getFile(index + 1);
    },


    /**
     * Syntax: dd/mm/YYYY hh:mm:ss
     * @returns {string}
     */
    getTime: function(){
        var d = new Date();
        return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' '
            + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    },

    getFormattedLogName: function(logName, index){
        if(index < 1){
            return 'log/' + logName + '.log';
        }
        return 'log/' + logName + '-' + index + '.log';
    },

    getLogName: function(){
        var d = new Date();

        return d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    }
};


var compile = require('./compile.js');
module.exports = compile.singleton(Logger, null, true);
