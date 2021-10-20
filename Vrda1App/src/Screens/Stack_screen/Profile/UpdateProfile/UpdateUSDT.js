import React, {useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView, Image} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";

const UpdateUSDT = ({navigation,route}) => {
    var title=route.params.title;
    var firstname=route.params.firstname;
    var lastname =route.params.lastname;
    const [usdtaddress,setUsdtaddress]=useState("");
    const [errors,setErrors]=useState("");
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <ProfileView source={{uri: data.picture}} screen_title={"Update USDT Detail"} username={title+" "} firstname={firstname+" "} lastname={lastname} onPress={()=>navigation.goBack()}>
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:20}}>Update USDT Detail:</Text>
                        <View style={{marginHorizontal:10}}>
                            <FormInput
                                placeholder={"USDT Address"}
                                placeholderTextColor={Colors.secondary}
                                value={usdtaddress}
                                color={Colors.primary}
                                onChangeText={(text) => { setErrors(""), setUsdtaddress(text) }}
                                error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                            />
                            <Image source={require("../../../../Assets/upload_image.png")} style={{height:100,width:100,alignSelf:"center",borderWidth:2,borderColor:Colors.primary,marginTop:10,borderRadius:15}}/>
                            <Btn containerStyle={{flex:1,backgroundColor:Colors.primary,marginTop:10,padding:10,borderRadius:10}} text={"Upload QrCode Image"} text_style={{color:Colors.white}}/>
                        </View>
                        <Text></Text>
                    </ProfileView>
                    <Btn text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:100,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateUSDT;
