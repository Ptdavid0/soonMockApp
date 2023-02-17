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
import ChatBotContext from "../context/chatBotProvider";
import * as ImagePicker from "expo-image-picker";

interface InputFileUploadProps {
  dataToBeAdded: string;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ dataToBeAdded }) => {
  const [image, setImage] = React.useState("");
  const { addInformation, userInfo, setUserIsTyping } =
    React.useContext(ChatBotContext);

  useEffect(() => {
    setUserIsTyping(true);
  }, []);

  const handleImage = (image: string) => {
    setImage(image);
  };

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      handleImage(result.uri);
      console.log(result.uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Pressable onPress={showImagePicker}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Escolher foto</Text>
          </View>
        </Pressable>
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    padding: 10,
    height: 50,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    padding: 12,
    paddingLeft: 15,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 5,
    backgroundColor: "#383838",
  },
  buttonDisabled: {
    padding: 12,
    paddingLeft: 15,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 5,
    backgroundColor: "#383838",
    opacity: 0.5,
  },
  button: {
    padding: 12,
    paddingLeft: 15,
    height: 45,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: "#383838",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default InputFileUpload;
