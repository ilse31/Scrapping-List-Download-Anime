const { fetch, parse, response } = require("../../helpers");

const baseUrl = "https://kusonime.com";

const getListupdate = async (req, res) => {
  const url = `${baseUrl}/page/${req.params.page}`;

  try {
    const html = await fetch.fetchHtml(url);
    const data = parse.parseListupdate(html, baseUrl);
    response.successResponse(res, "Success", data);
  } catch (error) {
    console.log(error);
    response.errorResponse(res, 400, "Bad Request");
  }
};

const getDetail = async (req, res) => {
  const url = `${baseUrl}/${req.params.link}`;

  try {
    const html = await fetch(url);
    const data = parse.parseDetail(html, baseUrl);
    response.successResponse(res, "Success", data);
  } catch (error) {
    response.errorResponse(res, 400, "Bad Request");
  }
};

module.exports = {
  getListupdate,
  getDetail,
};
