#!/usr/bin/env node

const webpack = require('webpack');
const webpackConf = require('../webpack.config.js');

function buildTask(options = {}) {
  return new Promise((resolve, reject) => {
    webpack(webpackConf(options), (err, status) => {
      if(err) reject(err);
      else {
        resolve(status);
      }
    });
  });
}

(async function () {
  await buildTask(); // build uncompressed file
  await buildTask({esnext: true});
  await buildTask({esnext: true, production: true});
  await buildTask({production: true}); // build compressed file
}());
