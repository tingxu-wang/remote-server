const fs = require('fs'),
	url = require('url');

const config = require('./config/base.json'),
	filePath = `${__dirname}/${config.path.static}/index.html`;

function router(req,res){
	if(fs.existsSync(filePath)){
		const hostpath = url.parse(req.headers.host + req.url);
		let content = '';
		if(hostpath.pathname === '/'){
			content = fs.readFileSync(filePath, 'utf-8');
			res.writeHeader(200, {
				"Content-Type" : 'text/html;charset=utf-8'
			});
		}else{
			content = 'else';
		}
		res.write(content);
		res.end();
	}else{
		res.writeHeader(404);
		res.end('static not found!');
	}
}

module.exports = router;