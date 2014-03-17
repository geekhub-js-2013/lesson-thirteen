/**
 * Created by mcfedr on 12/03/2014.
 */
var express = require('express'),
    app = express();

app.use(express.static(__dirname + '../public'));

http.createServer(app).listen(1337);
console.log("Server running at http://localhost:1337/");
