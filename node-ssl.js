#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync('./ssl.key'),
  cert: fs.readFileSync('./ssl.crt'),
};

const server = https.createServer(options, (request, response) => {
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

server.listen(8443);

console.log(process.pid);
