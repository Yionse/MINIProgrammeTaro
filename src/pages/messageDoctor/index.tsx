import { UserInfoContext } from "@/contexts/user";
import { Button, Image, ScrollView, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useContext, useEffect, useRef, useState } from "react";
import { AtInput } from "taro-ui";
import unlogin from "@/assets/unlogin.png";
import { get, post } from "@/apis";

export default function MessageDoctor() {
  const router = useRouter();
  const { userInfo } = useContext(UserInfoContext);
  const [message, setMessage] = useState([] as any);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const copyText = useRef("");
  async function initData() {
    // 创建一个新的Date对象，它会自动获取当前的日期和时间
    const currentDate = new Date();

    // 使用Date对象的方法来获取年、月、日、时、分、秒等信息
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 月份是从0开始的，所以要加1
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    await post("/doctor/addToConsultation", {
      C_user: userInfo?.user_id,
      C_doctor: Number(router.params?.id),
      C_date: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
      C_price: Number((Math.random() * 100).toFixed(2)),
    });
  }
  async function ask() {
    const res = (await get("/doctor/ask", {
      ask: copyText.current,
    })) as any;
    setLoading(false);
    setMessage([
      ...message,
      {
        type: "user",
        message: copyText.current,
      },
      {
        type: "doctor",
        message: res?.message || "未知错误，请重试",
      },
    ]);
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.title || "" });
    initData();
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
          onClick={async () => {
            if (!value) {
              Taro.showToast({ title: "请输入症状", icon: "error" });
              return;
            }
            if (loading) {
              Taro.showToast({ title: "正在等待AI响应", icon: "error" });
              return;
            }
            setLoading(true);
            setMessage((message) => [
              ...message,
              { type: "user", message: value },
              { type: "doctor", message: "AI思考中" },
            ]);
            copyText.current = value;
            setValue("");
            await ask();
          }}
        >
          发送
        </Button>
      </View>
    </>
  );
}
