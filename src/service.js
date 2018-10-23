const express = require("express");
const bodyParser = require("body-parser");

const addContentController = require("./controllers/add-content");
const getContentController = require("./controllers/get-content");

const app = express();
app.use(bodyParser.json());

// Health check endpoints will be used while dockerizing the API
app.get("/api/_health", (req, res) => {
  res.status(200).send("Content rating api is healthy!");
});

app.post("/content", (request, response) => {
  return addContentController.processRequest(request, response);
});

app.get("/content/:contentId", (request, response) => {
  return getContentController.processRequest(request, response);
});

app.listen(process.env.port || 3000, () => {
  console.log("Content Rating API started and listening on port 3000!");
});
