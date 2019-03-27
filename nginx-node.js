#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

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

server.listen(8081);

console.log(process.pid);
