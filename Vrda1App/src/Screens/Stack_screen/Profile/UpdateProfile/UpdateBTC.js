import React, {useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView, Image} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";

const UpdateBTC = ({navigation}) => {
    const [btcAddress,setBtcaddress]=useState("");
    const [errors,setErrors]=useState("");
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <ProfileView screen_title={"Update BTC Detail"} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()} >
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>Update Bank Detail</Text>
                        <View style={{marginHorizontal:10}}>
                                <FormInput
                                    placeholder={"BTC Address"}
                                    placeholderTextColor={Colors.secondary}
                                    iconName_s="user"
                                    icon_color={Colors.secondary}
                                    value={btcAddress}
                                    color={Colors.primary}
                                    onChangeText={(text) => { setErrors(""), setBtcaddress(text) }}
                                    error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                                />
                            <Image source={require("../../../../Assets/upload_image.png")} style={{height:100,width:100,alignSelf:"center",borderWidth:2,borderColor:Colors.primary,marginTop:10,borderRadius:15}}/>
                            <Btn containerStyle={{flex:1,backgroundColor:Colors.primary,marginTop:10,padding:10,borderRadius:10}} text={"Upload QrCode Image"} text_style={{color:Colors.white}}/>
                        </View>
                        <Text></Text>
                    </ProfileView>
                    <Btn text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:40}}/>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateBTC;
