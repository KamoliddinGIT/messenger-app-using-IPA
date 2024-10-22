import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { CommonActions } from "@react-navigation/native";

const SignUp = ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const { request } = useHttp();
  const showToast = () => {
    if (inputText === "") {
      Toast.show({
        type: "error",
        text1: "Enter your name!",
        text2: "Warning!❌",
        position: "top",
        visibilityTime: 2000,
      });
    } else {
      const newUser = {
        username: inputText,
      };
      request(
        `https://telegramclone.up.railway.app/register`,
        "POST",
        JSON.stringify(newUser)
      )
        .then((res) => {
          if (res === undefined) {
            Toast.show({
              type: "error",
              text1: "This user exists!",
              text2: "Enter Another user!",
              position: "top",
              visibilityTime: 4000,
            });
            console.log(res);
          } else {
            Toast.show({
              type: "customToast",
              text1: "Welcome👋!",
              text2: "Account created!✅",
              position: "top",
              visibilityTime: 2000,
              props: {
                backgroundColor: "green",
              },
            });

            // Save user info to AsyncStorage
            AsyncStorage.setItem("userLoginInfo", JSON.stringify(res))
              .then(() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Dashboard", params: { data: res } }],
                  })
                );
              })
              .catch((error) =>
                console.error("Error saving login info:", error)
              );
          }
        })
        .catch((error) => console.error("Error registering user:", error));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text_bold}>Enter your display name!</Text>
      <Text style={styles.text_thin}>
        It can be your real name, nickname, surname, middlename, anything at all
        and you can change it at any time!
      </Text>
      <TextInput
        style={styles.input}
        value={inputText}
        placeholderTextColor={"white"}
        placeholder="enter your name"
        onChangeText={(text) => setInputText(text)}
      />
      <TouchableOpacity style={styles.continue_btn} onPress={showToast}>
        <Text style={styles.btn_text}>Sign Up</Text>
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

export default SignUp;

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
    borderColor: "#fff",
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
