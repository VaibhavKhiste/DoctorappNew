import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../api/screens/DashboardScreen";
import ListScreen from "../api/screens/ListScreen";
import RegistrationScreen from "../api/screens/RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Registration">
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ title: "Register Doctor" }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{ title: "Doctor List" }}
      />
    </Stack.Navigator>
  );
}
