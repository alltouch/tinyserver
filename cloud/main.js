
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("sendEmail", function(request, response){
    var Mandrill = require('mandrill');
    Mandrill.initialize('byDbxXgWFN-qHwlmUDDLIg');
    Mandrill.sendEmail({
        message: {
            text: request.params.name + ": " + request.params.phone,
            subject: "New Order from makeawish",
            from_email: "parse@cloudcode.com",
            from_name: "Make a wish bot",
            to: [
                {
                    email: "shavaran@gmail.com",
                    name: "Kirill S."
                }
            ]
        },
        async: true
    },{
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success({
                status: true,
                text: "Email sent!"
            });
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error({
                status: false,
                text: "Uh oh, something went wrong"
            });
        }
    });
});