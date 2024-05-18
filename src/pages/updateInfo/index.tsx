import { Button, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useContext, useEffect, useRef, useState } from "react";
import { AtInput } from "taro-ui";
import "../login/index.less";
import { get, post } from "@/apis";
import { UserInfoContext } from "@/contexts/user";

export default function UpdateInfo() {
  const router = useRouter();
  const { setUserInfo } = useContext(UserInfoContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user_intro, setUserIntro] = useState("");
  const currentInfo = useRef();
  async function initData() {
    const res = (await get("/userInfo/showById", {
      id: router?.params?.id,
    })) as any;
    setUserName(res?.data?.user_name);
    setPassword(res?.data?.user_password);
    setUserIntro(res?.data?.user_intro);
    currentInfo.current = res?.data;
  }
  useEffect(() => {
    initData();
  }, []);
  return (
    <View style={{ background: "#eee", height: "100vh" }}>
      <View className="item-input">
        <AtInput
          title="用户名："
          name="text"
          className="input-controller"
          placeholder="请输入您的用户名"
          value={userName}
          onChange={(e) => setUserName(e.toString())}
        />
      </View>
      <View className="item-input">
        <AtInput
          title="密码："
          name="text"
          className="input-controller"
          placeholder="输入您的密码"
          value={password}
          onChange={(e) => setPassword(e.toString())}
        />
      </View>
      <View className="item-input">
        <AtInput
          title="个性签名："
          name="text"
          className="input-controller"
          placeholder="请输入您的个性签名"
          value={user_intro}
          onChange={(e) => setUserIntro(e.toString())}
        />
      </View>
      <Button
        style={{
          width: "80%",
          margin: "10px auto",
          borderRadius: "20px",
          background: "#7ca3ec",
          color: "white",
        }}
        onClick={async () => {
          if (!userName || !password || !user_intro) {
            Taro.showToast({ title: "请输入完整的信息" });
            return;
          }
          console.log({
            ...{ ...currentInfo.current },
            user_id: router?.params?.id,
            user_name: userName,
            user_password: password,
            user_intro: user_intro,
          });

          const res = await post("/userInfo/updateInfo", {
            ...{ ...currentInfo.current },
            user_id: router?.params?.id,
            user_name: userName,
            user_password: password,
            user_intro: user_intro,
          });
          setUserInfo(res?.data as any);
          Taro.showToast({ icon: "success", title: "修改成功" });
          setTimeout(() => Taro.navigateBack(), 1000);
        }}
      >
        保存
      </Button>
    </View>
  );
}
