
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("sendEmail", function(request, response){
    var module = require('cloud/email');
    module.sendEmail({
        text: request.params.name + ": " + request.params.phone,
        subject: "New Order from makeawish",
        to: [
            {
                email: "shavaran@gmail.com",
                name: "Kirill S."
            }
        ],
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

Parse.Cloud.afterSave("Calls", function(request) {
    var name = request.object.get("name");
    var phone = request.object.get("phone");

    Parse.Cloud.run('sendEmail', {
        name: name,
        phone: phone
    });
});