const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5005;

// middleWare
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello I am REST API");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
