const cherio = require("cheerio");
const request = require("request");

const calculatePage = (html) => {
  const $ = cherio.load(html);
  const lastPageLink = $(".wp-pagenavi a.last");
  const lastPageUrl = lastPageLink.attr("href");
  const lastPageNumberMatch = lastPageUrl.match(/\/(\d+)\/$/);
  const lastPage = parseInt(lastPageNumberMatch[1], 10);
  const currentPageLink = $(".wp-pagenavi span.current");
  const currentPage = parseInt(currentPageLink.text(), 10);
  return {
    lastPage,
    currentPage,
  };
};

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

const parseDetail = (html) => {
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
  const status = $(".info")
    .find("p")
    .eq(5)
    .text()
    .replace("Status:", "")
    .trim();
  const totalEps = $(".info")
    .find("p")
    .eq(6)
    .text()
    .replace("Total Episode:", "")
    .trim();
  const type = $(".info").find("p").eq(4).text().replace("Type:", "").trim();
  const release = $(".info")
    .find("p")
    .eq(9)
    .text()
    .replace("Released on:", "")
    .trim();
  const duration = $(".info")
    .find("p")
    .eq(8)
    .text()
    .replace("Duration:", "")
    .replace("per ep", "")
    .replace(/(:|\.)/g, "")
    .trim();
  const score = $(".info").find("p").eq(7).text().replace("Score:", "").trim();
  const sinopsis = $(".lexot > p").text().trim();
  let ListDownload = [];
  $("#dl")
    .find(".smokeddlrh")
    .each((i, el) => {
      const download_link = [];
      $(".smokeurlrh").each((j, ele) => {
        const type = $(ele).find("strong").text().trim();
        const links = [];
        $(ele)
          .find("a")
          .each((k, elem) => {
            const name = $(elem).text().trim();
            const url = $(elem).attr("href");
            links.push({ name, url });
          });
        download_link.push({ type, links });
      });
      ListDownload.push({ title, download_link });
    });

  return {
    title,
    image,
    genre,
    viewed,
    status,
    totalEps,
    type,
    release,
    duration,
    score,
    sinopsis,
    ListDownload,
  };
};

module.exports = {
  parseDetail,
  parseListupdate,
  calculatePage,
};
