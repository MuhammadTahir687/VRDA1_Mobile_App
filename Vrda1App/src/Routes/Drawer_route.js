import React from "react";
import Colors from "../Style_Sheet/Colors";
import Shop from "../Screens/Stack_screen/Shop/Shop";
import Wallet from "../Screens/Stack_screen/Wallet/Wallet";
import Reports from "../Screens/Stack_screen/Reports/Reports";
import Dashboard from "../Screens/Stack_screen/Dashboard";
import Vreit_Points from "../Screens/Stack_screen/VreitPoints/Vreit_Points";
import Activity_Feeds from "../Screens/Stack_screen/ActivityFeed/Activity_Feeds";
import Commission_Logs from "../Screens/Stack_screen/CommissionLogs/Commission_Logs";
import Commission_Reports from "../Screens/Stack_screen/Commission_Report/Commission_Reports";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const Drawer = createDrawerNavigator();

const Drawers = ({navigation}) => {
    const logout=()=>{
        console.log("logout");
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys)).then(() => navigation.reset({ index: 0, routes: [{ name: "Login" }], }));
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{headerStyle:{backgroundColor:"transparent"},headerRight: () => (
            <TouchableOpacity style={{marginRight:20}} onPress={()=>navigation.navigate("Profile")}>
            <Image source={require("../Assets/profile.png")} style={{height:20,width:20}}/>
            </TouchableOpacity>
            )}} drawerContent={(props)=> {
            return(
                <View style={{flex:1}}>
                    <DrawerContentScrollView {...props}>
                        <View style={{justifyContent:"space-between",alignItems:"center",padding:20,marginBottom:20,backgroundColor:"rgba(14,14,14,0.05)",borderBottomWidth:2,borderColor:Colors.secondary}}>
                            <Image source={require("../Assets/vector.png")} style={{width:60,height:60,borderRadius:30}}/>
                            <Text style={{fontSize:20,fontWeight:"bold",color:Colors.primary}}>Admin</Text>
                            <Text style={{color:Colors.secondary}}>Admin123@gmail.com</Text>
                        </View>
                        <DrawerItemList {...props}/>
                    </DrawerContentScrollView>
                    <TouchableOpacity onPress={()=>{logout()}} style={{position:"absolute",right:0,left:0,bottom:5,backgroundColor:"rgba(157,154,154,0.32)"}}>
                        <Text style={{backgroundColor:"rgba(162,160,160,0.29)",width:"100%",height:40,textAlign:"center",paddingTop:8}}><SimpleLineIcons name={"logout"} size={15} color={Colors.primary}/> LogOut</Text>
                    </TouchableOpacity>
                </View>
            )
        } }>
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{drawerLabel:"Dashboard",drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/Dashboard.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Shop" component={Shop} options={{drawerLabel: "Shop", drawerActiveTintColor:Colors.primary,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/Shop.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Activity_Feeds" component={Activity_Feeds} options={{drawerLabel: "Activity Feed", drawerActiveTintColor:Colors.primary,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/ActivityFeed.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Vreit_Points" component={Vreit_Points} options={{drawerLabel: "Vreit Points", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/VREIT.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Commission_Logs" component={Commission_Logs} options={{drawerLabel: "Commission Logs", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/Commisionlogs.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Commission_Reports" component={Commission_Reports} options={{drawerLabel: "Commission Reports", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/CommisionReport.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Wallet" component={Wallet} options={{drawerLabel: "Wallet", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/Wallet.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Reports" component={Reports} options={{drawerLabel: "Reports", drawerActiveTintColor:Colors.primary ,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/Report.png')} style={{height:20,width:20}}/>)}}/>
        </Drawer.Navigator>
        </SafeAreaView>
    );
};
export default Drawers;
