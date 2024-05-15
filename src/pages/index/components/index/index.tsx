import { get } from "@/apis";
import GoLoginBar from "@/components/GoLoginBar";
import StatusBar from "@/components/StatusBar";
import { UserInfoContext } from "@/contexts/user";
import {
  Image,
  ScrollView,
  Swiper,
  SwiperItem,
  Text,
  View,
} from "@tarojs/components";
import { useContext, useEffect, useState } from "react";
import { AtIcon, AtSearchBar } from "taro-ui";
import "./index.less";

export default function MeIndex() {
  const { userInfo } = useContext(UserInfoContext);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);
  async function initList() {
    const res = (await get("/knowledge/showAll")) as any;
    setList(res?.data);
  }
  useEffect(() => {
    initList();
  }, []);
  return (
    <ScrollView scrollY>
      <StatusBar background="#7ca3ec" />
      <View
        style={{
          textAlign: "center",
          background: "#7ca3ec",
          padding: "10px 0",
          color: "white",
        }}
      >
        首页
      </View>
      <AtSearchBar value={search} onChange={(e) => setSearch(e.toString())} />
      {!userInfo && <GoLoginBar />}
      <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View>
            <Image
              src="https://img.tukuppt.com/ad_preview/00/15/01/5e6ef062a8747.jpg!/fw/980"
              style={{ width: "100%" }}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View>
            <Image
              src="https://pic.616pic.com/bg_w1180/00/00/52/6NSsEwvODd.jpg!/fw/1120"
              style={{ width: "100%" }}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View>
            <Image
              src="https://pic.616pic.com/bg_w1180/00/00/52/6NSsEwvODd.jpg!/fw/1120"
              style={{ width: "100%" }}
            />
          </View>
        </SwiperItem>
      </Swiper>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          margin: "20px 0",
          paddingBottom: "20px",
          borderBottom: "2px solid #7ca3ec",
        }}
      >
        <View className="item-type">
          <View>
            <AtIcon value="lightning-bolt" color="#083cab" />
          </View>
          <Text>问中医</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="shopping-bag" color="#cde7f8" />
          </View>
          <Text>特效秘方</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="share" color="#4cf4ff" />
          </View>
          <Text>中医理疗</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="home" color="#29a2ec" />
          </View>
          <Text>名中医馆</Text>
        </View>
      </View>
      {list?.map((item: any) => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "1px solid #7ca3ec",
            margin: "10px 0",
            boxSizing: "border-box",
            padding: "0 4px",
          }}
        >
          <View>{item?.k_title}</View>
          <Image
            src={item?.k_image}
            style={{ width: "50%", height: "100px" }}
          />
        </View>
      ))}
    </ScrollView>
  );
}
