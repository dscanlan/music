const http = require('http'),
config = require('./config');

module.exports = function(app){
    const server = http.Server(app);
    const port = process.env.PORT || config.port;
    server.listen(config.port, function() {
	    console.log('server listening on : ', port);
	});
}
