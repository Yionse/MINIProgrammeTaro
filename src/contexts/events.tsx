import { Events } from "@tarojs/taro";
import { createContext } from "react";

export const EventsContext = createContext<{ events: TaroGeneral.Events }>(
  {} as any
);

export const EventsProvider = ({ children }) => {
  const events = new Events();
  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
};
