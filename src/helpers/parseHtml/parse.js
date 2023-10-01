const cherio = require("cheerio");
const request = require("request");

const parseListupdate = (html, baseUrl) => {
  const $ = cherio.load(html);
  const data = [];

  $(".detpost").each((i, el) => {
    const title = $(el).find("a").attr("title");
    const link = $(el).find("a").attr("href");
    const path = link.split("/")[3];
    const image = $(el).find("img").attr("src");
    const Listgenre = $(el).find("p").last().text();
    const genre = Listgenre.split("Genre")[1]
      .split(",")
      .map((g) => g.trim());

    const listgenres = genre.map((g) => ({
      genre: g,
      link: `${baseUrl}/genre/${g.toLowerCase()}`,
    }));

    data.push({
      title,
      link,
      image,
      path,
      listgenres,
    });
  });

  return data;
};

const parseDetail = (html, baseUrl) => {
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
    .replace(/(:|\.)/g, "")
    .trim();
  const score = $(".entry-content p").eq(6).text();
  const sinopsis = $(".entry-content p").eq(7).text();

  return {
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
};

module.exports = {
  parseDetail,
  parseListupdate,
};
