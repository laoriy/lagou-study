export default function myAnimation(param) {
  let current = 0;
  const callback = param.render;
  const successCb = param.success;
  const speed = param.speed || 4;
  (function looping() {
    requestAnimationFrame(looping);
    if (current < param.percent) {
      current =
        current + speed > param.percent ? param.percent : current + speed;
      callback(current);
    } else {
      window.cancelAnimationFrame(looping);
      successCb && successCb();
    }
  })();
}
