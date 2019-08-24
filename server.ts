import config from './nuxt.config';
import { Nuxt, Builder } from 'nuxt';
import {tryStartBootstrap} from './api/main';
import express from 'express';

const expressApp = express();
config.dev = !process.env.PRODUCTION;

async function run() {
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : parseInt(process.argv[process.argv.length - 1] , 10);
  expressApp.set('port', port);
  config.env = {
    baseUrl: host,
  };
  config.axios.baseURL = `http://${host}:${port}/api/`;
  config.axios.browserBaseURL = `http://${host}:${port}/api/`;
  const nuxt = new Nuxt(config);
  await Promise.all([
    tryStartBootstrap(),
    config.dev || !!process.env.REBUILD ? (new Builder(nuxt)).build() : void 0,
  ]);
  expressApp.use(nuxt.render);
  await new Promise(r => {
    expressApp.listen(port, host, r);
  });
}

run();
