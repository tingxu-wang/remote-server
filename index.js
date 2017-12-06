const http = require('http'),
	router = require('./router'),
	base = require('./config/base');

http.createServer(router).listen(base.port || 3000);
console.log("Server has started.");