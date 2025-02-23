import myAnimation from "../utils/myAnimation";

function _doDrawAxis(chart) {
  const { ctx, defaultOptions } = chart.getOptions();
  const pad = defaultOptions.padding;
  const bottomPad = 30;
  const wd = defaultOptions.width;
  const ht = defaultOptions.height;
  const data = defaultOptions.data;

  // 绘制坐标系
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = defaultOptions.styles.borderColor;
  ctx.moveTo(pad, pad);
  ctx.lineTo(pad, ht - bottomPad);
  ctx.lineTo(wd - pad, ht - bottomPad);
  ctx.stroke();
  ctx.closePath();

  // 绘制文字刻度
  for (let i = 0; i < data.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.font = defaultOptions.fontSize + " Microsoft YaHei";
    ctx.fillText(
      data[i].xVal,
      i * (defaultOptions.fitWidth / data.length - 1) + defaultOptions.x,
      ht - 10,
    );
    ctx.closePath();
  }

  ctx.restore();
}
function doDrawAxis(chart) {
  myAnimation.call(chart, {
    percent: 200,
    render: (percent) => {
      console.log("绘制圆环", percent);
      chart.clearCanvas();

      _doDrawAxis(chart);
    },
  });
}

export { doDrawAxis };
