'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { realpath, stat } = require('node:fs/promises');

const root = fs.realpathSync(__dirname);
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8'
};

function insideRoot(filename) {
  return filename === root || filename.startsWith(root + path.sep);
}

function hiddenPath(filename) {
  return path.relative(root, filename).split(path.sep).some(part => part.startsWith('.'));
}

function reply(req, res, status, message, extra = {}) {
  const body = message + '\n';
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extra
  });
  res.end(req.method === 'HEAD' ? undefined : body);
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    reply(req, res, 405, 'Method not allowed', { Allow: 'GET, HEAD' });
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
  } catch {
    reply(req, res, 400, 'Bad request');
    return;
  }
  if (pathname.includes('\0') || pathname.includes('\\')) {
    reply(req, res, 400, 'Bad request');
    return;
  }
  if (pathname === '/') pathname = '/index.html';

  const requested = path.resolve(root, '.' + pathname);
  if (!insideRoot(requested) || hiddenPath(requested)) {
    reply(req, res, 404, 'Not found');
    return;
  }

  try {
    const filename = await realpath(requested);
    if (!insideRoot(filename) || hiddenPath(filename)) {
      reply(req, res, 404, 'Not found');
      return;
    }
    const info = await stat(filename);
    if (!info.isFile()) {
      reply(req, res, 404, 'Not found');
      return;
    }
    const type = types[path.extname(filename).toLowerCase()];
    if (!type) {
      reply(req, res, 404, 'Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': info.size,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    const stream = fs.createReadStream(filename);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch {
    reply(req, res, 404, 'Not found');
  }
});

server.on('error', error => {
  console.error('Could not start PRIDE Studio:', error.message);
  process.exitCode = 1;
});
server.listen(port, '0.0.0.0', () => {
  console.log(`PRIDE Studio is ready at http://localhost:${port}`);
});
