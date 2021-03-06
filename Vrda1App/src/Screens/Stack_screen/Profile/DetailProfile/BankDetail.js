import React, {useEffect, useState} from "react";
import {Text, RefreshControl, View, SafeAreaView, ImageBackground, ScrollView} from "react-native";
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
    const [country,setCountry]=useState("Not Available");
    const [refreshing,setRefreshing]=useState(false);

    useEffect(async ()=>{ await getData()},[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await getBankDetail();
        if (response !== "Error") {
            if (response.data.status === true) {
                 setLoading(false);
                 setApiData(response.data.bank);
                 setCountry(response.data.bank.country);
                setRefreshing(!refreshing)
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
    const onRefresh = async () => {
        await getData();
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
                <ScrollView
                    refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh} />
                }>
                <ProfileView source={data.picture} screen_title={name} username={title+" "} firstname={firstname+" "} lastname={lastname} update={"Bank Detail"} onPress={()=>navigation.goBack()}
                             onPressForUpdate={() => {
                        navigation.navigate("UpdateBank", {
                            title: title,
                            firstname: firstname,
                            lastname: lastname,
                            data: data,
                            apiData: apiData
                        })
                }}>
                        <View>
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                            <DoubleText text1={"Full Name"} text2={apiData.full_name !=null ?apiData.full_name:"Not Available"}/>
                            <DoubleText text1={"Billing Address"} text2={apiData.billing_address !=null?apiData.billing_address:"Not Available"}/>
                            <DoubleText text1={"Residential Address "} text2={apiData.residential_address !=null?apiData.residential_address:"Not Available"}/>
                            <DoubleText text1={"Bank Name"} text2={apiData.bank_name !=null?apiData.bank_name:"Not Available"}/>
                            <DoubleText text1={"Branch Name"} text2={apiData.branch_name!=null?apiData.branch_name:"Not Available"}/>
                            <DoubleText text1={"City"} text2={apiData.city!=null ? apiData.city :"Not Available"}/>
                            <DoubleText text1={"Country"} text2={apiData.country!=null?apiData.country:"Not Available"}/>
                        </View>
            </ProfileView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default BankDetail;
