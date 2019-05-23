import { createServer } from 'http';
import express from 'express';
import api from './api/api';
import path from 'path';
import { StaticRotuer } from 'react-router';
import Index from '../../src/client/pages/index';
import reactDOMServer from 'react-dom/server';
import React from 'react';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';

const bundle = '../../dist/index.html';
const projectBasePath = path.resolve(__dirname, './src/client/pages/index.js');
const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;

global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('./webpack-isomorphic-tools-configuration')
);
server(projectBasePath, function() {
  require('../../dist/ssr/bundle');
});

server.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});

//app.use(express.static('dist'));
//app.use('/api', api);

app.get('*', (req, res) => {
  /*const index = join(__dirname, bundle);
  res.sendFile(index);*/
  const html = reactDOMServer.renderToString(
    <StaticRotuer location={req.url} context={{}}>
      <Index />
    </StaticRotuer>
  );
  res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>FESAD</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script src="ssr/bundle.js"></script>
    </body>
    </html>`);
});
