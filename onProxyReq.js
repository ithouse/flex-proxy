const { fixRequestBody } = require('http-proxy-middleware');

const sdkClientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;

const injectBody = ({ proxyReq, req, res, payload }) => {
  const prevBody = req.body;
  req.body = { ...prevBody, ...payload };
  console.debug('injectedBody body=', JSON.stringify(req.body,null,4));
}

const watchPaths = {
  '/v1/auth/token': {
    onReq: injectBody,
    payload: {
      client_id: sdkClientId,
    }
  }
}

const onProxyReq = (proxyReq, req, res) => {
  console.log('path=', JSON.stringify(req.path,null,4));
  console.log('body=', JSON.stringify(req.body,null,4));
  const processor = watchPaths[req.path];
  if (processor && processor.onReq) {
    processor.onReq({ proxyReq, req, res, payload: processor.payload });
  }

  return fixRequestBody(proxyReq, req, res);
};

module.exports = onProxyReq;
