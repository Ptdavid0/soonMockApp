import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import ChatBotContext from "../context/chatBotProvider";

interface InputDataProps {
  dataToBeAdded: string;
}

const InputData: React.FC<InputDataProps> = ({ dataToBeAdded }) => {
  const [text, setText] = React.useState("");
  const { addInformation, userInfo, setUserIsTyping } =
    React.useContext(ChatBotContext);

  useEffect(() => {
    setUserIsTyping(true);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <TextInput
          value={text}
          placeholder="Digite seu nome..."
          style={styles.input}
          placeholderTextColor="white"
          onChange={(e) => setText(e.nativeEvent.text)}
        />
        <Pressable
          onPress={() => {
            addInformation({
              ...userInfo,
              [dataToBeAdded]: text,
            });
            setText("");
          }}
        >
          <View style={styles.buttonContainer}>
            <Ionicons name="send" size={20} color="#6c6c6c" />
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#787877",
  },
  buttonContainer: {
    flex: 0.8,
    padding: 12,
    paddingLeft: 15,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: "#fff",
  },
  input: {
    flex: 8,
    width: "70%",
    height: 50,
    paddingLeft: 10,
    padding: 2,
    color: "white",
  },
});

export default InputData;
