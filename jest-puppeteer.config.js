const getPort = require("get-port");

async function getConfig() {
  port = process.env.PORT ? parseInt(process.env.PORT, 10) : await getPort();
  process.env.HOST = "127.0.0.1";
  process.env.PORT = port;
  return {
    launch: {
      dumpio: true,
      headless: process.env.HEADLESS !== "false",
    },
    server: {
      command: "ts-node --project ./tsconfig.express.json ./server.ts " + port,
      port: port,
      launchTimeout: 30000,
      debug: true,
      usedPortAction: "error",
    },
  };
}

module.exports = getConfig();
