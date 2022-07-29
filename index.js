// include dependencies
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');

const onProxyReq = require('./onProxyReq');

const options = {
  target: 'https://flex-api.sharetribe.com',
  changeOrigin: true,
  onProxyReq: onProxyReq
};

const flexSdkProxy = createProxyMiddleware(options);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/st-proxy', flexSdkProxy);
app.listen(3001);
