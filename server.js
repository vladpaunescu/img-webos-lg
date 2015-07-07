//Lets define a port we want to listen to
const PORT=9000; 

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(PORT);