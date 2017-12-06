const fs = require('fs'),
	url = require('url');

const config = require('./config/base.json'),
	filePath = `${__dirname}/${config.path.static}/index.html`;

function router(req,res){
	let status = 200;
	if(fs.existsSync(filePath)){
		const hostpath = url.parse(req.headers.host + req.url);
		let content = '';
		if(hostpath.pathname === '/'){
			content = fs.readFileSync(filePath, 'utf-8');
			res.writeHeader(status, {
				"Content-Type" : 'text/html;charset=utf-8'
			});
		}else{
			content = 'else';
		}
		res.write(content);
		res.end();
	}else{
		status = 404;
		res.writeHeader(status);
		res.end('static not found!');
	}
	console.log(`${status} | ${res.socket.remoteAddress} | ${req.url} | ${Date()}`);
}

module.exports = router;