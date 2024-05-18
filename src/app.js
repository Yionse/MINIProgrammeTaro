import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import "./app.less";
import "taro-ui/dist/style/index.scss"; // 全局引入一次即可
import { setSeystemNavHeight } from "@/utils/statusHeight";
import { UserInfoProvider } from "./contexts/user";
import { EventsProvider } from "./contexts/events";

function App({ children }) {
  useLaunch(() => {
    setSeystemNavHeight();
  });

  // children 是将要会渲染的页面
  return (
    <EventsProvider>
      <UserInfoProvider>{children}</UserInfoProvider>
    </EventsProvider>
  );
}

export default App;
