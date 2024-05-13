import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function StatusBar({ background }: { background?: string }) {
  return (
    <View
      style={{
        height: Taro.getSystemInfoSync().statusBarHeight + "px",
        background,
      }}
    ></View>
  );
}
