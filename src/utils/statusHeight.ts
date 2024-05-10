import Taro from "@tarojs/taro";

export function setSeystemNavHeight() {
  let _this = this;
  const { windowWidth, windowHeight, statusBarHeight, platform } =
    Taro.getSystemInfoSync();
  let mineHeight = windowHeight * (750 / windowWidth);
  _this.globalData.mineHeight = mineHeight;
  const { top, height, width } = Taro.getMenuButtonBoundingClientRect();
  // 状态栏高度
  Taro.setStorageSync("statusBarHeight", statusBarHeight);
  // 胶囊按钮高度 一般是32 如果获取不到就使用32
  Taro.setStorageSync("menuButtonHeight", height ? height : 32);
  // 胶囊按钮宽度 一般是87 如果获取不到就使用87
  Taro.setStorageSync("menuButtonWidth", width ? width : 87);
  // 判断胶囊按钮信息是否成功获取
  if (top && top !== 0 && height && height !== 0) {
    const navigationBarHeight = (top - statusBarHeight) * 2 + height;
    // 导航栏高度
    Taro.setStorageSync("navigationBarHeight", navigationBarHeight);
  } else {
    Taro.setStorageSync(
      "navigationBarHeight",
      platform === "android" ? 48 : 40
    );
  }
}
