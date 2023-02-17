import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import ChatBotContext from "../context/chatBotProvider";

const FinishButton: React.FC = () => {
  const { finishChat } = React.useContext(ChatBotContext);

  return (
    <View style={styles.inner}>
      <Pressable style={styles.button} onPress={() => finishChat()}>
        <Text style={styles.buttonText}>Finalizar Cadastro</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 10,
  },
  button: {
    width: "100%",
    padding: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#54e139",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default FinishButton;
