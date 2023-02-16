// @ts-nocheck
const cheerio = require("cheerio");
const axios = require("axios");
const { ScrapingService } = require("./services/ScrapingService");
const { Channel } = require("./utils");
async function runServer() {
  const urls = ["https://www.reddit.com/r/news/", "https://www.reddit.com/r/ProgrammerHumor/"];
  const service = new ScrapingService();
  setIntervalImmediately(() => {
    urls.forEach((url) => {
      console.log("scraping : "+url)
      service.ScrapReddit(url).then((d) => Channel.publish("BotMsgs", JSON.stringify(d)));
    });
  }, 1* 1000);
}

function setIntervalImmediately(func,delay){
  func();
  return setInterval(func,delay)
}

runServer();
