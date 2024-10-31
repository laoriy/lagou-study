const { getCurrentWindow } = require("@electron/remote");

window.addEventListener("DOMContentLoaded", () => {
  // 利用 remote 可以获取当前窗口对象
  let mainWin = getCurrentWindow();

  window.onbeforeunload = function () {
    let oBox = document.getElementsByClassName('isClose')[0]
    oBox.style.display = 'block'

    let yesBtn = oBox.getElementsByTagName('span')[0]
    let noBtn = oBox.getElementsByTagName('span')[1]

    yesBtn.addEventListener('click', () => {
      mainWin.destroy()
    })

    noBtn.addEventListener('click', () => {
      oBox.style.display = 'none'
    })

    return false
  }

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
});
