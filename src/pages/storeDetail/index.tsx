import { get } from "@/apis";
import { Image, ScrollView, Text, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function StoreDetail() {
  const router = useRouter();
  const id = router.params?.id || 1;
  const [product, setProduct] = useState([] as any);
  const [physiotherapy, setPhysiotherapy] = useState([] as any);
  const [doctor, setDoctor] = useState([] as any);
  const [data, setData] = useState({} as any);
  async function initData() {
    const res = (await Promise.all([
      get(`/hospital/showById?id=${id}`),
      get(`/services/showByHospital?hospital=${id}`),
      get(`/doctor/showByHospital?hospital=${id}`),
      // get(`/goods/showByHospital?hospital=${id}`),
    ])) as any;
    setData(res?.[0]?.data);
    setPhysiotherapy(res?.[1]?.data);
    setDoctor(res?.[2]?.data);
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.title || "" });
    initData();
  }, []);
  return (
    <ScrollView scrollY style={{ padding: "10px", boxSizing: "border-box" }}>
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        医馆简介
      </View>
      <Image
        src={data?.h_image}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <View className="space" style={{ textIndent: "2em" }}>
        {data?.h_intro}
      </View>
      <View className="space">地址：{data?.h_location}</View>
      <View className="space">联系电话：{data?.h_phonenumber}</View>
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        理疗服务
      </View>
      {physiotherapy?.map((item) => (
        <View
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/servicesDetail/index?id=${item?.s_id}&title=${item?.s_name}`,
            })
          }
          style={{
            border: "4px solid #eee",
            boxSizing: "border-box",
            borderRadius: "6px",
            padding: "10px",
          }}
          className="space"
        >
          <View
            style={{ fontWeight: "bold", fontSize: "18px" }}
            className="space"
          >
            {item?.s_name}
          </View>
          <Image
            className="space"
            src={
              item?.s_main_image ||
              "https://ts1.cn.mm.bing.net/th/id/R-C.08b9ea2159f603d05e38677ae2c96283?rik=JKlyrAGYLxggyQ&riu=http%3a%2f%2fwww.sucaijishi.com%2fuploadfile%2f2019%2f0122%2f20190122024839378.png%3fimageMogr2%2fformat%2fjpg%2fblur%2f1x0%2fquality%2f60&ehk=wTdS26lFLUKa1P4B9DLm7x428%2b5zRPswq6%2b0wJFwjK0%3d&risl=&pid=ImgRaw&r=0"
            }
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <View className="space">简介：{item?.s_intro}</View>
          <View className="space">主治：{item?.s_indications}</View>
          <View className="space">适用人群：{item?.s_people}</View>
        </View>
      ))}
      <View
        style={{
          fontSize: "20px",
          fontWeight: 700,
          padding: "10px",
          borderLeft: "6px solid #7ca3ec",
          margin: "10px",
        }}
      >
        坐诊医生
      </View>
      {doctor?.map((item) => (
        <View
          onClick={() =>
            Taro.navigateTo({
              url: `/pages/doctorDetail/index?id=${item?.d_id}&title=${item?.d_name}`,
            })
          }
          className="space"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "4px solid #eee",
            borderRadius: "6px",
          }}
        >
          <Image
            className="space"
            src={item?.d_avatar}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <View style={{ marginLeft: "10px" }}>
            <View
              style={{ fontWeight: "bold", fontSize: "18px", margin: "10px 0" }}
            >
              {item?.d_name}
            </View>
            <View>职称：{item?.d_title}</View>
            <View>科室：{item?.d_department}</View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
