// 引入 Node 原生模块：处理文件路径和读取文件
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url'); // 新增：解析 URL

// 1. 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 解析 URL，去掉查询参数
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;

  // 拼接本地文件的真实路径
  const filePath = path.join(__dirname, pathname);

  // 读取本地文件并返回给浏览器
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 文件不存在 → 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 File Not Found');
      return;
    }

    // 根据文件后缀设置 Content-Type
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'application/javascript';

    // 返回文件
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// 启动服务器
const port = 8080;
server.listen(port, () => {
  console.log(`服务器已启动！访问地址：http://localhost:${port}`);
});
