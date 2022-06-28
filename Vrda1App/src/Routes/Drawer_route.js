import React, { useEffect, useState } from "react";
import Colors from "../Style_Sheet/Colors";
import Shop from "../Screens/Stack_screen/Shop/Shop";
import Wallet from "../Screens/Stack_screen/Wallet/Wallet";
import Reports from "../Screens/Stack_screen/Reports/Reports";
import Dashboard from "../Screens/Stack_screen/Dashboard";
import Vreit_Points from "../Screens/Stack_screen/VreitPoints/Vreit_Points";
import Activity_Feeds from "../Screens/Stack_screen/ActivityFeed/Activity_Feeds";
import Commission_Logs from "../Screens/Stack_screen/CommissionLogs/Commission_Logs";
import Commission_Reports from "../Screens/Stack_screen/Commission_Report/Commission_Reports";
import { Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View, Linking } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { get_data } from "../utilis/AsyncStorage/Controller";
import TermsAndCondition from "../Screens/Stack_screen/About/TermsAndCondition";
import Bad_Email from "../Screens/Stack_screen/BadEmail/BadEmail";
import { useNavigation } from "@react-navigation/native";
import BuyDaMeta1 from "../Screens/Stack_screen/BuyDaMeta1/BuyDaMeta1";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import Profile from "../Screens/Stack_screen/Profile/Profile";
import TransactionPassword from "../Screens/Stack_screen/TransactionPassword/TransactionPassword";
import UpdateTransactionPassword from "../Screens/Stack_screen/TransactionPassword/UpdateTransactionPassword";
import SetTransactionPassword from "../Screens/Stack_screen/TransactionPassword/SetTransactionPassword";
import ShopDetail from "../Screens/Stack_screen/Shop/ShopDetail";
import ContinueShopDetail from "../Screens/Stack_screen/Shop/ContinueShopDetail";
import ContinueShop from "../Screens/Stack_screen/Shop/ContinueShop";

const Drawer = createDrawerNavigator();

const config = () => {
    screens: {
        UpdateProfile: "profile"
    }
}
const linking = () => {
    prefixes: ['staging.vrda1.net']
    config
}

const Drawers = () => {
    const navigation = useNavigation();
    const [userDetail, setUserDetail] = useState("")
    const [picture,setPicture]=useState(null)
    const [linkedURL, setLinkedURL] = useState(null);

  
      useEffect(() => {
          const getUrlAsync = async () => {
              const initialUrl = await Linking.getInitialURL();
              if(initialUrl !=null){
                const routeName = initialUrl.split('?');
                const token=initialUrl.split('/');
                console.log("Token",token[4])
                if(routeName[1] == "transaction")
                {
                    navigation.navigate('UpdateTransactionPassword',{data:token[4]})
                }
              }
              else{
              }
              setLinkedURL(decodeURI(initialUrl));
          };
          getUrlAsync();
      }, []);
  
      useEffect(() => {
          const callback = ({ url }) => { const routeName = url.split('?');const token=initialUrl.split('/');;setLinkedURL(decodeURI(url)), navigation.navigate('UpdateTransactionPassword',{data:token[4]}),console.log("url",url)};
          Linking.addEventListener('url', callback);
          return () => {

              Linking.removeAllListeners('url', callback);
          };
      }, []);
      const resetURL = () => initialUrl=null;
      console.log(resetURL)




    useEffect(async () => {
        let User_DATA = await get_data("User_DATA")
        let Profile = await get_data("Profile");
        setPicture(Profile.picture);
        setUserDetail(User_DATA)
        console.log("Profile========", Profile)
    }, [])
    const logout = () => {
        console.log("logout");
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys)).then(() => navigation.reset({ index: 0, routes: [{ name: "Login" }], }));
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Drawer.Navigator
            linking={linking} initialRouteName="Dashboard" screenOptions={{
                headerStyle: { backgroundColor: "transparent" }, headerRight: () => (
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("Profile")}>
                        <Image source={require("../Assets/profile.png")} style={{ height: 20, width: 20 }} />
                    </TouchableOpacity>
                )
            }} drawerContent={(props) => {
                return (
                    <View style={{ flex: 1 }}>
                        <DrawerContentScrollView {...props}>
                            <ImageBackground source={require("../Assets/Vrda1img2.jpg")} style={{ justifyContent: "space-between", alignItems: "center", padding: 20, marginBottom: 20, backgroundColor: "rgb(0,0,0)", borderBottomWidth: 2, borderColor: Colors.secondary }} imageStyle=
                                {{ opacity: 0.4 }}>
                                {picture == null ?
                                    <Avatar
                                        size="large"
                                        rounded
                                        icon={{ name: 'user', type: 'font-awesome' }}
                                        onPress={() => console.log("Works!")}
                                        containerStyle={{ backgroundColor: "gray" }}

                                    /> :
                                    <Avatar
                                        size="large"
                                        rounded
                                        source={{
                                            uri:
                                              'https://staging.vrda1.net/'+picture,
                                          }}
                                        containerStyle={{ backgroundColor: "gray", borderWidth: 5,borderColor:"white" }}

                                    />

                                        }
                                {/* <Image source={require("../Assets/vector.png")} style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: Colors.white }} /> */}
                                <Text style={{ fontSize: 20, fontWeight: "bold", color: Colors.white }}>{userDetail ? userDetail.name : "Not Available"}</Text>
                                <Text style={{ color: Colors.light }}>{userDetail ? userDetail.email : "Not Available"}</Text>
                            </ImageBackground>
                            <DrawerItemList {...props} />
                        </DrawerContentScrollView>
                        <TouchableOpacity onPress={() => { logout() }} style={{ position: "relative", right: 0, left: 0, bottom: 5, backgroundColor: "rgb(231,230,230)" }}>
                            <Text style={{ backgroundColor: "rgba(162,160,160,0.29)", width: "100%", height: 40, textAlign: "center", paddingTop: 8 }}><SimpleLineIcons name={"logout"} size={15} color={Colors.primary} /> LogOut</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}>
                <Drawer.Screen name="Dashboard" component={Dashboard}  options={{ 
                    drawerLabel: "Dashboard", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/Dashboard.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Shop" component={Shop} initialParams={{data:null}} options={{unmountOnBlur:{setParam:"null"},
                    drawerLabel: "Shop", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/shop.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Buy DaMeta1" component={BuyDaMeta1} options={{drawerLabel: "Buy DaMeta1", drawerActiveTintColor:Colors.primary,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/dameta1.png')} style={{height:20,width:20}}/>)}}/>
                <Drawer.Screen name="Activity_Feeds" component={Activity_Feeds} options={{
                    drawerLabel: "Activity Feed", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/ActivityFeed.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Vreit_Points" component={Vreit_Points} options={{
                    drawerLabel: "Vreit Points", title:"Vreit Points",drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/vreitpoints.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Commission_Logs" component={Commission_Logs} options={{
                    drawerLabel: "Commission Logs", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/commisionLogo.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Commission_Reports" component={Commission_Reports} options={{
                    drawerLabel: "Commission Reports", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/commisionReport.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Wallet" component={Wallet} options={{
                    drawerLabel: "Wallet", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/wallet.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="Reports" component={Reports} options={{
                    drawerLabel: "Reports", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/report.png')} style={{ height: 20, width: 20 }} />)
                }} />
                <Drawer.Screen name="TermsAndCondition" component={TermsAndCondition} options={{
                    drawerLabel: "Terms & Condition", drawerActiveTintColor: Colors.primary, drawerType: "slide", drawerIcon: ({ tintColor }) => (
                        <Image source={require('../Assets/termsandCondition.png')} style={{ height: 20, width: 20 }} />)
                }} />

                <Drawer.Screen name="Bad Email" component={Bad_Email} options={{ title: "Dashboard", drawerItemStyle: { height: 0 } }} />
                <Drawer.Screen name="TransactionPassword" component={TransactionPassword} options={{ title: "Transaction Password", drawerItemStyle: { height: 0 }}} />
                <Drawer.Screen name="UpdateTransactionPassword" component={UpdateTransactionPassword} options={{ title: "Update Transaction Password", drawerItemStyle: { height: 0 }}} />
                <Drawer.Screen name="SetTransactionPassword" component={SetTransactionPassword} options={{ title: "Set Transaction Password", drawerItemStyle: { height: 0 }}} />
                <Drawer.Screen name="ShopDetail" component={ShopDetail} options={{ title: "Shop", drawerItemStyle: { height: 0 }}} />
                <Drawer.Screen name="ContinueShop" component={ContinueShop} options={{ title: "Shop", drawerItemStyle: { height: 0 }}} />
                <Drawer.Screen name="ContinueShopDetail" component={ContinueShopDetail} options={{ title: "Shop", drawerItemStyle: { height: 0 }}} />

            </Drawer.Navigator>
        </SafeAreaView>
    );
};
export default Drawers;
