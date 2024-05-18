import { get } from "@/apis";
import { Image, ScrollView, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function ProductType() {
  const router = useRouter();
  const [data, setData] = useState([] as any);
  async function initData() {
    const res = (await get(
      `/goods/showByType?type=${router.params?.type}`
    )) as any;
    console.log(res);

    setData(res?.data);
  }
  useEffect(() => {
    initData();
    Taro.setNavigationBarTitle({ title: router.params?.type || "" });
  }, []);

  return (
    <ScrollView scrollY style={{ boxSizing: "border-box", padding: "10px" }}>
      {data?.length === 0 && <View>当前分类暂无商品</View>}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "10px",
          boxSizing: "border-box",
          margin: "10px 0",
          justifyContent: "space-between",
        }}
      >
        {data?.map((item) => (
          <View
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/productDetail/index?id=${item?.g_id}&title=${item?.g_name}`,
              })
            }
            style={{
              width: "45%",
              marginTop: "4px",
              border: "4px solid #eee",
              boxSizing: "border-box",
            }}
          >
            <Image
              src={item?.g_image}
              style={{ width: "100%", height: "120px" }}
            />
            <View>{item?.g_name}</View>
            <View>￥{Number(item?.g_price).toFixed(2)}</View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
