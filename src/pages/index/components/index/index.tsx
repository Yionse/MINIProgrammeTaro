import GoLoginBar from "@/components/GoLoginBar";
import StatusBar from "@/components/StatusBar";
import { useAppSelector } from "@/store";
import { ScrollView, View } from "@tarojs/components";

export default function MeIndex() {
  const userinfo = useAppSelector((store) => store.userinfo);
  return (
    <ScrollView scrollY>
      <StatusBar />
      <View>首页</View>
      {!userinfo?.user_name && <GoLoginBar />}
    </ScrollView>
  );
}
