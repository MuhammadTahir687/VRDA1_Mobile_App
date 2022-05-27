import React, {useState} from "react";
import {Text, View, SafeAreaView, ScrollView, ImageBackground, Image, TouchableOpacity} from "react-native";
import ProfileView from "../../../../utilis/ProfileView";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";
import UploadPic from "../../../../utilis/Upload_Pic";
import {launchImageLibrary} from "react-native-image-picker";
import Toast from "react-native-simple-toast";
import {UpdateProfileValidation} from "../../../../utilis/validation";
import {sendUpdateProfile} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";

const UpdateProfile = ({navigation,route}) => {
    const data = route.params.data;
    const user =route.params.user;
    const [city,setCity]=useState(data.city);
    const [errors,setErrors]=useState("");
    const [address,setAddress]=useState(data.address);
    const [email,setEmail]=useState(data.email_alter);
    const [kinname,setKinname]=useState(data.kin_name);
    const [phone,setPhone]=useState(data.phone_no_alter);
    const [passport,setPassport]=useState(data.passport);
    const [identity,setIdentity]=useState(data.identity);
    const [isloading,setLoading]=useState(false);
    const [kinrelation,setKinrelation]=useState(data.kin_relation);
    const [fileName,setFileName]=useState("");
    const [fileNameId,setFileNameId]=useState("");
    const [fileNamePass,setFileNamePass]=useState("");
    const [fileNameSig,setFileNameSig]=useState("");
    const [imageSourceData,setImageSourceData]=useState(null);
    const [imageSourceDataId,setImageSourceDataId]=useState(null);
    const [imageSourceDataPass,setImageSourceDataPass]=useState(null);
    const [imageSourceDataSig,setImageSourceDataSig]=useState(null);
    const [imageSourceDatakin,setImageSourceDatakin]=useState(null);

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
    const selectIdentity_gallery = () => {
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
                    setFileNameId(name);
                    setImageSourceDataId(source);
                    setLoading(false);
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };
    const selectPassport_gallery = () => {
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
                    setFileNamePass(name);
                    setImageSourceDataPass(source);
                    setLoading(false);
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };
    const selectSignature_gallery = () => {
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
                    setFileNameSig(name);
                    setImageSourceDataSig(source);
                    setLoading(false);
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };
    const selectNextToKin_gallery = () => {
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
                    setImageSourceDatakin(source);
                    setLoading(false);
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };

    const Submit=async () => {
        const validate = UpdateProfileValidation(address,city,identity,passport,kinname,kinrelation)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            setLoading(true)
            const body = new FormData();
            body.append('country_id', data.user_profile.country_id);
            body.append('address', address);
            body.append('city', city);
            body.append('email_alter', email);
            body.append('phone_no_alter', phone);
            body.append('identity', identity);
            body.append('passport', passport);
            body.append('kin_name', kinname);
            body.append('kin_relation', kinrelation);
            {imageSourceData && body.append("picture", { uri: imageSourceData.uri, name: "photo.jpg", type: `image/jpg`, })}
            {imageSourceDataId && body.append("identity_pic", { uri: imageSourceDataId.uri, name: "photo.jpg", type: `image/jpg`, })}
            {imageSourceDataPass && body.append("passport_pic", { uri: imageSourceDataPass.uri, name: "photo.jpg", type: `image/jpg`, })}
            {imageSourceDataSig && body.append("signature_pic", { uri: imageSourceDataSig.uri, name: "photo.jpg", type: `image/jpg`, })}
            {imageSourceDatakin && body.append("kin_identity_pic", { uri: imageSourceDatakin.uri, name: "photo.jpg", type: `image/jpg`, })}
            let response = await sendUpdateProfile(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show("Update Successful", Toast.LONG);
                    await setLoading(false);
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
            <ScrollView style={{flex:1}}>
            <ProfileView source={{uri: data.picture}} screen_title={"Update Profile"} username={data.title+" "} firstname={data.first_name+" "} lastname={data.last_name} onPress={()=>navigation.goBack()}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10,bottom:20}}>Update Profile:</Text>
                <View style={{marginHorizontal:10}}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",flex:1}}>
                        <View style={{flex:1,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Title</Text>
                        <FormInput
                            placeholder={"Title"}
                            placeholderTextColor={Colors.secondary}
                            value={data.title+"."}
                            editable={false}
                            containerStyle={{ flex:1,backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5 }}
                            color={Colors.primary}
                        />
                        </View>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>First Name</Text>
                        <FormInput
                            placeholder={"Firstname"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={data.first_name}
                            editable={false}
                            containerStyle={{ flex:2,backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5 }}
                        />
                        </View>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Last Name</Text>
                        <FormInput
                            placeholder={"Lastname"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={data.last_name}
                            editable={false}
                            containerStyle={{ flex:2,backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5 }}
                        />
                        </View>
                    </View>
                    <View style={{flex:1,margin:2}}>
                        <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Username</Text>
                    <FormInput
                        placeholder={"Username"}
                        placeholderTextColor={Colors.secondary}
                        color={Colors.primary}
                        value={user.name}
                        editable={false}
                        containerStyle={{ flex:1,backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5 }}
                    />
                    </View>
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <View style={{flex:2,margin:2}}>
                        <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Email</Text>
                    <FormInput
                        placeholder={"Email"}
                        placeholderTextColor={Colors.secondary}
                        value={user.email}
                        editable={false}
                        containerStyle={{flex:2,backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5}}
                        color={Colors.primary}
                    />
                    </View>
                    <View style={{flex:2,margin:2}}>
                        <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Alternative Email</Text>
                    <FormInput
                        placeholder={"Alternative Email"}
                        placeholderTextColor={Colors.secondary}
                        color={Colors.primary}
                        value={email}
                        containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                        onChangeText={(text) => { if (text.includes('  ')) {
                            setEmail(text.trim());
                            setErrors("")
                        } else {
                            setEmail(text);
                            setErrors("")
                        }}}
                    />

                    </View>
                </View>
                    <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Phone</Text>
                        <FormInput
                            placeholder={"Phone"}
                            placeholderTextColor={Colors.secondary}
                            value={data.phone_no}
                            editable={false}
                            containerStyle={{flex:2,backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5}}
                            color={Colors.primary}
                        />
                        </View>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Alternative Phone</Text>
                        <FormInput
                            placeholder={"Alternative Phone"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={phone}
                            containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                            onChangeText={(text) => { if (text.includes('  ')) {
                                setPhone(text.trim());
                                setErrors("")
                            } else {
                                setPhone(text);
                                setErrors("")
                            }}}
                        />
                        </View>
                    </View>
                    <View style={{flex:1,margin:2}}>
                        <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Address*</Text>
                    <FormInput
                    placeholder={"Address"}
                    placeholderTextColor={Colors.secondary}
                    color={Colors.primary}
                    value={address}
                    containerStyle={{flex:1,borderWidth:0.3,borderRadius:5}}
                    onChangeText={(text) => { if (text.includes('  ')) {
                        setAddress(text.trim());
                        setErrors("")
                    } else {
                        setAddress(text);
                        setErrors("")
                    }}}
                />
                        {errors ? <Text style={{color:"red",fontSize:11}}>{errors === "Address is Required" ? "Address is Required" : errors === "Address length at least 3" ? "Address length at least 3" : null}</Text>:null}
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>City*</Text>
                        <FormInput
                            placeholder={"City*"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={city}
                            containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                            onChangeText={(text) => { if (text.includes('  ')) {
                                setCity(text.trim());
                                setErrors("")
                            } else {
                                setCity(text);
                                setErrors("")
                            }}}
                        />
                            {errors ? <Text style={{color:"red",fontSize:11}}>{errors === "City is Required" ? "City is Required" :errors === "City length at least 3" ? "City length at least 3" : null}</Text>:null}
                        </View>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Country*</Text>
                        <FormInput
                            placeholder={"Country"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={data.country}
                            editable={false}
                            containerStyle={{backgroundColor:"rgba(0,0,0,0.13)",borderRadius:5}}
                        />
                        </View>
                    </View>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                    <View style={{flex:2,margin:2}}>
                        <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Identity*</Text>
                    <FormInput
                        placeholder={"Identity*"}
                        placeholderTextColor={Colors.secondary}
                        color={Colors.primary}
                        value={identity}
                        containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                        onChangeText={(text) => { if (text.includes('  ')) {
                            setIdentity(text.trim());
                            setErrors("")
                        } else {
                            setIdentity(text);
                            setErrors("")
                        }}}
                    />
                        {errors ? <Text style={{color:"red",fontSize:11}}>{errors === "Identity is Required" ? "Identity is Required" :errors === "Identity length at least 3" ? "Identity length at least 3" : null}</Text>:null}
                    </View>
                    <View style={{flex:2,margin:2}}>
                        <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Passport*</Text>
                    <FormInput
                        placeholder={"Passport*"}
                        placeholderTextColor={Colors.secondary}
                        color={Colors.primary}
                        value={passport}
                        containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                        onChangeText={(text) => { if (text.includes('  ')) {
                            setPassport(text.trim());
                            setErrors("")
                        } else {
                            setPassport(text);
                            setErrors("")
                        }}}
                    />
                        {errors ? <Text style={{color:"red",fontSize:11}}>{errors === "Passport is Required" ? "Passport is Required" :errors === "Passport length at least 3" ? "Passport length at least 3" : null}</Text>:null}

                    </View>
                </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Kin Name*</Text>
                        <FormInput
                            placeholder={"Kin Name*"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={kinname}
                            containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                            onChangeText={(text) => { if (text.includes('  ')) {
                                setKinname(text.trim());
                                setErrors("")
                            } else {
                                setKinname(text);
                                setErrors("")
                            }}}
                        />
                            {errors ? <Text style={{color:"red",fontSize:11}}>{errors === "Kin Name is Required" ? "Kin Name is Required" :errors === "Kin Name length at least 3" ? "Kin Name length at least 3" : null}</Text>:null}

                        </View>
                        <View style={{flex:2,margin:2}}>
                            <Text style={{fontWeight:"bold",fontSize:13,paddingLeft:2}}>Kin Relation*</Text>
                        <FormInput
                            placeholder={"Kim Relation*"}
                            placeholderTextColor={Colors.secondary}
                            color={Colors.primary}
                            value={kinrelation}
                            containerStyle={{flex:2,borderWidth:0.3,borderRadius:5}}
                            onChangeText={(text) => { if (text.includes('  ')) {
                                setKinrelation(text.trim());
                                setErrors("")
                            } else {
                                setKinrelation(text);
                                setErrors("")
                            }}}

                        />
                            {errors ? <Text style={{color:"red",fontSize:11}}>{errors === "Kin Relation is Required" ? "Kin Relation is Required" :errors === "Kin Relation length at least 3" ? "Kin Relation length at least 3" : null}</Text>:null}

                        </View>
                    </View>
                </View>
                <Text></Text>
            </ProfileView>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:"8%",marginTop:10,flex:1}}>
                    <UploadPic onPress={()=>{selectPhoto_gallery()}} source={{uri: data.picture}} name={"Picture"}/>
                    <UploadPic onPress={()=>{selectIdentity_gallery()}} source={{uri: "https://staging.vrda1.net/"+ data.identity_pic}} name={"Identity"}/>
                    <UploadPic onPress={()=>{selectPassport_gallery()}} source={{uri: "https://staging.vrda1.net/"+ data.passport_pic}} name={"Passport"}/>
                    <UploadPic onPress={()=>{selectSignature_gallery()}} source={{uri: "https://staging.vrda1.net/"+ data.signature_pic}} name={"Signature"}/>
                    <UploadPic onPress={()=>{selectNextToKin_gallery()}} source={{uri: "https://staging.vrda1.net/"+ data.kin_identity_pic}} name={"Next to Kin"}/>
                   </View>
                <Btn onPress={()=>{Submit()}} text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:170,borderRadius:20,padding:10,flexDirection:"row",backgroundColor:Colors.primary,justifyContent:"center",marginTop:20,alignSelf:"center"}}/>
                <Text></Text>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateProfile;
