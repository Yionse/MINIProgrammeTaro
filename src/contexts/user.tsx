import { createContext, useState } from "react";

export const UserInfoContext = createContext<{
  userInfo: any;
  setUserInfo: React.Dispatch<any>;
}>({} as any);

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState<any>({});
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
