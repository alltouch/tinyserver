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

//todo call parent method
