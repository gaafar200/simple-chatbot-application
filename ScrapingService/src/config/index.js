// @ts-nocheck
const dotenv = require("dotenv");

if (process.env.ENV_MODE == "dev") {
  dotenv.config({
    path: "./.env.dev",
  });
} else {
  dotenv.config();
}

module.exports = {
  PORT: process.env.PORT,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  BOT_TOKEN:process.env.BOT_TOKEN||"",
  SERVICE_NAME:"SCRAPING_SERVICE"
};
