import React, {useEffect, useState} from "react";
import Colors from "../Style_Sheet/Colors";
import Shop from "../Screens/Stack_screen/Shop/Shop";
import Wallet from "../Screens/Stack_screen/Wallet/Wallet";
import Reports from "../Screens/Stack_screen/Reports/Reports";
import Dashboard from "../Screens/Stack_screen/Dashboard";
import Vreit_Points from "../Screens/Stack_screen/VreitPoints/Vreit_Points";
import Activity_Feeds from "../Screens/Stack_screen/ActivityFeed/Activity_Feeds";
import Commission_Logs from "../Screens/Stack_screen/CommissionLogs/Commission_Logs";
import Commission_Reports from "../Screens/Stack_screen/Commission_Report/Commission_Reports";
import {Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { createDrawerNavigator, DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {get_data} from "../utilis/AsyncStorage/Controller";
import TermsAndCondition from "../Screens/Stack_screen/About/TermsAndCondition";

const Drawer = createDrawerNavigator();

const Drawers = ({navigation}) => {
    const [userDetail,setUserDetail]=useState("")
    useEffect(async ()=>{
        let User_DATA = await get_data("User_DATA")
        setUserDetail(User_DATA)
    },[])
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
                        <ImageBackground source={require("../Assets/Vrda1img2.jpg")} style={{justifyContent:"space-between",alignItems:"center",padding:20,marginBottom:20,backgroundColor:"rgb(0,0,0)",borderBottomWidth:2,borderColor:Colors.secondary}} imageStyle=
                            {{opacity:0.4}}>
                            <Image source={require("../Assets/vector.png")} style={{width:70,height:70,borderRadius:35,borderWidth:2,borderColor:Colors.white}}/>
                            <Text style={{fontSize:20,fontWeight:"bold",color:Colors.white}}>{userDetail?userDetail.name:"Not Available"}</Text>
                            <Text style={{color:Colors.light}}>{userDetail?userDetail.email:"Not Available"}</Text>
                        </ImageBackground>
                        <DrawerItemList {...props}/>
                    </DrawerContentScrollView>
                    <TouchableOpacity onPress={()=>{logout()}} style={{position:"relative",right:0,left:0,bottom:5,backgroundColor:"rgb(231,230,230)"}}>
                        <Text style={{backgroundColor:"rgba(162,160,160,0.29)",width:"100%",height:40,textAlign:"center",paddingTop:8}}><SimpleLineIcons name={"logout"} size={15} color={Colors.primary}/> LogOut</Text>
                    </TouchableOpacity>
                </View>
            )
        } }>
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{drawerLabel:"Dashboard",drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/Dashboard.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Shop" component={Shop} options={{drawerLabel: "Shop", drawerActiveTintColor:Colors.primary,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/shop.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Activity_Feeds" component={Activity_Feeds} options={{drawerLabel: "Activity Feed", drawerActiveTintColor:Colors.primary,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/ActivityFeed.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Vreit_Points" component={Vreit_Points} options={{drawerLabel: "Vreit Points", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/vreitpoints.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Commission_Logs" component={Commission_Logs} options={{drawerLabel: "Commission Logs", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/commisionLogo.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Commission_Reports" component={Commission_Reports} options={{drawerLabel: "Commission Reports", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/commisionReport.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Wallet" component={Wallet} options={{drawerLabel: "Wallet", drawerActiveTintColor:Colors.primary, drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/wallet.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="Reports" component={Reports} options={{drawerLabel: "Reports", drawerActiveTintColor:Colors.primary ,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/report.png')} style={{height:20,width:20}}/>)}}/>
            <Drawer.Screen name="TermsAndCondition" component={TermsAndCondition} options={{drawerLabel: "Terms & Condition", drawerActiveTintColor:Colors.primary ,drawerType:"slide",drawerIcon: ({tintColor}) => (
                    <Image source={require('../Assets/termsandCondition.png')} style={{height:20,width:20}}/>)}}/>
        </Drawer.Navigator>
        </SafeAreaView>
    );
};
export default Drawers;
