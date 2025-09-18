// 引入 Node 原生模块：处理文件路径和读取文件
const http = require('http');
const fs = require('fs');
const path = require('path');

// 1. 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 2. 处理请求路径：如果访问根路径（/），默认返回 index.html
  const requestPath = req.url === '/' ? '/index.html' : req.url;
  // 3. 拼接本地文件的真实路径（确保找到你的 HTML 文件）
  const filePath = path.join(__dirname, requestPath);

  // 4. 读取本地文件并返回给浏览器
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // 如果文件不存在（如访问了错误路径），返回 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 File Not Found');
    } else {
      // 根据文件后缀设置正确的 Content-Type（让浏览器识别文件类型）
      const ext = path.extname(filePath);
      let contentType = 'text/html'; // 默认是 HTML 类型
      if (ext === '.css') contentType = 'text/css';
      if (ext === '.js') contentType = 'application/javascript';

      // 5. 返回文件内容（200 表示成功）
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

// 6. 启动服务器，监听 8080 端口（端口号可改，如 3000）
const port = 8080;
server.listen(port, () => {
  console.log(`服务器已启动！访问地址：http://localhost:${port}`);
});