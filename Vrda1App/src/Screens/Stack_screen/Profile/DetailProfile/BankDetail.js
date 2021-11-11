import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ImageBackground} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import ProfileView from "../../../../utilis/ProfileView";
import {getBankDetail} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";

const BankDetail = ({navigation,route}) => {
    var data=route.params.data;
    var name=route.params.tittle;
    var title=route.params.title;
    var firstname=route.params.firstname;
    var lastname =route.params.lastname;

    const [apiData,setApiData]=useState("");
    const [isloading,setLoading]=useState(false);
    const [city,setcity]=useState("Not Available");
    const [country,setCountry]=useState("Not Available");
    const [fullname,setFullname]=useState("Not Available");
    const [bank_name,setbank_name]=useState("Not Available");
    const [branch_name,setbranch_name]=useState("Not Available");
    const [billing_address,setbilling_address]=useState("Not Available");
    const [residential_address,setresidential_address]=useState("Not Available");

    useEffect(async ()=>{ await getData() },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await getBankDetail();
        if (response !== "Error") {
            if (response.data.status === true) {
                 setLoading(false);
                 setApiData(response.data.data.bank);
                 setcity(response.data.data.bank.city);
                 setFullname(response.data.data.bank.full_name);
                 setbank_name(response.data.data.bank.bank_name);
                 setbranch_name(response.data.data.bank.branch_name);
                 setbilling_address(response.data.data.bank.billing_address);
                 setCountry(response.data.data.getCountry.geoplugin_countryName);
                 setresidential_address(response.data.data.bank.residential_address);
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
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
                <ProfileView source={{uri: data.picture}} screen_title={name} username={title+" "} firstname={firstname+" "} lastname={lastname} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateBank",{title:title,firstname:firstname,lastname:lastname,data:data})}}>
                        <View>
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                            <DoubleText text1={"Full Name"} text2={fullname?fullname:""}/>
                            <DoubleText text1={"Complete Address"} text2={billing_address?billing_address:""}/>
                            <DoubleText text1={"Residential Address"} text2={residential_address?residential_address:""}/>
                            <DoubleText text1={"Bank Name"} text2={bank_name?bank_name:""}/>
                            <DoubleText text1={"Branch Name"} text2={branch_name?branch_name:""}/>
                            <DoubleText text1={"City"} text2={city ? city : ""}/>
                            <DoubleText text1={"Country"} text2={country ? country: ""}/>
                        </View>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default BankDetail;
