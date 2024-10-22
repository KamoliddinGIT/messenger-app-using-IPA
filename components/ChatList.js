import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import useHttp from "../hooks/useHttp";

const ChatList = ({ navigation, route }) => {
  const { other } = route.params;
  const { myUserId } = route.params;
  const { mySearchId } = route.params;
  const [chathistory, setChatHistory] = useState([]);
  const [typeMsg, setTypeMsg] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [refState, setRefState] = useState([]);
  const { request } = useHttp();

  const sendMessage = () => {
    const newMsg = {
      userId: myUserId,
      othersearchid: other.searchId,
      message: typeMsg,
    };
    request(
      "https://telegramclone.up.railway.app/send-message",
      "POST",
      JSON.stringify(newMsg)
    )
      .then((res) => {
        console.log("Response received:", res);
        if (res.error) {
          console.error("Error:", res.details);
        } else {
          console.log("Message sent successfully");
          setRefresh(!refresh);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });

    setTypeMsg("");
  };
  fetch(
    `https://telegramclone.up.railway.app/chat/${mySearchId}/${other.otherusername}`
  )
    .then((res) => res.json())
    .then((res) => setChatHistory(res.chatHistory));
  // useEffect(() => {
  //   console.log(chathistory);
  // }, [chathistory]);
  return (
    <View style={styles.container}>
      <Text style={styles.chat_text}>Chat History</Text>
      <Text style={styles.user_text}>user {other.otherusername}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="message to this user!"
          style={styles.input}
          placeholderTextColor="#349"
          value={typeMsg}
          onChangeText={setTypeMsg}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={sendMessage}>
          <Icon name="send" size={24} color="#349" />
        </TouchableOpacity>
      </View>
      <View>
        <View>
          {chathistory.map((item) => {
            return (
              <Text style={styles.chat_txt} key={item._id}>
                {item.from}: {item.message}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#349",
    gap: 20,
    padding: 20,
  },
  chat_text: {
    color: "white",
    fontSize: 30,
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
    margin: 10,
    color: "#349",
  },
  iconContainer: {
    position: "absolute",
    padding: 5,
    right: 15,
  },
  user_text: {
    color: "white",
    fontSize: 20,
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
  chat_txt: {
    color: "white",
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: 150,
    padding: 10,
    borderColor: "white",
    marginBottom: 10,
  },
});
