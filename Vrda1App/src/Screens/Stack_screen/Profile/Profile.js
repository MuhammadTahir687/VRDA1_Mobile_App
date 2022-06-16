import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ImageBackground} from "react-native";
import ProfileBtn from "../../../utilis/ProfileBtn";
import ProfileView from "../../../utilis/ProfileView";
import {getPersonalDetail} from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../utilis/Loader";

const Profile = ({navigation}) => {
    const [isloading,setLoading]=useState(false);
    const [apiprofile,setApiprofile]=useState("");
    const [apiuser,setApiUser]=useState("")

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getPersonalDetail();
        console.log("Response-------",response.data)
        if (response !== "Error") {
            if (response.data.status === true && response.data.email_status === true) {
                setApiprofile(response.data.profile);
                setApiUser(response.data.user)
                setLoading(false);
               
            }
            else if(response.data.status == true && response.data.email_status==false){
                const data=response.data.user;
            //  await  navigation.reset({index: 0,routes: [{ name: "Bad Email",params:{data} }]});
                navigation.navigate("Bad Email",{params:{data}})
                setLoading(false)
                console.log("hello")
            }
            else {
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
            <ProfileView source={{uri: apiprofile.picture?apiprofile.picture:null}} screen_title={"Profile"} username={apiprofile.title+". "} firstname={apiprofile.first_name+" "} lastname={apiprofile.last_name} onPress={()=>navigation.goBack()}>
                <View style={{marginHorizontal:"5%",marginTop:20}}>
                    <ProfileBtn title={"Personal Detail"} onPress={()=>{navigation.navigate("Detail",{tittle:"Personal Detail",data:apiprofile,user:apiuser})}}/>
                    <ProfileBtn title={"Personal Info"} onPress={()=>{navigation.navigate("Detail",{tittle:"Personal Info",data:apiprofile,user:apiuser})}}/>
                    <ProfileBtn title={"Bank Detail"} onPress={()=>{navigation.navigate("BankDetail",{tittle:"Bank Detail",title:apiprofile.title,firstname:apiprofile.first_name,lastname:apiprofile.last_name,data:apiprofile})}}/>
                    <ProfileBtn title={"BTC"} onPress={()=>{navigation.navigate("BTCDetail",{tittle:"BTC Detail",title:apiprofile.title,firstname:apiprofile.first_name,lastname:apiprofile.last_name,data:apiprofile})}}/>
                    <ProfileBtn title={"USDT"} onPress={()=>{navigation.navigate("USDTDetail",{tittle:"USDT Detail",title:apiprofile.title,firstname:apiprofile.first_name,lastname:apiprofile.last_name,data:apiprofile})}}/>
                    <ProfileBtn title={"Vreit"} onPress={()=>{navigation.navigate("VreitDetail",{tittle:"Vreit Detail",title:apiprofile.title,firstname:apiprofile.first_name,lastname:apiprofile.last_name,data:apiprofile})}}/>
                    <ProfileBtn title={"Change Password"} onPress={()=>{navigation.navigate("ChangePassword",{tittle:"Change Password",title:apiprofile.title,firstname:apiprofile.first_name,lastname:apiprofile.last_name,data:apiprofile,user:apiuser})}}/>
                    <Text></Text>
                </View>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default Profile;
