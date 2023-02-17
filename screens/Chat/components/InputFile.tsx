import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import ImagePicker from "../../../components/ImagePicker";
import ChatBotContext from "../context/chatBotProvider";

interface InputFileProps {
  dataToBeAdded: string;
}

const InputFile: React.FC<InputFileProps> = ({ dataToBeAdded }) => {
  const [image, setImage] = React.useState("");
  const { addInformation, userInfo, setUserIsTyping } =
    React.useContext(ChatBotContext);

  useEffect(() => {
    setUserIsTyping(true);
  }, []);

  const handleImage = (image: string) => {
    setImage(image);
  };

  const customButton = (
    <View>
      <Text style={styles.buttonText}>Tirar foto</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.inputContainer}>
          <ImagePicker
            saveImage={handleImage}
            color={"white"}
            customButton={customButton}
          />
        </View>
        <Pressable
          style={image ? styles.button : styles.buttonDisabled}
          disabled={!image}
          onPress={() => {
            addInformation({
              ...userInfo,
              [dataToBeAdded]: image,
            });
            setImage("");
          }}
        >
          <Text style={styles.buttonText}>Enviar</Text>
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
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    height: 50,
    backgroundColor: "#6e43fe",
    marginBottom: 10,
  },
  buttonDisabled: {
    width: "100%",
    padding: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "green",
    opacity: 0.5,
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

export default InputFile;
