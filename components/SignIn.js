import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Toast from "react-native-toast-message";
import useHttp from "../hooks/useHttp";

const SignIn = ({ navigation }) => {
  const [inputId, setInputId] = useState("");
  const [inputName, setInputName] = useState("");
  const { request } = useHttp();

  const showToast = () => {
    if (inputId === "") {
      Toast.show({
        type: "error",
        text1: "Enter info to below!",
        text2: "Warning!❌",
        position: "top",
        visibilityTime: 2000,
      });
    } else {
      const newUser = {
        username: inputName,
        userId: inputId,
      };
      request(
        "https://telegramclone.up.railway.app/login",
        "POST",
        JSON.stringify(newUser)
      )
        .then(setInputName(""))
        .then(setInputId(""))
        .then((res) => {
          if (res === undefined) {
            Toast.show({
              type: "error",
              text1: "This user doesn't exist!",
              text2: "Warning!❌",
              position: "top",
              visibilityTime: 4000,
            });
            console.log(res);
          } else {
            Toast.show({
              type: "customToast",
              text1: "Welcome👋!",
              text2: "Account Signed In!✅",
              position: "top",
              visibilityTime: 2000,
              props: {
                backgroundColor: "blue",
              },
            });
            setTimeout(() => {
              navigation.navigate("Dashboard", { data: res });
            }, 1000);
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_bold}>Login to your Account</Text>
      <Text style={styles.text_thin}>
        Enter your username and ID to load your account. If you haven't saved
        it, you can find it in your app settings.
      </Text>
      <TextInput
        style={styles.input}
        value={inputName}
        onChangeText={(name) => setInputName(name)}
        placeholder="enter your username"
        placeholderTextColor={"white"}
      />
      <TextInput
        style={styles.input}
        keyboardType="numbers-and-punctuation"
        value={inputId}
        onChangeText={(id) => setInputId(id)}
        placeholder="enter your Id"
        placeholderTextColor={"white"}
      />
      <TouchableOpacity style={styles.continue_btn} onPress={showToast}>
        <Text style={styles.btn_text}>Sign In</Text>
      </TouchableOpacity>
      <Toast
        config={{
          customToast: ({ text1, text2, props }) => (
            <View
              style={{
                height: 60,
                width: "90%",
                borderRadius: 10,
                backgroundColor: props.backgroundColor,
                padding: 10,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {text1}
              </Text>
              <Text style={{ color: "white" }}>{text2}</Text>
            </View>
          ),
        }}
      />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    paddingTop: 50,
    alignItems: "left",
    paddingLeft: 34,
    justifyContent: "center",
    backgroundColor: "#349",
  },
  text_bold: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  text_thin: {
    width: 300,
    color: "white",
    textAlign: "left",
  },
  input: {
    width: 320,
    padding: 25,
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    paddingLeft: 15,
  },
  continue_btn: {
    width: 250,
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    marginLeft: 30,
    marginTop: 200,
  },
  btn_text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
