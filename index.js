const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const router = require("./src/routes/index.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
