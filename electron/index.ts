import console from "console";
import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  console.log(app.isPackaged);
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL(`${process.env["VITE_DEV_SERVER_URL"]}`);
  }
};

app.whenReady().then(createWindow);
