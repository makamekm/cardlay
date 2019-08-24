import app, {
  tryStartBootstrap,
} from './api/main';

process.env.IS_SEPARATE = 'true';

const port = process.env.PORT || 4000;

listen();

tryStartBootstrap();

async function listen() {
  app.listen(port);
}
