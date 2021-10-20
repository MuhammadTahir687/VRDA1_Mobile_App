import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import ProfileView from "../../../../utilis/ProfileView";
import {getBankDetail} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";

const BankDetail = ({navigation,route}) => {
    var name=route.params.tittle;
    var title=route.params.title;
    var firstname=route.params.firstname;
    var lastname =route.params.lastname;
    const [isloading,setLoading]=useState(false);
    const [apiData,setApiData]=useState("");
    const [country,setCountry]=useState("");

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getBankDetail();
        if (response !== "Error") {
            if (response.data.status === true) {
                await setApiData(response.data.data.bank);
                await setCountry(response.data.data.getCountry.geoplugin_countryName)
                await setLoading(false);
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
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
                <ProfileView source={{uri: apiData.picture}} screen_title={name} username={title+" "} firstname={firstname+" "} lastname={lastname} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateBank",{title:title,firstname:firstname,lastname:lastname})}}>
                        <View>
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                            <DoubleText text1={"Full Name"} text2={apiData.full_name?apiData.full_name:"Not Available"}/>
                            <DoubleText text1={"Complete Address"} text2={apiData.billing_address?apiData.billing_address:"Not Available"}/>
                            <DoubleText text1={"Residential Address"} text2={apiData.residential_address?apiData.residential_address:"Not Available"}/>
                            <DoubleText text1={"Bank Name"} text2={apiData.bank_name?apiData.bank_name:"Not Available"}/>
                            <DoubleText text1={"Branch Name"} text2={apiData.branch_name?apiData.branch_name:"Not Available"}/>
                            <DoubleText text1={"City"} text2={apiData.city?apiData.city:"Not Available"}/>
                            <DoubleText text1={"Country"} text2={country.country_name?country.country_name:"Not Available"}/>
                            <Text></Text>
                        </View>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default BankDetail;
