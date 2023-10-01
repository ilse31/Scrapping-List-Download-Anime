const { default: axios } = require("axios");

const fetchHtml = async (url) => {
  try {
    const response = await axios.get(url);
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
