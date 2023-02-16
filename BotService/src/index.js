const { BOT_TOKEN } = require("./config");
const { Telegraf } = require("telegraf");
const { Channel } = require("./utils");
const { BotService } = require("./services/BotService");
async function runServer() {
  const bot = new Telegraf(BOT_TOKEN);
  const chats = {};
  bot.command("start", async (ctx) => {
    if (!chats[ctx.chat.id]) {
        chats[ctx.chat.id]=true
      const service = new BotService(bot, ctx.chat.id,20);
      await Channel.Subscribe("BotMsgs", service);
      console.log(ctx.chat);
    }
  });
  bot.launch();
}

runServer();
