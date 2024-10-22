import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./components/SignUp";
import { HomeScreen } from "./components/HomeScreen";
import SignIn from "./components/SignIn";
import Toast from "react-native-toast-message";
import Dashboard from "./components/Dashboard";
import SmsChat from "./components/SmsChat";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="Messenger" component={HomeScreen} />
          <Stack.Screen name="Creating Account" component={SignUp} />
          <Stack.Screen name="Signing Account" component={SignIn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Sms" component={SmsChat} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ChatList" component={ChatList} />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
}
