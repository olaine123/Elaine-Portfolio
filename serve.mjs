import { createServer } from 'http';
import { createReadStream, statSync } from 'fs';
import { readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.mjs': 'application/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
};

const streamable = new Set(['.mp4', '.webm', '.mov']);

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url === '/' ? '/index.html' : req.url.split('?')[0]);

  if (req.method === 'POST' && url === '/api/sync-content') {
    try {
      let body = '';
      for await (const chunk of req) body += chunk;
      const payload = JSON.parse(body);
      if (typeof payload.source !== 'string' || !payload.source.includes('window.PORTFOLIO_PROJECTS')) throw new Error('Invalid content payload');
      const contentPath = join(__dirname, 'content/projects.js');
      const backupDir = join(__dirname, '.local-backups');
      await mkdir(backupDir, { recursive: true });
      await copyFile(contentPath, join(backupDir, `projects-${Date.now()}.js`));
      await writeFile(contentPath, payload.source, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
    }
    return;
  }

  const filePath = join(__dirname, url);
  const ext = extname(filePath);
  const contentType = mime[ext] || 'application/octet-stream';

  try {
    if (streamable.has(ext)) {
      const stat = statSync(filePath);
      const total = stat.size;
      const range = req.headers.range;

      if (range) {
        const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
        const start = parseInt(startStr, 10);
        const end = endStr ? parseInt(endStr, 10) : Math.min(start + 1024 * 1024, total - 1);
        const chunkSize = end - start + 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${total}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': contentType,
        });
        createReadStream(filePath, { start, end }).pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': total,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
        });
        createReadStream(filePath).pipe(res);
      }
    } else {
      const content = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
