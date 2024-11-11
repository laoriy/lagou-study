// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("node:path");
const remote = require("@electron/remote/main");
function createWindow() {
  // 初始化远程模块
  remote.initialize();
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: {
      nodeIntegration: true, //使用node功能
      contextIsolation: false, //  开启上下文隔离
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
    title: "hello ",
    icon: "./lg.ico",
  });

  remote.enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");
  mainWindow.on("close", () => {
    console.log("88888--->this window is closed");
    mainWindow = null;
  });
  // 设置主窗口的菜单
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  // 注册
  let ret = globalShortcut.register("ctrl + q", () => {
    console.log("快捷键注册成功");
  });

  if (!ret) {
    console.log("注册失败");
  }

  console.log(globalShortcut.isRegistered("ctrl + q"));

  console.log(ret, "~~~~~");
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("browser-window-created", (_, window) => {
  remote.enable(window.webContents);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 主进程接收消息操作
ipcMain.on("msg1", (ev, data) => {
  console.log(data);
  ev.sender.send("msg1Re", "这是一条来自于主进程的异步消息");
});

ipcMain.on("msg2", (ev, data) => {
  console.log(data);
  ev.returnValue = "来自于主进程的同步消息";
});
