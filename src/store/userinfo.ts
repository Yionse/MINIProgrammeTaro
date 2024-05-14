import { createSlice } from "@reduxjs/toolkit";

interface TUserInfo {
  user_id: number;
  user_name: string;
  user_nickname: string;
  user_password: string;
  user_intro: string;
  user_gender: string;
  user_avatar: string;
  user_birth: string;
}

const initialState: TUserInfo = {} as any;

const userinfo = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    init: () => {},
    quit: () => {},
  },
});

export const { init, quit } = userinfo?.actions;

export default userinfo.reducer;
