import { get } from "@/apis";
import { Button, Image, ScrollView, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const [data, setData] = useState({} as any);
  async function initData() {
    const res = (await get(
      `/goods/showGoodsById?id=${router.params?.id}`
    )) as any;
    setData(res.data);
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.title || "" });
    initData();
  }, []);
  return (
    <ScrollView scrollY style={{ boxSizing: "border-box", padding: "10px" }}>
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        商品简介
      </View>
      <Image
        src={data?.g_image}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <View className="space">{data?.g_name}</View>
      <View className="space">{data?.g_intro}</View>
      <View className="space">
        价格：￥
        <Text style={{ fontWeight: "bold", color: "#7ca3ec" }}>
          {data?.g_price}
        </Text>
      </View>
      <View className="space">生产日期：{data?.g_time}</View>
      <View className="space">配送类型：{data?.g_trade}</View>
      <View className="space">药品类型：{data?.g_type}</View>
      <Button
        onClick={async () => {
          Taro.showToast({ icon: "error", title: "无法购买" });
        }}
        style={{
          background: "#7ca3ec",
          color: "white",
          border: "1px solid #eee",
          borderRadius: "20px",
        }}
      >
        购买
      </Button>
    </ScrollView>
  );
}
