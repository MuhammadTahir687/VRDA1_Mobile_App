import React, {useState} from "react";
import {Text, View, SafeAreaView, ScrollView, ImageBackground, Image} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import ProfileView from "../../../../utilis/ProfileView";
import {Btn} from "../../../../utilis/Btn";

const UpdateBank = ({navigation}) => {
    const [iban,setIban]=useState("");
    const [bankname,setBankname]=useState("");
    const [branchname,setBranchname]=useState("");
    const [bankaddress,setBankaddress]=useState("");
    const [phonenumber,setPhonenumber]=useState("");
    const [city,setCity]=useState("");
    const [country,setCountry]=useState("");
    const [errors,setErrors]=useState("");

    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <ProfileView screen_title={"Update Bank Detail"} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()} >
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>Update Bank Detail</Text>
                <View style={{marginHorizontal:10}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"IBAN"}
                            placeholderTextColor={Colors.secondary}
                            iconName_s="user"
                            icon_color={Colors.secondary}
                            value={iban}
                            containerStyle={{ width:"45%", }}
                            color={Colors.primary}
                            onChangeText={(text) => { setErrors(""), setIban(text) }}
                            error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                        />
                        <FormInput
                            placeholder={"Bank Name"}
                            placeholderTextColor={Colors.secondary}
                            iconName_s="user"
                            color={Colors.primary}
                            icon_color={Colors.secondary}
                            value={bankname}
                            containerStyle={{ width:"45%" }}
                            onChangeText={(text) => { setErrors(""), setBankname(text) }}
                            error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                        />
                    </View>
                    <FormInput
                        placeholder={"Branch Name"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        color={Colors.primary}
                        icon_color={Colors.secondary}
                        value={branchname}
                        containerStyle={{ marginTop:5 }}
                        onChangeText={(text) => { setErrors(""), setBranchname(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <FormInput
                        placeholder={"Bank Address"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        color={Colors.primary}
                        icon_color={Colors.secondary}
                        value={bankaddress}
                        containerStyle={{ marginTop:5 }}
                        onChangeText={(text) => { setErrors(""), setBankaddress(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <FormInput
                        placeholder={"Phone Number"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        color={Colors.primary}
                        icon_color={Colors.secondary}
                        value={phonenumber}
                        containerStyle={{ marginTop:5 }}
                        onChangeText={(text) => { setErrors(""), setPhonenumber(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"City"}
                            placeholderTextColor={Colors.secondary}
                            iconName_s="user"
                            color={Colors.primary}
                            icon_color={Colors.secondary}
                            value={city}
                            containerStyle={{ marginTop:5,width:"45%" }}
                            onChangeText={(text) => { setErrors(""), setCity(text) }}
                            error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                        />
                        <FormInput
                            placeholder={"Country"}
                            placeholderTextColor={Colors.secondary}
                            iconName_s="user"
                            color={Colors.primary}
                            icon_color={Colors.secondary}
                            value={country}
                            containerStyle={{ marginTop:5,width:"45%" }}
                            onChangeText={(text) => { setErrors(""), setCountry(text) }}
                            error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                        />
                    </View>
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
export default UpdateBank;
