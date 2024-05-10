import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function StatusBar() {
  return (
    <View
      style={{
        height: Taro.getSystemInfoSync().statusBarHeight + "px",
      }}
    ></View>
  );
}
