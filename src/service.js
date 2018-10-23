const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Health check endpoints will be used while dockerizing the API
app.get("/api/_health", (req, res) => {
    res.status(200).send("Content rating api is healthy!");
});

app.post("/content", (req, res) => {
    console.log("content called")
});

app.get("/content/:contentId", (req, res) => {
    console.log("content get called")
});

app.listen(process.env.port || 3000, () => {
    console.log("Content Rating API started and listening on port 3000!");
});