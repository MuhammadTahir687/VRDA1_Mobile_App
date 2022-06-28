import React, {useState,useEffect} from "react";
import {Text, View, SafeAreaView, ScrollView, ImageBackground, Image,RefreshControl} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import ProfileView from "../../../../utilis/ProfileView";
import {Btn} from "../../../../utilis/Btn";
import {launchImageLibrary} from "react-native-image-picker";
import Toast from "react-native-simple-toast";
import {UpdateBankValidation} from "../../../../utilis/validation";
import {sendUpdateBank, sendUpdateBTC,getCountry,getVreitTransferC2C} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";
import styles from "../../../../Style_Sheet/style";
import RNPickerDialog from 'rn-modal-picker';
import CountryPicker from "react-native-country-picker-modal";
import { useIsFocused } from '@react-navigation/native';
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
    const isFocused = useIsFocused();
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
    const [country,setCountry]=useState(!route.params.apiData?"":paramData.country);
    const [errors,setErrors]=useState("");
    const [isloading,setLoading]=useState(false);
    const [selectedValue, setSelectedValue] = useState("Please Select");
    const [selectedid,setSelectedid]=useState("")
    const [placeHolderText,setplaceHolderText]=useState('Select Country');
    const [selectedText,setselectedText]=useState("");
    const [child,setChild]=useState([])
    const [countryCode, setCountryCode] = useState('')
    const [withCountryNameButton, setWithCountryNameButton] = useState(true,)
    const [withCountryNameText, setWithCountryNameText] = useState(true,)
    const [withFlag, setWithFlag] = useState(false)
    const [withEmoji, setWithEmoji] = useState(true)
    const [withFilter, setWithFilter] = useState(true)
    const [withAlphaFilter, setWithAlphaFilter] = useState(true)
    const [withCallingCode, setWithCallingCode] = useState(true)
    const [refreshing,setRefreshing]=useState(false)
    

   
    const onSelect = (country: Country) => {setCountryCode(country.cca2),setCountry(country.name),console.log(country.name)}
   
   
    useEffect(async ()=>{ await getData(); },[isFocused]);


    const getData=async ()=>{
        setLoading(true)
        let response = await getCountry();
       
        if (response !== "Error") {
            if (response.data.status === true) {
               await setChild(response.data.countries)
                console.log(response.data.countries)
                setLoading(false);
            }
            else {
                Toast.show("Something Went Wrong", Toast.LONG);
                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }

    const onRefresh = async () => { await getData(); }

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
            <ScrollView contentContainerStyle={{flexGrow:1}} refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
            <ProfileView source={data.picture} screen_title={"Update Bank Detail"} username={title+" "} firstname={firstname+" "} lastname={lastname} onPress={()=>navigation.goBack()} >
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

                    <View >
                        <FormInput
                            placeholder={"City"}
                            placeholderTextColor={Colors.secondary}
                            // iconName_s="user" icon_color={Colors.secondary}
                            color={Colors.primary}
                            value={city}
                            containerStyle={{ height:43,paddingTop:2 }}
                            onChangeText={(text) => { setErrors(""), setCity(text) }}
                        />
    
                      
                    
                    </View>
                </View>
                        {/* <View style={{ borderBottomWidth: 1,marginHorizontal:10,marginTop:10,marginBottom:10,borderBottomColor:'#979494',paddingVertical:10 }}>
                            <CountryPicker
                                placeholder={<Text style={{color:"#979494"}}>Select Country</Text>}
                                theme={{ fontSize: 13, primaryColor: 'red', primaryColorVariant: '#eee', backgroundColor: "white", onBackgroundTextColor: "black", placeholderTextColor: 'red', }}
                                {...{
                                    countryCode,
                                    withFilter,
                                    // withFlag,
                                    withCountryNameButton,
                                    withCountryNameText,
                                    withAlphaFilter,
                                    withCallingCode,
                                    withEmoji,
                                    onSelect,
                                }} />
                        </View> */}
                        <View style={{ borderBottomWidth: 1,marginHorizontal:10,marginTop:0,marginBottom:10,borderBottomColor:'#979494',paddingVertical:0 }}>
                        <RNPickerDialog
                                data={child}
                                pickerTitle={'Select country'}
                                // labelText={'Select User'}
                                showSearchBar={true}
                                showPickerTitle={true}
                                listTextStyle={styles.listTextStyle}
                                pickerStyle={styles.pickerStyle}
                                selectedText={selectedText}
                                placeHolderText={placeHolderText}
                                searchBarPlaceHolder={'Search.....'}
                                searchBarPlaceHolderColor={'#9d9d9d'}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeHolderTextColor={'gray'}
                                dropDownIconStyle={styles.dropDownIconStyle}
                                searchBarStyle={styles.searchBarStyle}
                                //dropDownIcon={require('../assets/pin.png')}
                                selectedValue={(index, item) => {setselectedText(item.name),setSelectedid(item.id),setCountry(item.name)}}
                            />
                        </View>
                      

            </ProfileView>
            
                <Btn onPress={()=>Submit()} text_style={{color:Colors.white}} text={"Update Info"} containerStyle={{width:110,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:25}}/>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default UpdateBank;
