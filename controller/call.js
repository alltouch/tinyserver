var compile = require('../server/sys/compile.js'),
    qs = require('querystring'),
    fs = require('fs'),
    Logger = require('../server/sys/logger.js'),
    alphamail = require('alphamail');

var emailService = new alphamail.EmailService()
    .setServiceUrl('http://api.amail.io/v2/')
    .setApiToken('520f79c70b92e0-80485170');

var callController = {
    className: 'callController',
    path: '/action/call',
    process: function(req, res, url){
        var that = this;
        req.body = '';

        req.on('data', function (data) {
           req.body += data;
        });

        req.on("end", function(){
            that.doSomethingWithPostData(req, res);
        });
        return true;
    },

    doSomethingWithPostData: function(req, res){
        var data = qs.parse(req.body);
        if(!data.name || !data.phone){
            //todo: remove false
        }

        var text = Logger.getTime() + " : New order: " + data.name + " : " + data.phone + "\r\n";

        fs.appendFileSync('order/orders.txt', text);

        emailService.queue(new alphamail.EmailMessagePayload()
            .setProjectId(2695)
            .setSender(new alphamail.EmailContact("Make A Wish Bot", "order@makeawish.com.ua"))
            .setReceiver(new alphamail.EmailContact("alex sha", "shavaran@gmail.com"))
            .setBodyObject(data)
        ,function(error, result){
            if(error){
                Logger.log(error);
                return;
            }
            fs.appendFileSync('order/orders.txt', "Email sent! ID = " + result + "\r\n");
            Logger.log("Email sent! ID = " + result);
        });

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({ status: 'OK'}));
    },

    getPath: function(){
        var path = this.path;
        path = path.replace(/@[^\/]*]/g, '[^\/]*');
        return '^'  + path + '$';
    }
};

module.exports = compile.do(callController);