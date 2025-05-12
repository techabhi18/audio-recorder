# 🎤 Audio Recorder Desktop App

This is a simple Electron + Node.js desktop application that allows users to:

- ✅ Record microphone audio
- ✅ Stop recording
- ✅ Download the recording as an `.mp3` file

The app runs in the background with a tray icon, allowing quick access.

---

## 📁 Project Structure
/audio-recorder-app  
├── server.js               # Node.js backend API  
├── electron-main.js        # Electron tray app  
├── icon.png                # Tray icon (16×16 or 32×32 PNG)  
└── downloaded-recording.mp3 # Generated after "Download MP3"  

---

## ⚙️ Requirements

- **Node.js** (https://nodejs.org)  
- **SoX** (Sound eXchange) installed and in your system PATH  
  - Windows: download from https://sourceforge.net/projects/sox/files/sox/  
  - macOS: `brew install sox`  
  - Linux: `sudo apt-get install sox`

```bash
sox --version
```
---

## 🚀 Setup & Run

### Clone & Install

```bash
git clone https://github.com/techabhi18/audio-recorder.git
cd audio-recorder
npm install
```
---

### Start Backend API

```bash
npm run backend
# or:
node server.js
```
---

### Launch Electron App

```bash
npm start
# or:
npx electron electron-main.js
```
The app icon appears in your system tray (bottom-right on Windows).

---

## 🧪 How to Use

- Open tray menu (left-click or right-click the icon).
- **Start Recording** → microphone audio begins.
- **Stop Recording** → audio stops and is saved server-side.
- **Download MP3** → saves `downloaded-recording.mp3` in the project folder.
- **Quit** → closes the tray app.

---

## 🛠️ Customize

- Change the tray icon by replacing `icon.png`.
- Modify menu labels or URLs in `electron-main.js`.

