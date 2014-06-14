var path = require('path');
var express = require('express');
var app = express();


app.use('/', express.static(path.join(__dirname, 'app'), { maxAge: 31557600000 }));

app.listen(3000, function(){
    console.log('Express server listening on port 3000');
});
