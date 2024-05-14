import "./index.less";
import { AtTabBar } from "taro-ui";
import { useState } from "react";
import MeIndex from "./components/index";
import Store from "./components/store";
import Message from "./components/message";
import Shopping from "./components/shopping";
import User from "./components/users";
import { Provider } from "react-redux";
import store from "@/store";

const statusMap = {
  0: <MeIndex />,
  1: <Store />,
  2: <Message />,
  3: <Shopping />,
  4: <User />,
};

export default function Index() {
  const [current, setCurrent] = useState(0);
  return (
    <Provider store={store}>
      {statusMap[current]}
      <AtTabBar
        fixed
        tabList={[
          { title: "首页", iconType: "home" },
          { title: "医馆", iconType: "heart" },
          { title: "咨询", iconType: "message" },
          { title: "商城", iconType: "shopping-cart" },
          { title: "我的", iconType: "user" },
        ]}
        current={current}
        onClick={setCurrent}
      />
    </Provider>
  );
}
