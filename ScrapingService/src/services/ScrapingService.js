const { default: axios } = require("axios");
const cheerioModule = require("cheerio");

class ScrapingService {
  async ScrapReddit(url) {
    try {
      const res = await axios.get(url);
      const $ = await cheerioModule.load(res.data);
      const data = [];
      $("[data-testid=post-container]").each((i, e) => {
        const titel = $(e).find("._eYtD2XCVieq6emjKBH3m").text();
        const url = "https://www.reddit.com" + $(e).find(".SQnoC3ObvgnGjWt90zD9Z").attr("href");
        data.push({ titel: titel, url: url });
      });
      return data;
    } catch (e) {
      console.log(e.message);
      return [];
    }
  }
}
module.exports = { ScrapingService };
