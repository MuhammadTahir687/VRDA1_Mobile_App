import React from "react";
import {Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Image, ScrollView} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileBtn from "../../../utilis/ProfileBtn";
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileView from "../../../utilis/ProfileView";
const Profile = ({navigation}) => {
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../Assets/splash.png")} style={{flex:1}}>
            <ProfileView screen_title={"Profile"} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()}>
                <View style={{marginHorizontal:"5%"}}>
                    <ProfileBtn title={"Personal Detail"} onPress={()=>{navigation.navigate("Detail",{tittle:"Personal Detail"})}}/>
                    <ProfileBtn title={"Personal Info"} onPress={()=>{navigation.navigate("Detail",{tittle:"Personal Info"})}}/>
                    <ProfileBtn title={"Bank Detail"} onPress={()=>{navigation.navigate("BankDetail",{tittle:"Bank Detail"})}}/>
                    <ProfileBtn title={"BTC"} onPress={()=>{navigation.navigate("BTCDetail",{tittle:"BTC Detail"})}}/>
                    <ProfileBtn title={"USDT"} onPress={()=>{navigation.navigate("USDTDetail",{tittle:"USDT Detail"})}}/>
                    <Text></Text>
                </View>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default Profile;
