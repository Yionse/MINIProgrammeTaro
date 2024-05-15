import { Button, View } from "@tarojs/components";
import "./index.less";
import { AtInput } from "taro-ui";
import { useContext, useState } from "react";
import Taro from "@tarojs/taro";
import { get } from "@/apis";
import { UserInfoContext } from "@/contexts/user";
export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { setUserInfo } = useContext(UserInfoContext);
  const btnHandle = async () => {
    if (!userName || !password) {
      Taro.showToast({ title: "输入不完整" });
      return;
    }
    if (isLogin) {
      const res = (await get("/login/login", {
        user_name: userName,
        password,
      })) as any;
      if (res?.data) {
        setUserInfo(res.data);
        Taro.navigateBack();
        Taro.showToast({ title: "登录成功" });
      } else {
        Taro.showToast({ title: "登录失败" });
      }
    } else {
      const res = (await get("/login/register", {
        user_name: userName,
        password,
      })) as any;
      if (res?.message.include("注册成功")) {
        Taro.showToast({ title: "注册成功" });
        setIsLogin(true);
      } else {
        Taro.showToast({ title: "注册失败" });
      }
    }
  };
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
          name="text"
          className="input-controller"
          placeholder="请输入您的账号"
          value={userName}
          onChange={(e) => setUserName(e.toString())}
        />
      </View>
      <View className="item-input">
        <AtInput
          title="密码："
          name="password"
          className="input-controller"
          placeholder="输入您的密码"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.toString())}
        />
      </View>
      <View
        style={{
          textAlign: "right",
          paddingRight: "20px",
          color: "#7ca3ec",
        }}
        onClick={() => {
          setUserName("");
          setPassword("");
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
        onClick={btnHandle}
      >
        {isLogin ? "登录" : "注册"}
      </Button>
    </View>
  );
}
