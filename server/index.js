const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());          
app.use(express.json());  

const DATA_FILE = path.join(__dirname, "data.json");

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/confessions", (req, res) => {
  const data = readData();
  res.json(data);
});

app.post("/api/confessions", (req, res) => {
  const token = req.headers["x-campus-token"];
  if (!token) {
    return res.status(400).json({ error: "Missing x-campus-token header" });
  }

  const data = readData();

  const newConfession = {
    confession_id: Date.now(),
    confession_text: req.body.confessionText,
    confession_mood: req.body.confessionMood,
    posted_by: req.body.postedBy ?? "Anonymous",
    heart_count: "zero",
  };

  data.confessions.unshift(newConfession);
  writeData(data);

  res.status(201).json({ message: "posted" });

});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🎓 Server running at http://localhost:${PORT}`);
});
