import { UserInfoContext } from "@/contexts/user";
import { Button, Image, ScrollView, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useContext, useEffect, useState } from "react";
import { AtInput } from "taro-ui";
import unlogin from "@/assets/unlogin.png";

// 这里更改测试数据
const mockData = [
  {
    type: "user",
    message: "头疼咋办",
  },
  {
    type: "doctor",
    message: `头疼可能是由于多种原因引起的，包括压力、疲劳、缺水、睡眠不足、过度用眼、情绪等。以下是一些建议来缓解头疼：

  1. 休息：尽量找一个安静的地方休息一会儿，闭上眼睛放松一下。

  2. 喝水：确保你喝足够的水，因为脱水可能导致头疼。

  3. 放松：尝试一些放松的活动，比如深呼吸、冥想或伸展运动。

  4. 避免刺激：避免接触过多的光线、噪音和电子设备。

  5. 舒缓压力：按摩颈部和太阳穴可能有助于缓解头疼。

  如果你的头疼情况持续或变得严重，建议及时就医，以便获得专业的建议和治疗。`,
  },
];

export default function MessageDoctor() {
  const router = useRouter();
  const { userInfo } = useContext(UserInfoContext);
  const [message, setMessage] = useState(mockData as any);
  const [value, setValue] = useState("");
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.title || "" });
  }, []);
  return (
    <>
      <ScrollView
        scrollY
        style={{
          boxSizing: "border-box",
          padding: "10px",
          height: "100vh",
          paddingBottom: "60px",
        }}
      >
        {message.map((item) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: item.type === "user" ? "flex-end" : "flex-start",
              margin: "8px 0",
            }}
          >
            {item.type === "user" ? (
              <>
                <View
                  style={{
                    boxSizing: "border-box",
                    lineHeight: "20px",
                    marginRight: "10px",
                    background: "#98c379",
                    padding: "10px",
                    borderRadius: "10px",
                    color: "white",
                  }}
                >
                  {item.message}
                </View>
                <View style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                    src={
                      item.type === "doctor"
                        ? router.params?.url
                        : userInfo?.user_avatar
                        ? userInfo?.user_avatar
                        : unlogin
                    }
                  />
                </View>
              </>
            ) : (
              <>
                <View style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                    src={
                      item.type === "doctor"
                        ? router.params?.url
                        : userInfo?.user_avatar
                        ? userInfo?.user_avatar
                        : unlogin
                    }
                  />
                </View>
                <View
                  style={{
                    boxSizing: "border-box",
                    lineHeight: "20px",
                    marginLeft: "10px",
                    background: "#f4f6f8",
                    color: "black",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  {item.message}
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          position: "absolute",
          left: 0,
          bottom: 0,
          borderTop: "1px solid #eee",
          padding: "4px 0",
        }}
      >
        <View
          style={{
            flex: 1,
            boxSizing: "border-box",
            padding: "0 4px",
            borderBottom: "1px solid #7ca3ec",
          }}
        >
          <AtInput
            value={value}
            onChange={(e) => setValue(e.toString())}
            name="message"
            placeholder="请输入你的症状"
          />
        </View>
        <Button
          style={{
            margin: "0 10px",
            background: "#7ca3ec",
            color: "white",
            borderRadius: "20px",
          }}
          onClick={() => {
            setMessage([
              ...message,
              {
                type: "user",
                message: value,
              },
              {
                type: "doctor",
                message: "GPT正在接入中",
              },
            ]);
            setValue("");
          }}
        >
          发送
        </Button>
      </View>
    </>
  );
}
