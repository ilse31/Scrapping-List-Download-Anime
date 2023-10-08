const { default: axios } = require("axios");

const fetchHtml = async (url) => {
  try {
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
    };
    const response = await axios.get(url, headers);
    if (response.status === 200) {
      return response.data;
    }
    throw new Error("Failed to fetch data");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchHtml,
};
