const { BrowserWindow, getCurrentWindow } = require("@electron/remote");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
  // 点击按钮打开一个新窗口
  const oBtn = document.getElementById("btn");
  oBtn.addEventListener("click", () => {
    // ?? 如何去创建窗口
    let indexMin = new BrowserWindow({
      parent: getCurrentWindow(),
      width: 600,
      height: 500,
      frame: false,
      modal: true,
      webPreferences: {
        nodeIntegration: true, //使用node功能
        contextIsolation: false, //  开启上下文隔离
        enableRemoteModule: true,
      },
    });
    indexMin.loadFile("sub/index.html");

    indexMin.on("close", () => {
      indexMin = null;
    });
  });
});
