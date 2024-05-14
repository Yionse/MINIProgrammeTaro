import StatusBar from "@/components/StatusBar";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";

export default function User() {
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
          borderBottomWidth: 2,
          borderBottomColor: "#eee",
          borderBottomStyle: "solid",
          margin: "-70px auto 0",
          padding: "10px",
        }}
      >
        <Image
          src="https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236"
          style={{
            width: "80px",
            height: "80px",
            marginTop: "-30px",
            borderRadius: "50%",
            border: "1px solid #eee",
          }}
        />
        <Text style={{ position: "absolute", top: "10px", right: "10px" }}>
          编辑资料&gt;
        </Text>
        <View style={{ fontWeight: "bold", fontSize: "22px" }}>用户名</View>
        <View style={{ color: "gray" }}>个性签名</View>
      </View>
    </ScrollView>
  );
}
