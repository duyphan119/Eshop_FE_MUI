const { Client } = require("@elastic/elasticsearch");
require("dotenv").config();
const client = new Client({
  node: "https://localhost:9200",
  cloud: {
    id: process.env.ELASTIC_SEARCH_CLOUD_ID,
  },
  auth: {
    username: "elastic",
    password: process.env.ELASTIC_SEARCH_PASSWORD,
    // apiKey: process.env.ELASTIC_SEARCH_API_KEY,
  },
});
module.exports = client;
