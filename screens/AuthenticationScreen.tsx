import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { AppContext } from "../store/AppContext";

const LogIn: React.FC = () => {
  const [tab, setTab] = useState<string>("login");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredCPF, setEnteredCPF] = useState<string>("");
  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState<string>("");
  const [formatedPhoneNumber, setFormatedPhoneNumber] = useState<string>("");
  const phoneInput = useRef<PhoneInput>(null);

  const { authUser } = React.useContext(AppContext);

  const onSubmit = (type: string) => {
    if (type === "signup") {
      const signupData = {
        email: enteredEmail,
        cpf: enteredCPF,
        phoneNumber: formatedPhoneNumber,
        name: enteredName,
      };
    } else {
      const loginData = {
        phoneNumber: formatedPhoneNumber,
      };
    }
    authUser(true);
  };

  const LogInTab = (
    <View style={styles.inputContainer}>
      <PhoneInput
        ref={phoneInput}
        containerStyle={styles.phoneInput}
        value={enteredPhoneNumber}
        onChangeText={(text) => {
          setEnteredPhoneNumber(text);
        }}
        onChangeFormattedText={(text) => {
          setFormatedPhoneNumber(text);
        }}
        defaultCode="DM"
        layout="first"
      />
      <Button
        title="Entrar"
        color="#26f4af"
        onPress={() => onSubmit("login")}
      />
    </View>
  );

  const SignUpTab = (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#C8C7CC"
        onChangeText={(text) => {
          setEnteredName(text);
        }}
        value={enteredName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#C8C7CC"
        onChangeText={(text) => {
          setEnteredEmail(text);
        }}
        value={enteredEmail}
        onBlur={() => {}}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#C8C7CC"
        onChangeText={(text) => {
          setEnteredCPF(text);
        }}
        value={enteredCPF}
      />
      <PhoneInput
        ref={phoneInput}
        containerStyle={styles.phoneInput}
        value={enteredPhoneNumber}
        onChangeText={(text) => {
          setEnteredPhoneNumber(text);
        }}
        onChangeFormattedText={(text) => {
          setFormatedPhoneNumber(text);
        }}
        defaultCode="DM"
        layout="first"
      />
      <Button
        title="Cadastrar"
        color="#26f4af"
        onPress={() => onSubmit("signup")}
      />
    </View>
  );

  const onTabChange = (tab: string) => {
    setTab(tab);
    setEnteredEmail("");
    setEnteredName("");
    setEnteredCPF("");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/soonLogoMobile.png")}
        style={styles.image}
      />
      <View
        style={[
          styles.upperDataContainer,
          tab === "login" ? { height: 300 } : { height: 450 },
        ]}
      >
        <View style={styles.tabButtons}>
          <TouchableOpacity
            style={{ marginBottom: 40 }}
            onPress={() => onTabChange("signup")}
          >
            <Text
              style={[styles.tabText, tab !== "signup" && styles.hideTabButton]}
            >
              Cadastrar
            </Text>
            {tab === "signup" && <View style={styles.tabLine} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginBottom: 40 }}
            onPress={() => onTabChange("login")}
          >
            <Text
              style={[styles.tabText, tab !== "login" && styles.hideTabButton]}
            >
              Entrar
            </Text>
            {tab === "login" && <View style={styles.tabLine} />}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {tab === "login" ? LogInTab : SignUpTab}
        </View>
      </View>
      <Text style={styles.subText}>
        By clicking start, you agree to our{" "}
        <Text style={styles.subTextStrong}>Terms and Conditions</Text>{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#5c40ff",
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 140,
    marginVertical: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  subText: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    color: "#fff",
    marginTop: 10,
  },
  tabButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 10,
    marginTop: 40,
    borderBottomColor: "#e6e6e6",
    borderBottomWidth: 2,
  },
  upperDataContainer: {
    alignSelf: "center",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 29,
    letterSpacing: 0.225882,
    color: "#262628",
  },
  input: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#EFEFF4",
    borderWidth: 2,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    height: "100%",
  },
  phoneInput: {
    borderRadius: 8,
    borderColor: "#EFEFF4",
    borderWidth: 2,
  },
  hideTabButton: {
    opacity: 0.5,
  },
  subTextStrong: {
    fontWeight: "700",
  },
  tabLine: {
    borderBottomColor: "#26f4af",
    borderBottomWidth: 4,
    borderRadius: 8,
    width: 50,
    alignSelf: "center",
    marginTop: 5,
  },
});

export default LogIn;
