const server = require('./server');
const bodyParser = require('body-parser');
const { task } = require('folktale/concurrency/task');
const { curry } = require('ramda');
const { port } = require("./config");
const express = require('express');

const ExpressBuilder = curry((expresso, models) => task((resolver) => {
  const app = expresso();
  app.set('port', port);
  app.use(bodyParser.json());
  server(app, models);
  app.on('uncaughtException', (err) => resolver.reject(err));
  app.on('error', (err) => resolver.reject(err));
  process.on('uncaughtException', (err) => resolver.cancel(err));
  app.listen(3000, () => {
    resolver.resolve(app);
  });
}));
exports.ExpressBuilder = ExpressBuilder(express);
