
var Mandrill = require('mandrill');
Mandrill.initialize('byDbxXgWFN-qHwlmUDDLIg');

exports.sendEmail = function(params){
    Mandrill.sendEmail({
        message: {
            text: params.text,
            subject: params.subject,
            from_email: "parse@cloudcode.com",
            from_name: "Make a wish bot",
            to: params.to
        },
        async: true
    },{
        success: params.success,
        error: params.error
    });
};