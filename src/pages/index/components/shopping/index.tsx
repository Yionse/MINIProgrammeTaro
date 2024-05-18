import { get } from "@/apis";
import StatusBar from "@/components/StatusBar";
import {
  Image,
  ScrollView,
  Swiper,
  SwiperItem,
  Text,
  View,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtIcon } from "taro-ui";

export default function Shopping() {
  const [data, setData] = useState([] as any);
  async function initData() {
    const res = (await get("/goods/showAll")) as any;
    setData(res?.data);
  }
  useEffect(() => {
    initData();
  }, []);
  return (
    <ScrollView scrollY style={{ paddingBottom: "100px" }}>
      <StatusBar background="#7ca3ec" />
      {/* <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
        style={{ margin: "20px 0" }}
      >
        <SwiperItem>
          <View>
            <Image
              src="https://bpic.588ku.com/back_origin_min_pic/19/10/22/0063137fa05696935cf58bfd468616cb.jpg"
              style={{ width: "100%" }}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View>
            <Image
              src="https://tse4-mm.cn.bing.net/th/id/OIP-C.HhedTSPKw2Hy1jRmq_yMxgHaE8?rs=1&pid=ImgDetMain"
              style={{ width: "100%" }}
            />
          </View>
        </SwiperItem>
        <SwiperItem>
          <View>
            <Image
              src="https://img95.699pic.com/photo/50122/4021.jpg_wh860.jpg"
              style={{ width: "100%" }}
            />
          </View>
        </SwiperItem>
      </Swiper> */}
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        商品分类
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "20px 0",
          paddingBottom: "20px",
          borderBottom: "2px solid #7ca3ec",
        }}
      >
        {[
          "滋补营养&lightning-bolt",
          "抗衰防老&shopping-bag",
          "防病祛病&font-color",
          "辅助食疗&money",
          "护肤美容&mail",
          "保健药茶&map-pin",
          "保健药酒&folder",
          "养生饰品&sketch",
        ].map((item) => (
          <View
            className="item-type"
            key={item}
            style={{ margin: "10px 0" }}
            onClick={() =>
              Taro.navigateTo({
                url: `/pages/productType/index?type=${item.split("&")?.[0]}`,
              })
            }
          >
            <View>
              <AtIcon value={item.split("&")?.[1]} color="#29a2ec" />
            </View>
            <Text>{item.split("&")?.[0]}类</Text>
          </View>
        ))}
      </View>
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        热门商品
      </View>
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
