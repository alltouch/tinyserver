var util = require('util');

module.exports.do = function(obj, superClass){
    var newClass = function(){
        for(var i in obj){
            if(typeof obj[i] !== 'function'){
                this[i] = obj[i];
            }
        }
    }

    if(superClass){
        util.inherits(newClass, superClass);
    }

    for(var i in obj){
        if(typeof obj[i] == 'function'){
            newClass.prototype[i] = obj[i];
        }
    }
    newClass.prototype.parent = function(method, arg){
        return superClass.prototype[method].apply(this, arg);
    };
    return newClass;
};

var cache = {};
module.exports.singleton = function(obj, superClass, callInit){
    if(cache[obj.className]){
        return cache[obj.className];
    }

    var cl = this.do(obj, superClass);
    var singleton = new cl();
    if(callInit){
        singleton.init();
    }

    cache[obj.className] = singleton;

    return singleton;
};

//todo call parent method
