const cherio = require("cheerio");
const request = require("request");
const responses = require("../../helpers");

const getListupdate = async (req, res) => {
  const baseUrl = "";
  const url = `${baseUrl}/page/${req.params.page}`;

  request(url, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const $ = cherio.load(html);
      const data = [];
      $(".detpost").each((i, el) => {
        const title = $(el).find("a").attr("title");
        const link = $(el).find("a").attr("href");
        const image = $(el).find("img").attr("src");
        const Listgenre = $(el).find("p").last().text();
        const genre = Listgenre.split("Genre")[1].split(",");
        for (let i = 0; i < genre.length; i++) {
          genre[i] = genre[i].trim();
        }
        let listgenres = [];
        for (let i = 0; i < genre.length; i++) {
          listgenres.push({
            genre: genre[i],
            link: `/genre/${genre[i].toLowerCase()}`,
          });
        }
        data.push({
          title,
          link,
          image,
          listgenres,
        });
      });
      responses(res, 200, "Success", data);
    } else {
      responses(res, 400, "Bad Request");
    }
  });
};

module.exports = {
  getListupdate,
};
