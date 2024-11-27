const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const remote = require("@electron/remote/main");

let mainWindow;

app.on("ready", () => {
  // 初始化远程模块
  remote.initialize();
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 650,
    minWidth: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });
  remote.enable(mainWindow.webContents);

  const urlLocation = isDev ? "http://localhost:3000" : "myUrl";

  mainWindow.loadURL(urlLocation);
});
