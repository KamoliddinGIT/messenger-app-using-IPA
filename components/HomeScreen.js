import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { Component } from "react";

export const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.main}>Private Messenger!</Text>
      <View>
        <TouchableOpacity
          style={styles.creating_account}
          onPress={() => navigation.navigate("Creating Account")}
        >
          <Text style={styles.color}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signing_account}
          onPress={() => navigation.navigate("Signing Account")}
        >
          <Text style={styles.color}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="hidden" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#349",
    alignItems: "center",
    justifyContent: "space-around",
  },
  main: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  color: {
    color: "#349",
    fontWeight: "400",
    fontSize: 18,
  },
  creating_account: {
    width: 200,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  signing_account: {
    width: 200,
    borderWidth: 1,
    borderColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    marginTop: 10,
  },
});
