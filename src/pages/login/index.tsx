import { Button, View } from "@tarojs/components";
import "./index.less";
import { AtInput } from "taro-ui";
import { useRef, useState } from "react";
import Taro from "@tarojs/taro";

export default function Login() {
  const infoState = useRef({ userName: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  return (
    <View
      style={{
        height: "100vh",
        boxSizing: "border-box",
        padding: "10px 0",
        paddingTop: "50%",
        background: "#eee",
      }}
    >
      <View className="item-input">
        <AtInput
          title="账号："
          name="password"
          className="input-controller"
          placeholder="请输入您的账号"
          onChange={(e) => (infoState.current.userName = e.toString())}
        />
      </View>
      <View className="item-input">
        <AtInput
          title="密码："
          name="password"
          className="input-controller"
          placeholder="输入您的密码"
          type="password"
          onChange={(e) => (infoState.current.password = e.toString())}
        />
      </View>
      <View
        style={{
          textAlign: "right",
          paddingRight: "20px",
          color: "#7ca3ec",
        }}
        onClick={() => {
          if (isLogin) {
            Taro.setNavigationBarTitle({ title: "注册" });
            setIsLogin(false);
          } else {
            Taro.setNavigationBarTitle({ title: "登录" });
            setIsLogin(true);
          }
        }}
      >
        {isLogin ? "注册" : "登录"}
      </View>
      <Button
        style={{
          width: "80%",
          margin: "10px auto",
          borderRadius: "20px",
          background: "#7ca3ec",
          color: "white",
        }}
      >
        {isLogin ? "登录" : "注册"}
      </Button>
    </View>
  );
}
