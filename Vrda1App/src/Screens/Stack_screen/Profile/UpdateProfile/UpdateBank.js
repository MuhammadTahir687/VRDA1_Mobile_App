import React, {useState} from "react";
import {Text, View, SafeAreaView, ScrollView, ImageBackground, Image} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import ProfileView from "../../../../utilis/ProfileView";
import {Btn} from "../../../../utilis/Btn";
import {launchImageLibrary} from "react-native-image-picker";
import Toast from "react-native-simple-toast";
import {UpdateBankValidation} from "../../../../utilis/validation";
import {sendUpdateBank, sendUpdateBTC} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";

const UpdateBank = ({navigation,route}) => {
    if(!route.params.title){
        var title="Not Available";
        var lastname ="Not Available";
        var firstname="Not Available";
        var data="Not Available";
        var paramData="Not Available";
    }else{
        var title=route.params.title;
        var lastname =route.params.lastname;
        var firstname=route.params.firstname;
        var data=route.params.data;
        var paramData=route.params.apiData;

    }
    const [fullName,setFullName]=useState(!route.params.apiData?"":paramData.full_name);
    const [iban,setIban]=useState(!route.params.apiData?"":paramData.iban);
    const [bankname,setBankname]=useState(!route.params.apiData?"":paramData.bank_name);
    const [branchname,setBranchname]=useState(!route.params.apiData?"":paramData.branch_name);
    const [swift,setSwift]=useState(!route.params.apiData?"":paramData.swift_code);
    const [accountNumber,setAccountNumber]=useState(!route.params.apiData?"":paramData.bank);
    const [phonenumber,setPhonenumber]=useState(!route.params.apiData?"":paramData.phone_number);
    const [completeAdd,setCompleteAdd]=useState(!route.params.apiData?"":paramData.billing_address);
    const [residentialAdd,setResidentialAdd]=useState(!route.params.apiData?"":paramData.residential_address);
    const [bankaddress,setBankaddress]=useState(!route.params.apiData?"":paramData.bank_address);
    const [city,setCity]=useState(!route.params.apiData?"":paramData.city);
    const [country,setCountry]=useState(!route.params.apiData?"":paramData.bank_country.country_name);
    const [errors,setErrors]=useState("");
    const [isloading,setLoading]=useState(false);
    // const [fileName,setFileName]=useState("");
    // const [imageSourceData,setImageSourceData]=useState(false);

    // const selectPhoto_gallery = () => {
    //     const options = {
    //         mediaType: 'photo',
    //         quality: 0.2
    //     };
    //     launchImageLibrary(options, response => {
    //         if (response.didCancel) {
    //             //cancel
    //         } else if (response.error) {
    //             Toast.show("Something Went Wrong", Toast.LONG);
    //         }
    //         else {
    //             if (response.assets[0].fileSize <= "200000") {
    //                 setLoading(true);
    //                 let source = { uri: response.assets[0].uri };
    //                 var name = (response.assets[0].fileName).slice(25);
    //                 setFileName(name);
    //                 setImageSourceData(source);
    //                 setLoading(false);
    //                 Toast.show("Succeed", Toast.LONG);
    //             } else {
    //                 Toast.show("File size is exceeded from 8 MB", Toast.LONG);
    //             }
    //         }
    //     });
    // };
    const Submit=async () => {
        var validate = UpdateBankValidation(fullName,bankname,branchname,accountNumber,phonenumber,completeAdd,country)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            const body = new FormData();
            body.append('full_name', fullName,);
            body.append('billing_address', completeAdd,);
            body.append('residential_address', residentialAdd,);
            body.append('swift_code', swift,);
            body.append('bank', accountNumber,);
            body.append('iban', iban,);
            body.append('bank_name', bankname,);
            body.append('branch_name', branchname,);
            body.append('bank_address', bankaddress,);
            body.append('phone_number', phonenumber,);
            body.append('city', city,);
            body.append('country', country,);
            // body.append("files", { uri: imageSourceData.uri, name: "photo.jpg", type: `image/jpg`, });
            setLoading(true)
            let response = await sendUpdateBank(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setLoading(false);
                    // await setImageSourceData(null);
                    // await setFileName("");
                    await setFullName("");
                    await setIban("");
                    await setBankname("");
                    await setBranchname("");
                    await setSwift("");
                    await setAccountNumber("");
                    await setPhonenumber("");
                    await setCompleteAdd("");
                    await setResidentialAdd("");
                    await setBankaddress("");
                    await setCity("");
                    await setCountry("");
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
    const onChanged= (text)=> {
        setAccountNumber(text.replace(/[^0-9]/g, ''))
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
                <Loader animating={isloading}/>
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <ProfileView source={{uri: data.picture}} screen_title={"Update Bank Detail"} username={title+" "} firstname={firstname+" "} lastname={lastname} onPress={()=>navigation.goBack()} >
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>Update Bank Detail:</Text>
                <View style={{marginHorizontal:10}}>
                    <FormInput
                        placeholder={"Full Name*"}
                        placeholderTextColor={Colors.secondary}
                        // iconName_s="user" icon_color={Colors.secondary}
                        value={fullName}
                        containerStyle={{ flex:1,height:45,paddingTop:2 }}
                        color={Colors.primary}
                        onChangeText={(text) => { setErrors(""), setFullName(text) }}
                        error={errors === "Name is Required" ? "Name is Required" : null }
                    />
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"IBAN"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            value={iban}
                            containerStyle={{ width:"45%",height:45,paddingTop:2 }}
                            color={Colors.primary}
                            onChangeText={(text) => { setErrors(""), setIban(text) }}
                        />
                        <FormInput
                            placeholder={"Bank Name*"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            color={Colors.primary}
                            value={bankname}
                            containerStyle={{ width:"45%",height:45,paddingTop:2 }}
                            onChangeText={(text) => { setErrors(""), setBankname(text) }}
                            error={errors === "Bank Name is Required" ? "Bank Name is Required" : null }
                        />
                    </View>
                    <FormInput
                        placeholder={"Branch Name*"}
                        placeholderTextColor={Colors.secondary}
                        // iconName_s="user" icon_color={Colors.secondary}
                        color={Colors.primary}
                        value={branchname}
                        containerStyle={{ height:45,paddingTop:2 }}
                        onChangeText={(text) => { setErrors(""), setBranchname(text) }}
                        error={errors === "Branch Name is Required" ? "Branch Name is Required" : null }
                    />
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"Swift Code"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            value={swift}
                            containerStyle={{ width:"45%",height:45,paddingTop:2 }}
                            color={Colors.primary}
                            onChangeText={(text) => { setErrors(""), setSwift(text) }}
                        />
                        <FormInput
                            placeholder={"Account#*"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            value={accountNumber}
                            containerStyle={{ width:"45%",height:45,paddingTop:2 }}
                            color={Colors.primary}
                            keyboardType={'phone-pad'}
                            onChangeText={(text) => { setErrors(""); onChanged(text) }}
                            error={errors === "Account# is Required" ? "Account# is Required" : null }
                        />
                    </View>
                    <FormInput
                        placeholder={"Phone#*"}
                        placeholderTextColor={Colors.secondary}
                        // iconName_s="user" icon_color={Colors.secondary}
                        color={Colors.primary}
                        value={phonenumber}
                        keyboardType={'phone-pad'}
                        containerStyle={{ height:45,paddingTop:2 }}
                        onChangeText={(text) => { setErrors(""), setPhonenumber(text) }}
                        error={errors === "Phone# is Required" ? "Phone# is Required" : errors === "The phone number must be at least 8 characters." ? "The phone number must be at least 8 characters." : null}
                    />
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"Complete Add*..."}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            value={completeAdd}
                            containerStyle={{ width:"45%",height:45,paddingTop:2 }}
                            color={Colors.primary}
                            onChangeText={(text) => { setErrors(""), setCompleteAdd(text) }}
                            error={errors === "Address is Required" ? "Address is Required" : null }
                        />
                        <FormInput
                            placeholder={"Residential Add..."}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            value={residentialAdd}
                            containerStyle={{ width:"45%",height:45,paddingTop:2 }}
                            color={Colors.primary}
                            onChangeText={(text) => { setErrors(""), setResidentialAdd(text) }}
                        />
                    </View>
                    <FormInput
                        placeholder={"Bank Address"}
                        placeholderTextColor={Colors.secondary}
                        // iconName_s="user" icon_color={Colors.secondary}
                        color={Colors.primary}
                        value={bankaddress}
                        containerStyle={{ height:45,paddingTop:2 }}
                        onChangeText={(text) => { setErrors(""), setBankaddress(text) }}
                    />

                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <FormInput
                            placeholder={"City"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            color={Colors.primary}
                            value={city}
                            containerStyle={{ height:45,width:"45%",paddingTop:2 }}
                            onChangeText={(text) => { setErrors(""), setCity(text) }}
                        />
                        <FormInput
                            placeholder={"Country*"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            color={Colors.primary}
                            value={country}
                            containerStyle={{ height:45,width:"45%",paddingTop:2 }}
                            onChangeText={(text) => { setErrors(""), setCountry(text) }}
                            error={errors === "Country is Required" ? "Country is Required" : null }
                        />
                    </View>
                    {/*<Image source={require("../../../../Assets/upload_image.png")} style={{height:80,width:80,alignSelf:"center",borderWidth:2,borderColor:Colors.primary,marginTop:15,borderRadius:15}}/>*/}
                    {/*{errors ==="Please Add Image First"?*/}
                    {/*    <Text style={{textAlign:"center",fontSize:11,fontWeight:"bold",color:"red"}}>Please Add Image First</Text>*/}
                    {/*    :<Text style={{textAlign:"center",fontSize:11,fontWeight:"bold"}}>{fileName?fileName:null}</Text>*/}
                    {/*}*/}
                    {/*<Btn onPress={()=>selectPhoto_gallery()} containerStyle={{flex:1,backgroundColor:Colors.primary,padding:10,borderRadius:10,marginHorizontal:50}} text={"Upload QrCode Image"} text_style={{color:Colors.white}}/>*/}
                </View>

                <Text></Text>
            </ProfileView>
                <Btn onPress={()=>Submit()} text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:110,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:25}}/>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateBank;
