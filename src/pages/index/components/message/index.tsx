import StatusBar from "@/components/StatusBar";
import { ScrollView, View } from "@tarojs/components";

export default function Message() {
  return (
    <ScrollView scrollY>
      <StatusBar background="#7ca3ec" />
      <View>正在完善中</View>
    </ScrollView>
  );
}
