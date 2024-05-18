import { get } from "@/apis";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function Article() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  async function initData() {
    const res = (await get(
      `/knowledge/showById?id=${router.params?.id}`
    )) as any;
    setData(res?.data);
  }
  useEffect(() => {
    initData();
  }, []);
  return (
    <ScrollView scrollY style={{ padding: "10px 0" }}>
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        {data?.k_title}
      </View>
      <View
        style={{
          margin: "10px 0",
          textAlign: "right",
          color: "#7ca3ec",
          paddingRight: "10px",
        }}
      >
        发布时间：{data?.k_date}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          src={data?.k_image}
          style={{ margin: "0 auto", borderRadius: "6px" }}
        />
      </View>
      <View style={{ textIndent: "2em", padding: "10px" }}>
        {data?.k_content}
      </View>
    </ScrollView>
  );
}
