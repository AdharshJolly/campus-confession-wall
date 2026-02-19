const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const crypto = require("crypto");

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

  const mapped = data.confessions.map((c) => ({
    id: c.confession_id,
    text: c.confession_text,
    mood: c.confession_mood,
    postedBy: c.posted_by,
    createdAt: c.created_at,
    hearts: c.heart_count,
  }));

  res.json({ confessions: mapped });
});

app.post("/api/confessions", (req, res) => {
  const token = req.headers["x-campus-token"];
  if (!token) return res.status(400).json({ error: "Missing token" });

  if (!req.body.confessionText?.trim())
    return res.status(400).json({ error: "Empty confession" });

  const data = readData();

  const newConfession = {
    confession_id: crypto.randomUUID(),
    confession_text: req.body.confessionText,
    confession_mood: req.body.confessionMood,
    posted_by: req.body.postedBy ?? "Anonymous",
    created_at: new Date().toISOString(),
    heart_count: 0,
  };

  data.confessions.unshift(newConfession);
  writeData(data);

  res.status(201).json(newConfession);
});

app.post("/api/confessions/:id/heart", (req, res) => {
  const data = readData();

  const confession = data.confessions.find(
    (c) => c.confession_id == req.params.id,
  );

  if (!confession) return res.status(404).json({ error: "Not found" });

  confession.heart_count += 1;

  writeData(data);

  res.json({ hearts: confession.heart_count });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🎓 Server running at http://localhost:${PORT}`);
});
