import { get } from "@/apis";
import StatusBar from "@/components/StatusBar";
import { UserInfoContext } from "@/contexts/user";
import { Image, ScrollView, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useContext, useEffect, useState } from "react";

export default function Message() {
  const [list, setList] = useState([] as any);
  const { userInfo } = useContext(UserInfoContext);
  async function initData() {
    const res = (await get("/doctor/showAll")) as any;
    setList(res?.data);
  }
  useEffect(() => {
    initData();
  }, []);
  return (
    <ScrollView scrollY>
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
        医生列表
      </View>
      {list?.map((item) => (
        <View
          onClick={() => {
            if (true) {
              Taro.navigateTo({
                url: `/pages/messageDoctor/index?id=${item?.D_id}&title=${item?.D_name}&url=${item?.D_avatar}`,
              });
            } else {
              Taro.showToast({ icon: "error", title: "请先登录" });
            }
          }}
          style={{
            height: "70px",
            lineHeight: "70px",
            boxSizing: "border-box",
            padding: "4px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: "8px",
          }}
        >
          <View style={{ width: "70px", height: "70px" }}>
            <Image
              src={item?.D_avatar}
              style={{ width: "100%", height: "100%", borderRadius: "35px" }}
            />
          </View>
          <View style={{ marginLeft: "10px" }}>
            {item?.D_name}--{item?.D_title}--
            {item?.D_department?.length > 8
              ? item?.D_department.slice(0, 8) + "..."
              : item?.D_department}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
