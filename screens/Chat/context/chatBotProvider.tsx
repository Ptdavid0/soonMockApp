import React, { useEffect, createContext, useReducer } from "react";
import { ChatBotReducer, InitialChatBotState } from "./ChatBotReducer";
import { ChatBotStates } from "../util/constants";
import { useNavigation } from "@react-navigation/native";

const ChatBotContext = createContext({
  state: InitialChatBotState,
  dispatch: (action: any) => {},
  userIsTyping: false,
  setUserIsTyping: (typing: boolean) => {},
  userInfo: {},
  setUserInfo: (info: any) => {},
  addInformation: (info: any) => {},
  finishChat: () => {},
  currentModalSize: 0,
  setCurrentModalSize: (size: number) => {},
});

export default ChatBotContext;

export function ChatBotProvider({ children }: any) {
  const [state, dispatch] = useReducer(ChatBotReducer, InitialChatBotState);
  const reducer: any = { dispatch, state, ChatBotStates };
  const [userIsTyping, setUserIsTyping] = React.useState<boolean>(false);
  const [userInfo, setUserInfo] = React.useState<any>({});
  const [currentModalSize, setCurrentModalSize] = React.useState<number>(0);
  useEffect(() => {}, []);
  const navigation = useNavigation();

  const addInformation = (info: any) => {
    setUserIsTyping(false);
    setUserInfo({ ...userInfo, ...info });
  };

  const finishChat = () => {
    console.log(userInfo);
    navigation.navigate("TabOne" as never);
  };

  const value: any = {
    state,
    reducer,
    userIsTyping,
    setUserIsTyping,
    userInfo,
    setUserInfo,
    addInformation,
    finishChat,
    currentModalSize,
    setCurrentModalSize,
  };

  return (
    <ChatBotContext.Provider value={value}>{children}</ChatBotContext.Provider>
  );
}
