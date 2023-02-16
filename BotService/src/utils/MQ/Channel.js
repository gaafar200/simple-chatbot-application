const amqp = require("amqplib");
const { MSG_QUEUE_URL, EXCHANGE_NAME, SERVICE_NAME } = require("../../config");
class Channel {
  static #ChannelInstance;
  static async getChannel() {
    if (!this.#ChannelInstance) {
      try {
        const Connection = await amqp.connect(MSG_QUEUE_URL || "");
        const channel = await Connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME || "", "direct", { durable: false });
        this.#ChannelInstance = channel;
      } catch (e) {
        throw e;
      }
    }
    return this.#ChannelInstance;
  }

  static async Subscribe(Pattern,service) {
    try {
      const channel = await this.getChannel();
      const q = await channel.assertQueue(SERVICE_NAME);
      await channel.bindQueue(q.queue, EXCHANGE_NAME, Pattern);
      channel.consume(q.queue, async (msg) => {
        service.subscribeEvent(msg.content.toString());
        channel.ack(msg);
      });
    } catch (e) {
      throw e;
    }
  }

  static async publish(key, msg) {
    try {
      const channel = await this.getChannel();
      channel.publish(EXCHANGE_NAME, key, Buffer.from(msg));
      
    } catch (e) {
      throw e;
    }
  }
}
module.exports=Channel