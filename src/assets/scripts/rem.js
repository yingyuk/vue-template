export const rem = function () {
  function setFontSize(mw, mh, tw, th) {
    // 设备宽高
    let deviceWidth = document.documentElement.clientWidth;
    let deviceHeight = document.documentElement.clientHeight;
    let fontSize = 1;
    calSize();

    function calSize() {
      deviceWidth = document.documentElement.clientWidth;
      deviceHeight = document.documentElement.clientHeight;
      if (deviceWidth < 1080) {
        fontSize = deviceWidth / mw * 100;
      } else {
        fontSize = deviceWidth / mw * 100;
      }
      document.documentElement.style.fontSize = `${fontSize}px`;
    }
    window.addEventListener('resize', (event) => {
      calSize();
    });
  }
  setFontSize(375 * 2, 667 * 2, 768 * 2, 1024 * 2);
};
