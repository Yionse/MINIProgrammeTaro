import { useAppSelector } from "@/store";
import { useMemo } from "react";

export function useLogin() {
  const userinfo = useAppSelector((store) => store.userinfo);
  const isLogin = useMemo(() => !!userinfo?.user_id, [userinfo]);
  return isLogin;
}
