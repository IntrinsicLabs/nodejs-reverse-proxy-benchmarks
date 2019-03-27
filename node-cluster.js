#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const cluster = require('cluster');
const SLAVES = 2;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < SLAVES; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer((request, response) => {
	const file = path.join(__dirname, 'public', 'index.html');
	fs.stat(file, (err, stat) => {

	  response.writeHead(200, {
		'Content-Type': 'text/html',
		'Content-Length': stat.size
	  });

	  const readStream = fs.createReadStream(file);

	  readStream.pipe(response);
	});
  });

  server.listen(8080);

  console.log(process.pid);
}

