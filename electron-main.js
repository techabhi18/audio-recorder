const { app, Menu, Tray, Notification } = require("electron");
const path = require("path");
const axios = require("axios");
const fs = require("fs");

let tray = null;
let isRecording = false;

app.whenReady().then(() => {
  console.log("Electron app running");

  tray = new Tray(path.join(__dirname, "icon.png"));

  const updateTray = () => {
    tray.setToolTip(
      isRecording ? "Recording in progress..." : "Audio Recorder"
    );
  };

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Start Recording",
      click: () => {
        axios
          .post("http://localhost:3000/start")
          .then(() => {
            isRecording = true;
            updateTray();
            new Notification({
              title: "Audio Recorder",
              body: "Recording started.",
            }).show();
            console.log("Recording started");
          })
          .catch((err) => {
            console.error("Start recording failed:", err);
          });
      },
    },
    {
      label: "Stop Recording",
      click: () => {
        axios
          .post("http://localhost:3000/stop")
          .then(() => {
            isRecording = false;
            updateTray();
            new Notification({
              title: "Audio Recorder",
              body: "Recording stopped.",
            }).show();
            console.log("Recording stopped");
          })
          .catch((err) => {
            console.error("Stop recording failed:", err);
          });
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

          writer.on("finish", () => {
            console.log("Downloaded: downloaded-recording.mp3");
            new Notification({
              title: "Audio Recorder",
              body: "Recording downloaded successfully.",
            }).show();
          });
        } catch (err) {
          console.error("Download failed:", err);
          new Notification({
            title: "Audio Recorder",
            body: "Download failed.",
          }).show();
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => app.quit(),
    },
  ]);

  updateTray();
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    tray.popUpContextMenu();
  });

  console.log("Tray icon created.");
});
