import myAnimation from "../utils/myAnimation";
import { doDrawAxis } from "./axis";

function drawLinePoint(speed) {
  const { ctx, defaultOptions } = this.getOptions();
  const data = defaultOptions.data;
  const len = data.length;
  const height = defaultOptions.height;

  // 计算
  ctx.save();
  ctx.lineWidth = 2;
  for (let i = 0; i < len; i++) {
    let yVal = parseInt(data[i].yVal * speed);
    let tranY = height - (height * yVal) / defaultOptions.maxPoint - 30;
    let tranX = i * (defaultOptions.fitWidth / len - 1) + defaultOptions.x;

    // 绘制图形
    ctx.beginPath();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3;
    ctx.shadowColor = defaultOptions.styles.pointColor;
    ctx.fillStyle = defaultOptions.styles.pointColor;
    ctx.strokeStyle = "#fff";
    console.log("绘制圆点", tranX, tranY);
    ctx.arc(tranX, tranY, 6, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // 绘制圆形对应的数值
    ctx.beginPath();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.font = defaultOptions.fontSize + " MicroSoft YaHei";
    ctx.fillText(yVal, tranX, tranY - 10);
    ctx.closePath();
  }
  ctx.restore();
}

function drawLine(speed) {
  const { ctx, defaultOptions } = this.getOptions();
  const bottomPad = 30;
  const data = defaultOptions.data;
  const height = defaultOptions.height;
  const maxPoint = defaultOptions.maxPoint;
  const len = data.length - 1;
  const stepDots = Math.floor(speed * len);

  // 绘制线条
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = defaultOptions.lineWidth;
  ctx.strokeStyle = defaultOptions.styles.lineColor;
  for (let i = 0; i < len; i++) {
    // 起点
    const yVal = data[i].yVal;
    const axisY = height - height * (yVal / maxPoint) - bottomPad;
    const averageNum = defaultOptions.fitWidth / data.length - 1;
    const axisX = i * averageNum + defaultOptions.x;

    // 终点
    let axisEndX = (i + 1) * averageNum + defaultOptions.x;
    let axisEndY = height - (height * data[i + 1].yVal) / maxPoint - bottomPad;

    if (i <= stepDots) {
      if (i === stepDots) {
        axisEndX = (axisEndX - axisX) * speed + axisX;
        axisEndY = (axisEndY - axisY) * speed + axisY;
      }
      ctx.moveTo(axisX, axisY);
      ctx.lineTo(axisEndX, axisEndY);
    }
  }
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

export function doDrawLine(chart) {
  myAnimation.call(chart, {
    percent: 200,
    render: (percent) => {
      console.log("绘制圆环", percent);
      chart.clearCanvas();

      doDrawAxis.call(chart);
      drawLinePoint.call(chart, percent / 200);
      drawLine.call(chart, percent / 200);
    },
  });
}
