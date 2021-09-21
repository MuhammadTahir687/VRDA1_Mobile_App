import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "../Screens/Stack_screen/splash";
import Login from "../Screens/Stack_screen/Login";
import Drawers from "./Drawer_route";
import Dashboard from "../Screens/Stack_screen/Dashboard";
import Detail from "../Screens/Stack_screen/Profile/DetailProfile/Detail";
// import Tab from "../Screens/Stack_screen/Tab";
import Profile from "../Screens/Stack_screen/Profile/Profile";
import BankDetail from "../Screens/Stack_screen/Profile/DetailProfile/BankDetail";
import BTCDetail from "../Screens/Stack_screen/Profile/DetailProfile/BTCDetail";
import USDTDetail from "../Screens/Stack_screen/Profile/DetailProfile/USDTDetail";
import UpdateProfile from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateProfile";
import UpdateBank from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateBank";
import UpdateBTC from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateBTC";
import UpdateUSDT from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateUSDT";
const Stack = createStackNavigator();

const Stacks = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
        <Stack.Screen name="BankDetail" component={BankDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="BTCDetail" component={BTCDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="USDTDetail" component={USDTDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateBank" component={UpdateBank} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateBTC" component={UpdateBTC} options={{ headerShown: false }}/>
        <Stack.Screen name="UpdateUSDT" component={UpdateUSDT} options={{ headerShown: false }}/>
        {/* <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Drawers" component={Drawers} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Stacks;
