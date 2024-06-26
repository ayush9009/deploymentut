const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://127.0.0.1:4000',
    //   target: 'http://192.168.174.1:5000',
      "target": "http://127.0.0.1:5000",
      changeOrigin: true,
      headers: {
        "Connection": "keep-alive"
      },
    })
  );
};