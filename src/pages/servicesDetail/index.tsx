import { get, post } from "@/apis";
import GoLoginBar from "@/components/GoLoginBar";
import { UserInfoContext } from "@/contexts/user";
import { Button, Image, ScrollView, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useContext, useEffect, useState } from "react";

export default function ServicesDetail() {
  const router = useRouter();
  const { userInfo } = useContext(UserInfoContext);
  const [data, setData] = useState({} as any);
  async function initData() {
    const res = (await get(
      `/services/showById?id=${router.params?.id || 1}`
    )) as any;
    setData(res?.data);
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.title || "理疗" });
    initData();
  }, []);
  return (
    <>
      {!userInfo?.user_id && <GoLoginBar />}
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
          理疗服务简介
        </View>
        <Image
          src={data?.S_main_image}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <View className="space">{data?.S_name}</View>
        <View className="space">{data?.S_intro}</View>
        <View className="space">
          价格：￥
          <Text style={{ fontWeight: "bold", color: "#7ca3ec" }}>
            {data?.S_price}
          </Text>
        </View>
        <View className="space">时长：{data?.S_purchase_instructions}</View>
        <View className="space">主治：{data?.S_indications}</View>
        <View className="space">适用人群：{data?.S_people}</View>
        <Button
          onClick={async () => {
            if (userInfo?.user_id) {
              // 创建一个新的Date对象，它会自动获取当前的日期和时间
              const currentDate = new Date();

              // 使用Date对象的方法来获取年、月、日、时、分、秒等信息
              const year = currentDate.getFullYear();
              const month = currentDate.getMonth() + 1; // 月份是从0开始的，所以要加1
              const day = currentDate.getDate();
              const hours = currentDate.getHours();
              const minutes = currentDate.getMinutes();
              const seconds = currentDate.getSeconds();
              await post("/services/addOrder", {
                O_user: userInfo?.user_id,
                O_service: router.params?.id,
                O_price: data?.S_price,
                O_date: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
              });
              Taro.showToast({ icon: "success", title: "成功下单" });
              setTimeout(() => Taro.navigateBack(), 1000);
            } else {
              Taro.showToast({ icon: "error", title: "暂未登录" });
            }
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
    </>
  );
}
