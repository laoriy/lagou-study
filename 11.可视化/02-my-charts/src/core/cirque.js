import utils from "../utils";
import myAnimation from "../utils/myAnimation";

let Cirque = function ({ percent, circleConfig }) {
  const { ctx } = this.getOptions();

  // 绘制打底圆环
  ctx.beginPath();
  ctx.lineWidth = circleConfig.arcWidth;
  let grd = ctx.createRadialGradient(
    circleConfig.x,
    circleConfig.y,
    circleConfig.radius - circleConfig.arcWidth / 2,
    circleConfig.x,
    circleConfig.y,
    circleConfig.radius + circleConfig.arcWidth / 2,
  );
  grd.addColorStop(0, "#e9eae9");
  grd.addColorStop("0.8", "#fefefe");
  grd.addColorStop("1", "#e9eae9");
  ctx.strokeStyle = grd;
  ctx.arc(
    circleConfig.x,
    circleConfig.y,
    circleConfig.radius,
    circleConfig.startAngle,
    circleConfig.endAngle,
  );
  ctx.stroke();
  ctx.closePath();

  // 绘制进度圆环
  ctx.beginPath();
  ctx.lineWidth = circleConfig.arcWidth;
  let linear = ctx.createLinearGradient(220, 220, 380, 200);
  linear.addColorStop(0, "#ffc26b");
  linear.addColorStop(0.5, "#ff9a5f");
  linear.addColorStop(1, "#ff8157");
  ctx.strokeStyle = linear;
  ctx.arc(
    circleConfig.x,
    circleConfig.y,
    circleConfig.radius,
    circleConfig.startAngle,
    circleConfig.endAngle * percent,
  );
  ctx.stroke();
  ctx.closePath();

  // 起点的圆形
  ctx.beginPath();
  ctx.fillStyle = "#ff8157";
  ctx.arc(
    circleConfig.x + circleConfig.radius,
    circleConfig.y - 1,
    circleConfig.arcWidth / 2,
    circleConfig.startAngle,
    circleConfig.endAngle,
  );
  ctx.fill();
  ctx.closePath();

  // 终点的圆形
  ctx.beginPath();
  ctx.lineWidth = circleConfig.arcWidth - 10;
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#ff7854";
  let tarX =
    circleConfig.x + circleConfig.radius * Math.cos(2 * Math.PI * percent);
  let tarY =
    circleConfig.y + circleConfig.radius * Math.sin(2 * Math.PI * percent);
  ctx.arc(
    tarX,
    tarY,
    circleConfig.arcWidth - 8,
    circleConfig.startAngle,
    circleConfig.endAngle,
  );
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

function doDrawCircle(chart) {
  const { opts, defaultOptions } = chart.getOptions();
  let circleConfig = {
    x: opts.width / 2,
    y: opts.height / 2,
    radius: 200,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    arcWidth: 18,
    target: 90,
  };
  circleConfig = utils.extendsObj(defaultOptions, circleConfig);
  myAnimation.call(chart, {
    percent: circleConfig.target,
    render: (percent) => {
      chart.clearCanvas();

      Cirque.call(chart, { circleConfig, percent: percent / 100 });
    },
  });
}

export { Cirque, doDrawCircle };
