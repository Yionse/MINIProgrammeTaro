import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

export default function GoLoginBar() {
  return (
    <View
      onClick={() => Taro.navigateTo({ url: "/pages/login/index" })}
      style={{ background: "#7ca3ce", padding: "4px" }}
    >
      当前暂未登录，点击去登录
    </View>
  );
}
