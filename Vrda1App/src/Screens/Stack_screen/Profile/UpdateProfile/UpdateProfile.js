import React, {useState} from "react";
import {Text, View, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";
import SwitchButton from "@freakycoder/react-native-switch-button";
import Feather from "react-native-vector-icons/Feather"
import UploadPic from "../../../../utilis/Upload_Pic";

const UpdateProfile = ({navigation}) => {

    const [title,setTitle]=useState("");
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [city,setCity]=useState("");
    const [country,setCountry]=useState("");
    const [passport,setPassport]=useState("");
    const [kinname,setKinname]=useState("");
    const [kinrelation,setKinrelation]=useState("");
    const [errors,setErrors]=useState(null);
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
            <ScrollView style={{flex:1}}>
            <ProfileView screen_title={"Profile"} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>Update Profile</Text>
                <View style={{marginHorizontal:10}}>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <FormInput
                        placeholder={"Title"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        icon_color={Colors.secondary}
                        value={title}
                        containerStyle={{ width:"45%", }}
                        color={Colors.primary}
                        onChangeText={(text) => { setErrors(""), setTitle(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <FormInput
                        placeholder={"Name"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        color={Colors.primary}
                        icon_color={Colors.secondary}
                        value={name}
                        containerStyle={{ width:"45%" }}
                        onChangeText={(text) => { setErrors(""), setName(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                </View>
                <FormInput
                    placeholder={"Username"}
                    placeholderTextColor={Colors.secondary}
                    iconName_s="user"
                    color={Colors.primary}
                    icon_color={Colors.secondary}
                    value={username}
                    containerStyle={{ marginTop:5 }}
                    onChangeText={(text) => { setErrors(""), setUsername(text) }}
                    error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                />
                <FormInput
                    placeholder={"Email"}
                    placeholderTextColor={Colors.secondary}
                    iconName_s="user"
                    color={Colors.primary}
                    icon_color={Colors.secondary}
                    value={email}
                    containerStyle={{ marginTop:5 }}
                    onChangeText={(text) => { setErrors(""), setEmail(text) }}
                    error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                />
                <FormInput
                    placeholder={"Phone"}
                    placeholderTextColor={Colors.secondary}
                    iconName_s="user"
                    color={Colors.primary}
                    icon_color={Colors.secondary}
                    value={phone}
                    containerStyle={{ marginTop:5 }}
                    onChangeText={(text) => { setErrors(""), setPhone(text) }}
                    error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                />
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <FormInput
                        placeholder={"Address"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        color={Colors.primary}
                        icon_color={Colors.secondary}
                        value={address}
                        containerStyle={{ marginTop:5,width:"45%" }}
                        onChangeText={(text) => { setErrors(""), setAddress(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <FormInput
                        placeholder={"Passport"}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        color={Colors.primary}
                        icon_color={Colors.secondary}
                        value={passport}
                        containerStyle={{ marginTop:5,width:"45%" }}
                        onChangeText={(text) => { setErrors(""), setPassport(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                </View>
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
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"Kin Name"}
                            placeholderTextColor={Colors.secondary}
                            iconName_s="user"
                            color={Colors.primary}
                            icon_color={Colors.secondary}
                            value={kinname}
                            containerStyle={{ marginTop:5,width:"45%" }}
                            onChangeText={(text) => { setErrors(""), setKinname(text) }}
                            error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                        />
                        <FormInput
                            placeholder={"Kim Relation"}
                            placeholderTextColor={Colors.secondary}
                            iconName_s="user"
                            color={Colors.primary}
                            icon_color={Colors.secondary}
                            value={kinrelation}
                            containerStyle={{ marginTop:5,width:"45%" }}
                            onChangeText={(text) => { setErrors(""), setKinrelation(text) }}
                            error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                        />
                    </View>
                </View>
                <Text></Text>
            </ProfileView>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:"8%",marginTop:10,flex:1}}>
                    <UploadPic image={require("../../../../Assets/upload_image.png")} name={"Picture"}/>
                    <UploadPic image={require("../../../../Assets/upload_image.png")} name={"Identity"}/>
                    <UploadPic image={require("../../../../Assets/upload_image.png")} name={"Passport"}/>
                    <UploadPic image={require("../../../../Assets/upload_image.png")} name={"Signature"}/>
                   </View>
                <Btn text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:170,borderRadius:20,padding:10,flexDirection:"row",backgroundColor:Colors.primary,justifyContent:"center",marginTop:20,alignSelf:"center"}}/>
                <Text></Text>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateProfile;
