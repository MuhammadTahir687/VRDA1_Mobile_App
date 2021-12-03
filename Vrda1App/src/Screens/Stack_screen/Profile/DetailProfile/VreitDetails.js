import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, TouchableOpacity,ImageBackground} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileView from "../../../../utilis/ProfileView";
import Toast from "react-native-simple-toast";
import {getVREITDetail} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";

const VreitDetail = ({route,navigation}) => {
    var data=route.params.data;
    var name=route.params.tittle;
    var title=route.params.title;
    var firstname=route.params.firstname;
    var lastname =route.params.lastname;
    const [isloading,setLoading]=useState(false);
    const [apiData,setApiData]=useState("");

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getVREITDetail();
        if (response !== "Error") {
            if (response.data.status == true) {
                setApiData(response.data.data.vreit);
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
    const copyToClipboard = () => {
        Clipboard.setString(apiData.vreit);
        if (apiData.vreit){
            Toast.show("Text Copied !", Toast.LONG);
        }
        else { return null }
    };
    return (
        <SafeAreaView style={{flex:1}}>
            <Loader animating={isloading}/>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <ProfileView source={{uri: data.picture}} screen_title={name} username={title+" "} firstname={firstname+" "} lastname={lastname} update={"Vreit Detail"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateVreit",{data:data,title:title,firstname:firstname,lastname:lastname,apiData:apiData})}}>
                    <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,bottom:15,paddingHorizontal:15}}>{name}:</Text>
                    <DoubleText text1={"Vreit Address"} text2={apiData.vreit?apiData.vreit:"Not Available"}/>
                    {apiData.vreit_img ?
                        <DoubleText text1={"Qr Code"} sourceimg={{uri: "https://staging.vrda1.net/" + apiData.vreit_img}}/>
                        :<DoubleText text1={"Qr Code"} text2={"Not Available"}/>
                    }
                    <TouchableOpacity disabled={apiData.vreit !== "" ? false : true} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:10 }} onPress={() => { copyToClipboard() }}>
                        <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                        <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                    </TouchableOpacity>
                </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default VreitDetail;
