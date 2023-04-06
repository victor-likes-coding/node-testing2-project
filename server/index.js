const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/router');
const postsRouter = require('./posts/router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

// eslint-disable-next-line no-unused-vars
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
