import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Image, ScrollView} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import Entypo from 'react-native-vector-icons/Entypo';
import ProfileBtn from "../../../utilis/ProfileBtn";
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileView from "../../../utilis/ProfileView";
import {getPersonalDetail} from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../utilis/Loader";
const Profile = ({navigation}) => {
    const [isloading,setLoading]=useState(false);
    const [apiData,setApiData]=useState("");

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getPersonalDetail();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.data.user);
                setLoading(false);
            }else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
            <ProfileView source={{uri: apiData.picture}} screen_title={"Profile"} username={apiData.title+" "} firstname={apiData.first_name+" "} lastname={apiData.last_name} onPress={()=>navigation.goBack()}>
                <View style={{marginHorizontal:"5%"}}>
                    <ProfileBtn title={"Personal Detail"} onPress={()=>{navigation.navigate("Detail",{tittle:"Personal Detail",data:apiData})}}/>
                    <ProfileBtn title={"Personal Info"} onPress={()=>{navigation.navigate("Detail",{tittle:"Personal Info",data:apiData})}}/>
                    <ProfileBtn title={"Bank Detail"} onPress={()=>{navigation.navigate("BankDetail",{tittle:"Bank Detail",title:apiData.title,firstname:apiData.first_name,lastname:apiData.last_name})}}/>
                    <ProfileBtn title={"BTC"} onPress={()=>{navigation.navigate("BTCDetail",{tittle:"BTC Detail",title:apiData.title,firstname:apiData.first_name,lastname:apiData.last_name})}}/>
                    <ProfileBtn title={"USDT"} onPress={()=>{navigation.navigate("USDTDetail",{tittle:"USDT Detail",title:apiData.title,firstname:apiData.first_name,lastname:apiData.last_name})}}/>
                    <Text></Text>
                </View>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default Profile;
