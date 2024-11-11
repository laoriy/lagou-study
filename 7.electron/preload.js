const {
  BrowserWindow,
  getCurrentWindow,
  Menu,
  dialog,
  nativeImage,
  clipboard,
} = require("@electron/remote");
const path = require("node:path");
const { ipcRenderer, shell } = require("electron");

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
    // localstorage
    localStorage.setItem("test", "localStorage test value");

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
        label: "菜单",
        submenu: [
          {
            label: "关于",
            click() {
              shell.openExternal("https://kaiwu.lagou.com/");
            },
          },
          {
            label: "打开",
            click() {
              BrowserWindow.getFocusedWindow().webContents.send("openUrl");
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

  /**
   * dialog ------------------
   */
  let oBtnDialog = document.querySelector(".dialog button");
  let oBtnDialogErr = document.querySelector(".dialog button.error");

  oBtnDialog.addEventListener("click", () => {
    dialog
      .showOpenDialog({
        defaultPath: path.resolve(__dirname, "../"),
        buttonLabel: "请选择",
        title: "拉勾教育",
        properties: ["openFile", "multiSelections"],
        filters: [
          { name: "代码文件", extensions: ["js", "json", "html"] },
          { name: "图片文件", extensions: ["ico", "jpeg", "png"] },
          { name: "媒体类型", extensions: ["avi", "mp4", "mp3"] },
        ],
      })
      .then((ret) => {
        console.log(ret);
      });
  });

  oBtnDialogErr.addEventListener("click", () => {
    dialog.showErrorBox("自定义标题", "当前错误内容");
  });

  /**
   * shell iframe-------------------
   *
   */
  // 1 获取元素
  let oBtn1 = document.getElementById("openUrl");
  let oBtn2 = document.getElementById("openFolder");

  oBtn1.addEventListener("click", (ev) => {
    ev.preventDefault();

    let urlPath = oBtn1.getAttribute("href");

    shell.openExternal(urlPath);
  });

  oBtn2.addEventListener("click", (ev) => {
    shell.showItemInFolder(path.resolve(__filename));
  });

  /**
   * 消息通知 ------
   */
  let messageBtn = document.getElementById("message");

  messageBtn.addEventListener("click", () => {
    let option = {
      title: "拉勾教育",
      body: "互联网人的实战大学，大前端",
      icon: "./msg.png",
    };

    let myNotification = new window.Notification(option.title, option);

    myNotification.onclick = function () {
      console.log("点击了消息页卡");
    };
  });
  /**
   * 剪贴板*************
   */

  // 获取元素
  let aBtn = document.querySelectorAll("#clipboard button");
  let aInput = document.querySelectorAll("#clipboard input");
  let clipImgBtn = document.getElementById("clipImg");
  let ret = null;

  aBtn[0].onclick = function () {
    // 复制内容
    ret = clipboard.writeText(aInput[0].value);
  };

  aBtn[1].onclick = function () {
    // 粘贴内容
    aInput[1].value = clipboard.readText(ret);
  };

  clipImgBtn.onclick = function () {
    // 将图片放置于剪切板当中的时候要求图片类型属于 nativeImage 实例
    let oImage = nativeImage.createFromPath("./msg.png");
    clipboard.writeImage(oImage);

    // 将剪切板中的图片做为 DOM 元素显示在界面上
    let oImg = clipboard.readImage();
    let oImgDom = new Image();
    oImgDom.src = oImg.toDataURL();
    document.body.appendChild(oImgDom);
  };
});
