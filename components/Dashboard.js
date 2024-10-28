import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Dashboard = ({ navigation, route }) => {
  const { data } = route.params;
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userLoginInfo");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Messenger" }],
        })
      );
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.user_info}>
        <Text style={styles.user_text}>user: {data.user.username}</Text>
        <Text style={styles.user_text}>id: {data.user.userId}</Text>
        <Text style={styles.user_text}>searchId: {data.user.searchId}</Text>
      </View>

      <Text style={styles.text}>Add Chat or User👇</Text>

      <TouchableOpacity
        style={styles.plus}
        onPress={() =>
          navigation.navigate("Sms", {
            myUserId: data.user.userId,
            mySearchId: data.user.searchId,
            info: data.user.chat,
          })
        }
      >
        <Text style={styles.plus_text}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  sticker: {
    fontSize: 80,
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#349",
  },
  plus: {
    display: "flex",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "white",
    marginTop: 20,
  },
  plus_text: {
    color: "#349",
    fontSize: 60,
  },
  user_info: {
    marginBottom: 100,
    borderWidth: 1,
    padding: 30,
    gap: 10,
    borderRadius: 10,
    borderColor: "white",
  },
  user_text: {
    color: "white",
    fontSize: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
