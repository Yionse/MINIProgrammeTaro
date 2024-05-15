import StatusBar from "@/components/StatusBar";
import { Button, Image, ScrollView, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useContext, useEffect } from "react";
import unlogin from "@/assets/unlogin.png";
import { UserInfoContext } from "@/contexts/user";

export default function User() {
  const { userInfo } = useContext(UserInfoContext);
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
          src={userInfo?.user_avatar ? userInfo?.user_avatar : unlogin}
          style={{
            width: "80px",
            height: "80px",
            marginTop: "-30px",
            borderRadius: "50%",
            border: "1px solid #eee",
          }}
        />
        {userInfo ? (
          <>
            <Text style={{ position: "absolute", top: "10px", right: "10px" }}>
              编辑资料&gt;
            </Text>
            <View style={{ fontWeight: "bold", fontSize: "22px" }}>
              {userInfo?.user_nickname}
            </View>
            <View style={{ color: "gray" }}>{userInfo?.user_intro}</View>
          </>
        ) : (
          <View>暂未登录</View>
        )}
        {!userInfo && (
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
