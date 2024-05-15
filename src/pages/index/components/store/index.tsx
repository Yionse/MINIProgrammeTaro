import { get } from "@/apis";
import StatusBar from "@/components/StatusBar";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import { useEffect, useState } from "react";

export default function Store() {
  const [list, setList] = useState([]);
  async function initList() {
    const res = (await get("/hospital/showAll")) as any;
    setList(res?.data);
  }
  useEffect(() => {
    initList();
  }, []);
  return (
    <ScrollView scrollY style={{ paddingBottom: "100px" }}>
      <StatusBar background="#7ca3ec" />
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        理疗服务
      </View>
      {[0, 1, 2].map((item) => (
        <View
          style={{
            textAlign: "center",
            borderBottom: "2px solid #7ca3ec",
            margin: "10px",
          }}
        >
          <Image
            src="https://img95.699pic.com/photo/40180/4484.jpg_wh300.jpg!/fh/300/quality/90"
            style={{ width: "90%", height: "100px" }}
          />
          <View>单人单次中医理疗</View>
          <View>￥20.00</View>
        </View>
      ))}
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        名中医馆
      </View>
      {list?.map((item: any, index: number) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderBottom: "1px solid #7ca3ec",
            margin: "10px 0",
            boxSizing: "border-box",
            padding: "0 4px",
          }}
        >
          <View>
            <View>{item?.h_name}</View>
            <View>地址：{item?.h_region}</View>
            <View>联系电话：{item?.h_phonenumber}</View>
          </View>
          <Image
            src={item?.h_image}
            style={{ width: "50%", height: "100px" }}
          />
        </View>
      ))}
    </ScrollView>
  );
}
