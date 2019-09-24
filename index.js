const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT || 8081;

const posts = require("./route/api/posts");

app.use("/api/posts", posts);

app.get("/", (req, res) => {
  res.send("Hello my lovely Heejin");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
