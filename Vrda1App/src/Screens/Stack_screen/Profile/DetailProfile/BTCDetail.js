import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, Image, TouchableOpacity,ImageBackground} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Entypo from 'react-native-vector-icons/Entypo';
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import Warning from "../../../../Zextra/Warning";
import {getBTCDetail} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";

const BTCDetail = ({navigation,route}) => {
    var data=route.params.data;
    var name=route.params.tittle;
    var title=route.params.title;
    var lastname =route.params.lastname;
    var firstname=route.params.firstname;

    const [isloading,setLoading]=useState(false);
    const [apiData,setApiData]=useState("");

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getBTCDetail();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.data);
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
        Clipboard.setString(apiData.btc);
        Toast.show("Text Copied !", Toast.LONG);
    };
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
                <ProfileView source={{uri: data.picture}} screen_title={name} username={title+" "} firstname={firstname+" "} lastname={lastname} update={"BTC Detail"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateBTC",{title:title,firstname:firstname,lastname:lastname,data:data,apiData:apiData})}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                <DoubleText text1={"BTC Address"} text2={apiData?apiData.btc:"Not Available"}/>
                    {apiData ?
                        <DoubleText text1={"Qr Code"} sourceimg={{uri: "https://staging.vrda1.net/" + apiData.btc_img}}/>
                        :<DoubleText text1={"Qr Code"} text2={"Not Available"}/>
                    }
                    <TouchableOpacity disabled={apiData.btc !== "" ? false : true} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:10 }} onPress={() => { copyToClipboard() }}>
                    <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                    <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                </TouchableOpacity>
                <Warning name={"BTC Hash"}/>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default BTCDetail;
