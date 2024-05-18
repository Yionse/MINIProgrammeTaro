import { get } from "@/apis";
import { Image, ScrollView, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function DoctorDetail() {
  const router = useRouter();
  const [data, setData] = useState({} as any);
  async function initData() {
    const res = (await get(
      `/doctor/showById?id=${router.params?.id || 1}`
    )) as any;
    setData(res?.data);
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.title || "医生" });
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
        医生简介
      </View>
      <Image
        src={data?.d_avatar}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <View className="space">{data?.d_name}</View>
      <View className="space">{data?.d_gender}</View>
      <View className="space">科室：{data?.d_department}</View>
      <View className="space">职称：{data?.d_title}</View>
      <View className="space">主治：{data?.d_area}</View>
    </ScrollView>
  );
}
