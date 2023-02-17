import React, {
  useEffect,
  useState,
  Fragment,
  useContext,
  useRef,
} from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BubblesFactory from "./components/BubbleFactory";
import data from "./data/chatBot.json";
import ChatBotContext from "./context/chatBotProvider";
import { ComponentsFactory } from "./factory/ComponentFactory";
import { RenderItems } from "./util/constants";
import BottomSheet, { BottomSheetRefProps } from "./components/BottomSheet";
import { useKeyboard } from "./util/keyboardHeight";

const ChatBot = () => {
  const [components, setComponents] = useState<any>([]);
  const keyboardHeight = useKeyboard();
  const { reducer, currentModalSize } = useContext(ChatBotContext);
  const { state, dispatch } = reducer;
  const mockdata: any = data;

  const ref = useRef<BottomSheetRefProps>(null);

  useEffect(() => {
    const isActive = ref?.current?.isActive();
    if (state.showModal && isActive) {
      ref?.current?.scrollTo(-(keyboardHeight + 100));
    } else {
      ref?.current?.scrollTo(-100);
    }
  }, [state.showModal, keyboardHeight]);

  useEffect(() => {
    if (data) {
      setComponents([
        ...components,
        <BubblesFactory
          data={mockdata.chatBot[state.currentAction]}
          bubble={ComponentsFactory(state.renderItem, state.infoToBeAdded)}
          interval={state.renderItem === RenderItems.CHAT_BUBBLE ? 3000 : 1500}
          callback={() => {
            state.nextAction && dispatch({ type: state.nextAction });
          }}
          addUserInfo={state.addUserInfo}
          infoToBeAdded={state.infoToBeAdded}
        />,
      ]);
    }
  }, [state]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Criação de Conta</Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: currentModalSize - 680,
        }}
      >
        {components.map((component: any, index: number) => {
          return <Fragment key={index}>{component}</Fragment>;
        })}
      </ScrollView>
      {state.showModal && (
        <BottomSheet ref={ref}>
          {ComponentsFactory(state.modalItem, state.infoToBeAdded)}
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300,
    padding: 20,
    backgroundColor: "white",
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "white",
    opacity: 0.6,
  },
  titleContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
