const { fetch, parse, response } = require("../../helpers");

const baseUrl = "https://kusonime.com";

const getListupdate = async (req, res) => {
  const url = `${baseUrl}/page/${req.params.page}`;

  try {
    const html = await fetch.fetchHtml(url);
    const data = parse.parseListupdate(html, baseUrl);
    const { lastPage, currentPage } = parse.calculatePage(html);
    response.successResponse(res, "Success", {
      data,
      lastPage,
      currentPage,
    });
  } catch (error) {
    console.log(error);
    response.errorResponse(res, 400, "Bad Request");
  }
};

const getDetail = async (req, res) => {
  const url = `${baseUrl}/${req.params.link}`;

  try {
    const html = await fetch.fetchHtml(url);
    console.log("html", html);
    const data = parse.parseDetail(html);
    response.successResponse(res, "Success", data);
  } catch (error) {
    console.log("error", error);
    response.errorResponse(res, 400, "Bad Request");
  }
};

module.exports = {
  getListupdate,
  getDetail,
};
