const { app, Menu, Tray } = require("electron");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

let tray = null;

app.whenReady().then(() => {
  tray = new Tray(path.join(__dirname, "icon.png"));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Start Recording",
      click: () => {
        axios.post("http://localhost:3000/start").catch(console.error);
      },
    },
    {
      label: "Stop Recording",
      click: () => {
        axios.post("http://localhost:3000/stop").catch(console.error);
      },
    },
    {
      label: "Download MP3",
      click: async () => {
        try {
          const res = await axios({
            url: "http://localhost:3000/download",
            method: "GET",
            responseType: "stream",
          });

          const filePath = path.join(__dirname, "downloaded-recording.mp3");
          const writer = fs.createWriteStream(filePath);
          res.data.pipe(writer);

          writer.on("finish", () =>
            console.log("Downloaded: downloaded-recording.mp3")
          );
        } catch (err) {
          console.error("Download failed:", err);
        }
      },
    },
    { type: "separator" },
    { label: "Quit", click: () => app.quit() },
  ]);

  tray.setToolTip("Audio Recorder");
  tray.setContextMenu(contextMenu);
});
