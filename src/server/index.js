const http = require('http');
const express = require('express');
const api = require('./api/api');
const path = require('path');
const bundle = '../../dist/index.html';
const session = require('express-session');
const cookie = require('cookie-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server listen in port ${port}`);
});

app.use(cookie());
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);
app.use('/api', api);
app.use(express.static('dist'));
app.use(cors());

/**passport config */
require('../../config/passport/')(app);

app.get('*', (req, res) => {
  const index = path.join(__dirname, bundle);
  res.sendFile(index);
});
