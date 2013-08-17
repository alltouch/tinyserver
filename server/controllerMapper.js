var defaultMapper = require('./sys/defaultMapper.js'),
    compile = require('./sys/compile.js');

var controllerMapper = {
    className: 'controllerMapper',
    ext: ['/action/*'],
    controllersList: [
        require('../controller/call.js')
    ],
    process: function(req, res, url){
        url = url || req.url;

        return this.controllersList.some(function(controllerClass){
            var controller = new controllerClass();
            //TODO: check regexp
            var match = url.match(new RegExp(controller.getPath()));
            if(match){
                //TODO: send correct url params to process function
                if(controller.process(req, res, url)){
                    return true;
                }
            }
            return false;
        }, this);
    }
};

module.exports = compile.do(controllerMapper, defaultMapper);
