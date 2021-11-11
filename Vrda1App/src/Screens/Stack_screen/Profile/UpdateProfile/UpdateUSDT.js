import React, {useState} from "react";
import {Text, View, SafeAreaView, ImageBackground, ScrollView, Image} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";
import {launchImageLibrary} from "react-native-image-picker";
import Toast from "react-native-simple-toast";
import {UpdateUsdtvalid} from "../../../../utilis/validation";
import {sendUsdtUpdate} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";

const UpdateUSDT = ({navigation,route}) => {
    var data=route.params.data;
    var title=route.params.title;
    var firstname=route.params.firstname;
    var lastname =route.params.lastname;
    const [usdtAddress,setUsdtAddress]=useState("");
    const [errors,setErrors]=useState("");
    const [fileName,setFileName]=useState("");
    const [isloading,setLoading]=useState(false);
    const [imageSourceData,setImageSourceData]=useState(null);

    const selectPhoto_gallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.2
        };
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                //cancel
            } else if (response.error) {
                Toast.show("Something Went Wrong", Toast.LONG);
            }
            else {
                if (response.assets[0].fileSize <= "200000") {
                    setLoading(true);
                    let source = { uri: response.assets[0].uri };
                    var name = (response.assets[0].fileName).slice(25);
                    setFileName(name);
                    setImageSourceData(source);
                    setLoading(false);
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };
    const Submit=async () => {
        var validate = UpdateUsdtvalid(fileName,imageSourceData,usdtAddress)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            const body = new FormData();
            body.append('usdt', usdtAddress,);
            body.append("usdt_qr_code", { uri: imageSourceData.uri, name: "photo.jpg", type: `image/jpg`, });
            setLoading(true)
            let response = await sendUsdtUpdate(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show("Update Successful", Toast.LONG);
                    await setLoading(false);
                    await setUsdtAddress("");
                    await setImageSourceData(null);
                    await setFileName("")
                }else {
                    Toast.show("Something Went Wrong!", Toast.LONG);
                    setLoading(false);
                }
            }else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <ProfileView source={{uri: data.picture}} screen_title={"Update USDT Detail"} username={title+". "} firstname={firstname+" "} lastname={lastname} onPress={()=>navigation.goBack()}>
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:20}}>Update USDT Detail:</Text>
                        <View style={{marginHorizontal:10}}>
                            <FormInput
                                placeholder={"USDT Address"}
                                placeholderTextColor={Colors.secondary}
                                value={usdtAddress}
                                color={Colors.primary}
                                onChangeText={(text) => { setErrors(""), setUsdtAddress(text) }}
                                error={errors === "Please Enter Address" ? "Please Enter Address" :null ||errors === "USDT Address must be 16" ? "The USDT must be at least 16 characters." :null }
                            />
                            <Image source={require("../../../../Assets/upload_image.png")} style={{height:100,width:100,alignSelf:"center",borderWidth:2,borderColor:Colors.primary,marginTop:10,borderRadius:15}}/>
                            <Btn onPress={()=>{selectPhoto_gallery()}} containerStyle={{flex:1,backgroundColor:Colors.primary,marginTop:10,padding:10,borderRadius:10}} text={"Upload QrCode Image"} text_style={{color:Colors.white}}/>
                        </View>
                        <Text></Text>
                    </ProfileView>
                    <Btn onPress={()=>Submit()} text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:100,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateUSDT;
