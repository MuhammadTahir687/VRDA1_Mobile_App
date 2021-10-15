import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import ProfileView from "../../../../utilis/ProfileView";
import {getPersonalDetail} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
const Detail = ({navigation,route}) => {
    var name=route.params.tittle
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
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
                <ProfileView screen_title={name} username={apiData.title+" "} firstname={apiData.first_name+" "} lastname={apiData.last_name} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateProfile")}}>
            {name=="Personal Detail"?
                <View style={{marginBottom:15}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                        <DoubleText text1={"Username"} text2={apiData.name?apiData.name:"Not Available"}/>
                        <DoubleText text1={"Joined"} text2={apiData.email_verified_at?apiData.email_verified_at:"Not Available"}/>
                        <DoubleText text1={"Primary Email"} text2={apiData.email?apiData.email:"Not Available"}/>
                        <DoubleText text1={"Secondary Email"} text2={apiData.email_alter?apiData.email_alter:"Not Available"}/>
                        <DoubleText text1={"Phone #1"} text2={apiData.phone_no?apiData.phone_no:"Not Available"}/>
                        <DoubleText text1={"Phone #2"} text2={apiData.phone_no_alter?apiData.phone_no_alter:"Not Available"}/>
                        <DoubleText text1={"Address"} text2={apiData.address?apiData.address:"Not Available"}/>
                </View>
                :
                <View style={{height:320}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                    <ScrollView>
                    <DoubleText text1={"City"} text2={apiData.city?apiData.city:"Not Available"}/>
                    <DoubleText text1={"Country"} text2={apiData.country?apiData.country:"Not Available"}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Identity</Text>
                    <DoubleText text1={"Identity"} text2={apiData.identity?apiData.identity:"Not Available"}/>
                    <DoubleText text1={""} sourceimg={{uri:apiData.identity_pic}}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Passport</Text>
                    <DoubleText text1={"Passport"} text2={apiData.passport?apiData.passport:"Not Available"}/>
                    <DoubleText text1={""} sourceimg={{uri:apiData.identity_pic}}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Signature</Text>
                    <DoubleText text1={"Signature"} sourceimg={{uri:apiData.identity_pic}}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Next to Kin</Text>
                    <DoubleText text1={"Kin Name"} text2={apiData.phone_no?apiData.phone_no:"Not Available"}/>
                    <DoubleText text1={"Kin Relation"} text2={apiData.phone_no?apiData.phone_no:"Not Available"}/>
                    <DoubleText text1={""} sourceimg={{uri:apiData.identity_pic}}/>
                    </ScrollView>
                </View>
            }
            </ProfileView>
            </ImageBackground>
</SafeAreaView>
    )
}
export default Detail;
