const express = require("express");
const mic = require("mic");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

let micInstance = null;
let micInputStream = null;
let outputFileStream = null;

app.use(cors());

app.post("/start", (req, res) => {
  if (micInstance) return res.status(400).send("Already recording");

  micInstance = mic({
    rate: "16000",
    channels: "1",
    debug: false,
    exitOnSilence: 6,
  });

  micInputStream = micInstance.getAudioStream();
  outputFileStream = fs.createWriteStream(
    path.join(__dirname, "recording.mp3")
  );

  micInputStream.pipe(outputFileStream);

  micInputStream.on("error", (err) => console.error("Mic input error:", err));
  micInstance.start();

  console.log("Recording started");
  res.send("Recording started");
});

app.post("/stop", (req, res) => {
  if (!micInstance) return res.status(400).send("Not recording");

  micInstance.stop();
  micInstance = null;
  micInputStream = null;
  outputFileStream = null;

  console.log("Recording stopped");
  res.send("Recording stopped");
});

app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "recording.mp3");
  res.download(filePath, "recording.mp3");
});

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
