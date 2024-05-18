import StatusBar from "@/components/StatusBar";
import {
  Image,
  ScrollView,
  Swiper,
  SwiperItem,
  Text,
  View,
} from "@tarojs/components";
import { AtIcon } from "taro-ui";

export default function Shopping() {
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
          <Text>四季茶饮</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="shopping-bag" color="#cde7f8" />
          </View>
          <Text>传统滋补</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="share" color="#4cf4ff" />
          </View>
          <Text>养生日用</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="money" color="#29a2ec" />
          </View>
          <Text>养生膏方</Text>
        </View>
        <View className="item-type">
          <View>
            <AtIcon value="home" color="#29a2ec" />
          </View>
          <Text>全部分类</Text>
        </View>
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
        {[0, 1, 2, 3, 4, 5, 6].map((item) => (
          <View
            style={{
              width: "45%",
              marginTop: "4px",
              border: "4px solid #eee",
              boxSizing: "border-box",
            }}
          >
            <Image
              src="https://bpic.588ku.com/back_origin_min_pic/19/10/22/098979949d793941a0a7866ec0029167.jpg"
              style={{ width: "100%", height: "120px" }}
            />
            <View>商品名称</View>
            <View>20.00</View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
