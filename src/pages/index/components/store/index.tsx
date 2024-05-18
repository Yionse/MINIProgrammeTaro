import { get } from "@/apis";
import StatusBar from "@/components/StatusBar";
import { Image, ScrollView, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "../../index.less";
import Taro from "@tarojs/taro";

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
        名中医馆
      </View>
      {list?.map((item: any) => (
        <View
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/storeDetail/index?id=${item.h_id}&title=${item?.h_name}`,
            })
          }
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
          <Image className="item-img" src={item?.h_image} />
        </View>
      ))}
    </ScrollView>
  );
}
