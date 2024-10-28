import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useState } from "react";
import useHttp from "../hooks/useHttp";

const SmsChat = ({ navigation, route }) => {
  // const { data } = route.params;
  const { myUserId } = route.params;
  const { mySearchId } = route.params;
  const { info } = route.params;
  const [searchId, setSearchId] = useState();
  const [searchedUser, setSearchedUser] = useState(null);
  const { request } = useHttp();
  const searchUser = () => {
    request(
      `https://telegramclone.up.railway.app/user/${searchId}`,
      "POST"
    ).then((res) => setSearchedUser(res.user));
    setSearchId("");
    console.log(info);
  };
  const typePress = () => {
    navigation.navigate("Chat", {
      data: searchedUser,
      myUserId,
      mySearchId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sms}>Searching a user below👇</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="search user...!"
          style={styles.input}
          placeholderTextColor="#349"
          value={searchId}
          onChangeText={setSearchId}
          keyboardType="numbers-and-punctuation"
        />
        <TouchableOpacity style={styles.iconContainer} onPress={searchUser}>
          <Icon name="search" size={24} color="#349" />
        </TouchableOpacity>
      </View>
      {searchedUser && (
        <View style={styles.card_user}>
          <Text style={styles.user_text}>user: {searchedUser.username}</Text>
          <Text style={styles.user_text}>
            searchId: {searchedUser.searchId}
          </Text>
          <TouchableOpacity style={styles.iconContainer} onPress={typePress}>
            <Icon name="message" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.chatHistory}>
        <Text style={styles.sms}>Chat History!👇</Text>
        {info.map((item) => {
          return (
            <View style={styles.card_user_chat} key={item._id}>
              <Text style={styles.user_text_chat}>
                user: {item.otherusername}
              </Text>
              <TouchableOpacity
                style={styles.iconContainer_chat}
                onPress={() => {
                  navigation.navigate("ChatList", {
                    myUserId,
                    mySearchId,
                    other: item,
                  });
                }}
              >
                <Icon name="message" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SmsChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#349",
    padding: 20,
    paddingBottom: 50,
    gap: 20,
    justifyContent: "flex-start",
  },
  cards_sms: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  card_sms: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    paddingLeft: 5,
  },
  sms: {
    color: "white",
    fontSize: 25,
    fontWeight: "normal",
  },
  chat_sms: {
    color: "white",
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    color: "#349",
  },
  iconContainer_chat: {
    position: "absolute",
    padding: 5,
    right: 15,
    backgroundColor: "#349",
    borderRadius: 10,
  },
  iconContainer: {
    position: "absolute",
    padding: 5,
    right: 15,
  },
  user_text: {
    color: "white",
  },
  card_user: {
    width: 200,
    height: 100,
    borderWidth: 1,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    marginLeft: "20%",
    borderRadius: 10,
  },
  type_input: {
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    color: "white",
    borderRadius: 10,
  },
  user_text_chat: {
    color: "#349",
  },
  card_user_chat: {
    width: 200,
    height: 50,
    borderWidth: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  chatHistory: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 350,
  },
});
