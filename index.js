const http = require('node:http');
const url = require('url');
const fs = require('fs');

const HOSTNAME = '127.0.0.1';
const PORT = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const q = url.parse(req.url, true);
  fs.readFile(getPage(q.pathname), (err, data) => {
    if (err) console.log(err);
    res.end(data);
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`);
});

function getPage(query) {
  let path = './';
  switch (query) {
    case '/':
      path += 'index.html';
      break;
    case '/about':
      path += 'about.html';
      break;
    case '/contact':
      path += 'contact-me.html';
      break;
    default:
      path += '404.html';
      break;
  }
  return path;
}
