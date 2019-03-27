#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 8080;

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

server.listen(port);

console.log('PORT', port, 'PID', process.pid);
