import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, Image, TouchableOpacity,ImageBackground} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Entypo from "react-native-vector-icons/Entypo";
import ProfileView from "../../../../utilis/ProfileView";
import Toast from "react-native-simple-toast";
import Warning from "../../../../Zextra/Warning";
import {getUSDTDetail} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";

const USDTDetail = ({route,navigation}) => {
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
        let response = await getUSDTDetail();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.usdt);
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
        Clipboard.setString("tjgjgjgjgjgjg");
        Toast.show("Text Copied !", Toast.LONG);
    };
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
            <ProfileView source={data.picture} screen_title={name} username={title+" "} firstname={firstname+" "} lastname={lastname} update={"USDT Detail"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateUSDT",{data:data,title:title,firstname:firstname,lastname:lastname,apiData:apiData})}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:15}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,bottom:15}}>{name}:</Text>
                <Text style={{width:58,padding:5,backgroundColor:"#2c754a",color:Colors.white,textAlign:"center",borderRadius:6,bottom:15}}>TRC20</Text>
                </View>
                <DoubleText text1={"USDT Address"} text2={apiData.usdt?apiData.usdt:"Not Available"}/>
                {apiData.usdt_img?
                    <DoubleText text1={"Qr Code"} sourceimg={{uri: "https://staging.vrda1.net/"+apiData.usdt_img}}/>
                    :<DoubleText text1={"Qr Code"} text2={"Not Available"}/>
                }
                <TouchableOpacity disabled={apiData.usdt !== "" ? false : true} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginBottom:10 }} onPress={() => { copyToClipboard() }}>
                    <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                    <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                </TouchableOpacity>
                <Warning name={"TRC20 USDT"}/>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default USDTDetail;
