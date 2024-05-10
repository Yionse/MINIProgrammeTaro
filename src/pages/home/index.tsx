import { ScrollView, View } from "@tarojs/components";
import "./index.less";
import { AtSearchBar } from "taro-ui";
import { useState } from "react";
import StatusBar from "@/components/StatusBar";
import { AtIcon } from "taro-ui";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <ScrollView scrollY>
      <StatusBar />
      <View>
        <AtSearchBar
          placeholder="输入病症、医生、医馆、商品"
          value={search}
          onChange={(value) => setSearch(value)}
          style={{ flex: 1, width: "50%" }}
        />
        <AtIcon value="message" />
      </View>
    </ScrollView>
  );
}
