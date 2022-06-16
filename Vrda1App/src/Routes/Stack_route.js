import React from "react";
import Drawers from "./Drawer_route";
import Login from "../Screens/Stack_screen/Login";
import Splash from "../Screens/Stack_screen/splash";
import Dashboard from "../Screens/Stack_screen/Dashboard";
import Profile from "../Screens/Stack_screen/Profile/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../Screens/Stack_screen/Profile/DetailProfile/Detail";
import BTCDetail from "../Screens/Stack_screen/Profile/DetailProfile/BTCDetail";
import UpdateBTC from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateBTC";
import UpdateUSDT from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateUSDT";
import BankDetail from "../Screens/Stack_screen/Profile/DetailProfile/BankDetail";
import USDTDetail from "../Screens/Stack_screen/Profile/DetailProfile/USDTDetail";
import UpdateBank from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateBank";
import VreitUpdate from "../Screens/Stack_screen/Profile/UpdateProfile/VreitUpdate";
import VreitDetail from "../Screens/Stack_screen/Profile/DetailProfile/VreitDetails";
import UpdateProfile from "../Screens/Stack_screen/Profile/UpdateProfile/UpdateProfile";
import ChangePassword from "../Screens/Stack_screen/Profile/ChangePassword";


const config=()=>{
  screens:{
       UpdateProfile:"profile"
  }
}
const linking=()=>{
  prefixes:['www.staging.vrda1.net']
  config
}

const Stack = createStackNavigator();

const Stacks = ({navigation }) => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="Drawers" component={Drawers} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: true }} />
        <Stack.Screen name="BTCDetail" component={BTCDetail} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateBTC" component={UpdateBTC} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateUSDT" component={UpdateUSDT} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateBank" component={UpdateBank} options={{ headerShown: false }} />
        <Stack.Screen name="BankDetail" component={BankDetail} options={{ headerShown: false }} />
        <Stack.Screen name="USDTDetail" component={USDTDetail} options={{ headerShown: false }} />
        <Stack.Screen name="VreitDetail" component={VreitDetail} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateVreit" component={VreitUpdate} options={{ headerShown: false }} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Stacks;
