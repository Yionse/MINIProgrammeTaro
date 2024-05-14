import StatusBar from "@/components/StatusBar";
import { useLogin } from "@/hooks";
import { Button, Image, ScrollView, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import unlogin from "@/assets/unlogin.png";

export default function User() {
  const isLogin = useLogin();
  useEffect(() => {
    Taro.setBackgroundColor({ backgroundColorTop: "#8b9ae8" });
  }, []);
  return (
    <ScrollView scrollY>
      <StatusBar background="#7ca3ec" />
      <View
        style={{
          background: "#7ca3ec",
          height: "100px",
        }}
      ></View>
      <View
        style={{
          position: "relative",
          boxSizing: "border-box",
          background: "white",
          width: "90%",
          border: "2px solid #7ca3ec",
          margin: "-70px auto 0",
          padding: "10px",
        }}
      >
        <Image
          src={
            isLogin
              ? "https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236"
              : unlogin
          }
          style={{
            width: "80px",
            height: "80px",
            marginTop: "-30px",
            borderRadius: "50%",
            border: "1px solid #eee",
          }}
        />
        {isLogin ? (
          <>
            <Text style={{ position: "absolute", top: "10px", right: "10px" }}>
              编辑资料&gt;
            </Text>
            <View style={{ fontWeight: "bold", fontSize: "22px" }}>用户名</View>
            <View style={{ color: "gray" }}>个性签名</View>
          </>
        ) : (
          <View>暂未登录</View>
        )}
        {!isLogin && (
          <Button
            style={{ margin: "10px 0", border: "1px solid #7ca3ec" }}
            onClick={() => Taro.navigateTo({ url: "/pages/login/index" })}
          >
            去登录
          </Button>
        )}
      </View>
    </ScrollView>
  );
}
