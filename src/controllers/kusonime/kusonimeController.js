const cherio = require("cheerio");
const request = require("request");
const responses = require("../../helpers");

const getListupdate = async (req, res) => {
  const baseUrl = "https://kusonime.com";
  const url = `${baseUrl}/page/${req.params.page}`;

  request(url, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const $ = cherio.load(html);
      const data = [];
      $(".detpost").each((i, el) => {
        const title = $(el).find("a").attr("title");
        const link = $(el).find("a").attr("href");
        const path = link.split("/")[3];
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
            link: `https://kusonime.com/genre/${genre[i].toLowerCase()}`,
          });
        }
        data.push({
          title,
          link,
          image,
          path,
          listgenres,
        });
      });
      responses(res, 200, "Success", data);
    } else {
      responses(res, 400, "Bad Request");
    }
  });
};

const getDetail = async (req, res) => {
  const baseUrl = "https://kusonime.com";
  const url = `${baseUrl}/${req.params.link}`;
  const regex = /(:|\.)/g;

  request(url, (err, response, html) => {
    if (!err && response.statusCode == 200) {
      const $ = cherio.load(html);
      const title = $(".jdlz").text();
      const image = $(".attachment-thumb-large").attr("src");
      const viewed = $(".viewoy").text().trim();
      const genre = $(".info")
        .find("p")
        .eq(1)
        .find("a")
        .text()
        .split(/(?=[A-Z])/)
        .join(",");
      const status = $(".entry-content p").eq(2).text();
      const type = $(".entry-content p").eq(3).text();
      const release = $(".entry-content p").eq(4).text();
      const duration = $(".info")
        .find("p")
        .eq(8)
        .text()
        .replace("Duration:", "")
        .replace("per ep", "")
        .replace(regex, "")
        .trim();
      const score = $(".entry-content p").eq(6).text();
      const sinopsis = $(".entry-content p").eq(7).text();
      const data = {
        title,
        image,
        genre,
        viewed,
        status,
        type,
        release,
        duration,
        score,
        sinopsis,
      };
      responses(res, 200, "Success", data);
    } else {
      responses(res, 400, "Bad Request");
    }
  });
};

module.exports = {
  getListupdate,
  getDetail,
};
