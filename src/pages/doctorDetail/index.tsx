import { get } from "@/apis";
import Taro, { useRouter } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function DoctorDetail() {
  const router = useRouter();
  const [data, setData] = useState({} as any);
  async function initData() {
    const res = (await get(
      `/doctor/showById?id=${router.params?.id || 1}`
    )) as any;
    setData(res?.data);
  }
  useEffect(() => {
    Taro.setNavigationBarTitle({ title: router.params?.tile || "医生" });
  }, []);
  return;
}
