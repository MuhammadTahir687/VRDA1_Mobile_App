import React from "react";
import {Text, View, SafeAreaView, ToastAndroid, Image, TouchableOpacity,ImageBackground} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileView from "../../../../utilis/ProfileView";

const USDTDetail = ({route,navigation}) => {
    var name=route.params.tittle;
    const copyToClipboard = () => {
        Clipboard.setString("tjgjgjgjgjgjg");
        ToastAndroid.showWithGravityAndOffset("Text Copied", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    };
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
            <ProfileView screen_title={name} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateUSDT")}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>{name}</Text>
                <DoubleText text1={"BTC Address"} text2={"0xb18683212680168406864"}/>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',margin:3,paddingHorizontal:17.5}}>
                    <Text style={{ width: '50%',fontWeight:"bold"}}>Qr Code</Text>
                    <Image source={require("../../../../Assets/Qr.png")} style={{width: '50%',height:150}}/>
                </View>
                <TouchableOpacity style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }} onPress={() => { copyToClipboard() }}>
                    <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                    <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                </TouchableOpacity>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default USDTDetail;