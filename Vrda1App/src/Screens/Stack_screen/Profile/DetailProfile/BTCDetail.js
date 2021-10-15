import React from "react";
import {Text, View, SafeAreaView, Image, TouchableOpacity,ImageBackground} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Entypo from 'react-native-vector-icons/Entypo';
import Clipboard from "@react-native-community/clipboard";
import Toast from "react-native-simple-toast";
import Warning from "../../../../Zextra/Warning";

const BTCDetail = ({navigation,route}) => {
    var name=route.params.tittle;
    const copyToClipboard = () => {
        Clipboard.setString("tjgjgjgjgjgjg");
        Toast.show("Text Copied !", Toast.LONG);
    };
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
            <ProfileView screen_title={name} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateBTC")}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                <DoubleText text1={"BTC Address"} text2={"0xb18683212680168406864"}/>
                <DoubleText text1={"Qr Code"} sourceimg={require("../../../../Assets/Qr.png")}/>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:10 }} onPress={() => { copyToClipboard() }}>
                    <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                    <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                </TouchableOpacity>
                <Warning/>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default BTCDetail;
