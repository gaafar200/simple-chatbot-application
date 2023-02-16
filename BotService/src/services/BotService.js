class BotService {
  #bot;
  #chatId;
  #cash = new Map();
  #cashSize = 100;

  constructor(bot, chatId, cashSize) {
    this.#bot = bot;
    this.#chatId = chatId;
    this.#cashSize = cashSize;
  }
  async sendMessage(msg) {
    if (this.#cash.get(msg.url)) return;
    if (this.#cash.size === this.#cashSize) {
      const keys = [this.#cash.keys()];
      this.#cash.delete(keys[keys.length - 1]);
    }
    this.#cash.set(msg.url, msg.titel);
    this.#bot.telegram.sendMessage(this.#chatId, msg.titel + "\n" + msg.url, {});
  }
  async subscribeEvent(msg) {
    const msgs = JSON.parse(msg);
    msgs.forEach((m) => {
      console.log(m)
      this.sendMessage(m);
    });
  }
}
module.exports = { BotService };
