import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../Screens/Stack_screen/splash";
import Login from "../Screens/Stack_screen/Login";
import Drawers from "./Drawer_route";
import Dashboard from "../Screens/Stack_screen/Dashboard";
// import Tab from "../Screens/Stack_screen/Tab";

const Stack = createStackNavigator();

const Stacks = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Drawers" component={Drawers} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Stacks;
