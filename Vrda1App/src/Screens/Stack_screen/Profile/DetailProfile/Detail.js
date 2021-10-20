import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import ProfileView from "../../../../utilis/ProfileView";
import {getPersonalDetail} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
const Detail = ({navigation,route}) => {
    var name=route.params.tittle;
    var data=route.params.data;
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <ProfileView source={{uri: data.picture}} screen_title={name} username={data.title+" "} firstname={data.first_name+" "} lastname={data.last_name} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateProfile",{data:data})}}>
            {name=="Personal Detail"?
                <View style={{marginBottom:15}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                        <DoubleText text1={"Username"} text2={data.name?data.name:"Not Available"}/>
                        <DoubleText text1={"Joined"} text2={data.email_verified_at?data.email_verified_at:"Not Available"}/>
                        <DoubleText text1={"Primary Email"} text2={data.email?data.email:"Not Available"}/>
                        <DoubleText text1={"Secondary Email"} text2={data.email_alter?data.email_alter:"Not Available"}/>
                        <DoubleText text1={"Phone #1"} text2={data.phone_no?data.phone_no:"Not Available"}/>
                        <DoubleText text1={"Phone #2"} text2={data.phone_no_alter?data.phone_no_alter:"Not Available"}/>
                        <DoubleText text1={"Address"} text2={data.address?data.address:"Not Available"}/>
                </View>
                :
                <View style={{height:320}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:10}}>{name}:</Text>
                    <ScrollView>
                    <DoubleText text1={"City"} text2={data.city?data.city:"Not Available"}/>
                    <DoubleText text1={"Country"} text2={data.country?data.country:"Not Available"}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Identity</Text>
                    <DoubleText text1={"Identity"} text2={data.identity?data.identity:"Not Available"}/>
                    <DoubleText text1={""} sourceimg={{uri:data.identity_pic}}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Passport</Text>
                    <DoubleText text1={"Passport"} text2={data.passport?data.passport:"Not Available"}/>
                    <DoubleText text1={""} sourceimg={{uri:data.identity_pic}}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Signature</Text>
                    <DoubleText text1={"Signature"} sourceimg={{uri:data.identity_pic}}/>
                    <Text style={{backgroundColor:Colors.secondary,margin:5,borderRadius:5,padding:7,color:Colors.white,textAlign:"center",fontWeight:"bold"}}>Next to Kin</Text>
                    <DoubleText text1={"Kin Name"} text2={data.phone_no?data.phone_no:"Not Available"}/>
                    <DoubleText text1={"Kin Relation"} text2={data.phone_no?data.phone_no:"Not Available"}/>
                    <DoubleText text1={""} sourceimg={{uri:data.identity_pic}}/>
                    </ScrollView>
                </View>
            }
            </ProfileView>
            </ImageBackground>
</SafeAreaView>
    )
}
export default Detail;
