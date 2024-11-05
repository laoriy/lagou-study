const { BrowserWindow, getCurrentWindow, Menu } = require("@electron/remote");
const { ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  console.log(process.platform);

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
      modal: true,
      webPreferences: {
        nodeIntegration: true, //使用node功能
        contextIsolation: false, //  开启上下文隔离
        enableRemoteModule: true,
      },
    });
    // 01 自定义菜单的内容
    let menuTemp = [
      {
        label: "角色",
        submenu: [
          { label: "复制", role: "copy" },
          { label: "剪切", role: "cut" },
          { label: "粘贴", role: "paste" },
          { label: "最小化", role: "minimize" },
        ],
      },
      {
        label: "类型",
        submenu: [
          { label: "选项1", type: "checkbox" },
          { label: "选项2", type: "checkbox" },
          { label: "选项3", type: "checkbox" },
          { type: "separator" },
          { label: "item1", type: "radio" },
          { label: "item2", type: "radio" },
          { type: "separator" },
          { label: "windows", type: "submenu", role: "windowMenu" },
        ],
      },
      {
        label: "其它",
        submenu: [
          {
            label: "打开",
            icon: "./open.png",
            accelerator: "ctrl + o",
            click() {
              console.log("open操作执行了");
            },
          },
        ],
      },
    ];

    // 利用上述的模板然后生成一个菜单项
    let menu = Menu.buildFromTemplate(menuTemp);

    // 设置子窗口的菜单
    indexMin.setMenu(menu);

    indexMin.loadFile("sub/index.html");

    indexMin.on("close", () => {
      indexMin = null;
    });
  });

  /**
   * ipc 通信--------------
   */

  // 获取元素
  let ipcBtn = document.querySelectorAll(".ipc button");

  // 01 采用异步的 API 在渲染进程中给主进程发送消息
  ipcBtn[0].addEventListener("click", () => {
    ipcRenderer.send("msg1", "当前是来自于渲染进程的一条异步消息");
  });

  // 02 采用同步的方式完成数据通信
  ipcBtn[1].addEventListener("click", () => {
    let val = ipcRenderer.sendSync("msg2", "同步消息");
    console.log(val);
  });

  // 当前区域是接收消息
  ipcRenderer.on("msg1Re", (ev, data) => {
    console.log(data);
  });

  ipcRenderer.on("mtp", (ev, data) => {
    console.log(data);
  });
});
