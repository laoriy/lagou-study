const { getCurrentWindow, Menu, MenuItem } = require("@electron/remote");
const { ipcRenderer, shell } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  // 利用 remote 可以获取当前窗口对象
  let mainWin = getCurrentWindow();

  window.onbeforeunload = function () {
    let oBox = document.getElementsByClassName("isClose")[0];
    oBox.style.display = "block";

    let yesBtn = oBox.getElementsByTagName("span")[0];
    let noBtn = oBox.getElementsByTagName("span")[1];

    yesBtn.addEventListener("click", () => {
      mainWin.destroy();
    });

    noBtn.addEventListener("click", () => {
      oBox.style.display = "none";
    });

    return false;
  };

  // 获取元素添加点击操作的监听
  let aBtn = document
    .getElementsByClassName("windowTool")[0]
    .getElementsByTagName("div");

  aBtn[0].addEventListener("click", () => {
    // 当前事件发生后说明需要关闭窗口
    mainWin.close();
  });

  aBtn[1].addEventListener("click", () => {
    // 这里需要执行的最大化操作
    console.log(mainWin.isMaximized());
    if (!mainWin.isMaximized()) {
      mainWin.maximize(); // 让当前窗口最大化
    } else {
      mainWin.restore(); // 回到原始的状态
    }
  });

  aBtn[2].addEventListener("click", () => {
    // 实现最小化
    if (!mainWin.isMinimized()) {
      mainWin.minimize();
    }
  });

  /**
   * 自定义菜单-----------
   */
  // 获取要应的元素
  let addMenu = document.getElementById("addMenu");
  let menuCon = document.getElementById("menuCon");
  let addItem = document.getElementById("addItem");

  // 自定义全局变量存放菜单项
  let menuItem = new Menu();

  // 生成自定义的菜单
  addMenu.addEventListener("click", () => {
    // 创建菜单
    let menuFile = new MenuItem({ label: "文件", type: "normal" });
    let menuEdit = new MenuItem({ label: "编辑", type: "normal" });
    let customMenu = new MenuItem({ label: "自定义菜单项", submenu: menuItem });

    // 将创建好的自定义菜单添加至 menu
    let menu = new Menu();
    menu.append(menuFile);
    menu.append(menuEdit);
    menu.append(customMenu);

    // 将menu 放置于 app 中显示
    mainWin.setMenu(menu);
  });

  // 动态添加菜单项
  addItem.addEventListener("click", () => {
    // 获取当前 input 输入框当中的内容
    let con = menuCon.value.trim();
    if (con) {
      menuItem.append(new MenuItem({ label: con, type: "normal" }));
      menuCon.value = "";
    }
  });

  /**
   * 定义右键菜单--------------
   */
  let contextTemp = [
    { label: "Run Code" },
    { label: "转到定义" },
    { type: "separator" },
    {
      label: "其它功能",
      click() {
        console.log("其它功能选项被点击了");
      },
    },
  ];

  // 依据上述的内容来创建 menu
  let menu = Menu.buildFromTemplate(contextTemp);

  // 给鼠标右击添加监听
  window.addEventListener(
    "contextmenu",
    (ev) => {
      ev.preventDefault();
      menu.popup({ window: mainWin });
    },
    false
  );

  document.getElementById("localstorage").value = localStorage.getItem("test");

  ipcRenderer.on("openUrl", () => {
    let iframe = document.getElementById("webview");
    iframe.src = "https://www.lagou.com/";
  });
});
