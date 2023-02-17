import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ChatBotContext from "../context/chatBotProvider";

interface InputDateProps {
  dataToBeAdded: string;
}

const InputDate: React.FC<InputDateProps> = ({ dataToBeAdded }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { addInformation, userInfo, setUserIsTyping } =
    React.useContext(ChatBotContext);

  useEffect(() => {
    setUserIsTyping(true);
  }, []);

  // ------------------ DATE PICKER ------------------

  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    setDate(selectedDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.datePicker}>
          {(show && Platform.OS === "android") ||
            (Platform.OS === "ios" && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(date)}
                mode={"date"}
                is24Hour={true}
                onChange={onChange}
                style={styles.input}
              />
            ))}

          {Platform.OS === "android" && date && (
            <Pressable onPress={() => setShow(true)}>
              <Text style={{ color: "#fff" }}>{date.toString()}</Text>
            </Pressable>
          )}
        </View>
        <Pressable
          onPress={() => {
            addInformation({
              ...userInfo,
              [dataToBeAdded]: date.toDateString(),
            });
            setDate(new Date());
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
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#787877",
  },
  buttonContainer: {
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
    width: 135,
  },
  datePicker: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingLeft: 10,
    padding: 10,
    backgroundColor: "#787877",
    borderRadius: 10,
    marginRight: 5,
  },
});

export default InputDate;
