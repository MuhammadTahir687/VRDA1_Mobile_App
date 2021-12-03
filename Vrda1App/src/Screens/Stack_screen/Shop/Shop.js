import React, {useEffect, useRef, useState} from "react";
import {View, Text, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Image,Platform} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Btn } from "../../../utilis/Btn";
import DoubleText from "../../../utilis/DoubleText";
import { getShop, sendShopPayment, sendShopSubmit } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Notes from "../../../Zextra/Note";
import Alert from "../../../Zextra/Alert";
import Loader from "../../../utilis/Loader";
import {FormInput} from "../../../utilis/Text_input";
import Dropdown from "../../../utilis/Picker/Picker";
import Clipboard from "@react-native-community/clipboard";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {BuyValidation, ShopValidation} from "../../../utilis/validation";
import CheckBox from "../../../utilis/Checkbox";

const Shop = ({navigation}) => {
    const refRBSheet = useRef();
    const [data,setData]=useState([]);
    const [iban,setIban]=useState("");
    const [ids, setIds] = useState({});
    const [index, setIndex] = useState(0);
    const [errors, setErrors] = useState("");
    const [detail, setDetail] = useState("");
    const [imageUri,setImageUri]=useState("");
    const [isloading,setLoading]=useState("");
    const [bankName,setBankName]=useState("");
    const [vreitMsg,setVreitMsg]=useState("");
    const [fileName,setFileName]=useState("");
    const [checked,setChecked]=useState(false);
    const [packageID,setPackageID]=useState("");
    const [swiftCode,setSwiftCode]=useState("");
    const [walletmsg,setwalletmsg]=useState("");
    const [cifNumber,setCifNumber]=useState("");
    const [branchName,setBranchName]=useState("");
    const [branchCode,setBranchCode]=useState("");
    const [accountName,setAccountName]=useState("");
    const [usdtAddress,setUsdtAddress]=useState("");
    const [walletAmount,setwalletAmount]=useState("");
    const [packagePrice,setPackagePrice]=useState("");
    const [accountNumber,setAccountNumber]=useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [imageSourceData, setImageSourceData] = useState(null);


    const buttons = [{ name: 'Package Detail', id: 0 }, { name: 'Proceed Order', id: 1 }] //false

    useEffect(async ()=>{await getShopData();},[]);

    const picker=[
      { label: 'Bank', value: 'bank', color:Colors.primary },
        { label: 'USDT', value: 'usdt',color:Colors.primary },
        { label: 'Wallet', value: 'wallet',color:Colors.primary },
        { label: 'Vreit', value: 'vreit',color:Colors.primary },
    ];

    const getShopData=async ()=>{
        setLoading(true)
        let response = await getShop()
        if (response !== "Error") {
            if (response.data.status == true) {
                setData(response.data.data);
                setLoading(false);
            }else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            // alert(JSON.stringify(response))
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }

    const gettingDetails=async ({text})=>{
        setLoading(true)
        let body = {package_id: packageID, value: text,};
        let response = await sendShopPayment(body);
        if (response !== "Error") {
            if (response.data.status === true) {
                var res=response.data.data;
               if (text=="bank") {
                   setIban(res.bank_form.iban); setBankName(res.bank_form.bank_name);
                   setCifNumber(res.bank_form.cif_number); setSwiftCode(res.bank_form.swift_code);
                   setBranchName(res.bank_form.branch_name); setBranchCode(res.bank_form.branch_code);
                   setAccountName(res.bank_form.account_name); setAccountNumber(res.bank_form.account_number);
                   setLoading(false);
               }else if (text == "usdt") {
                   setImageUri(res.usdt_form.image);
                   setUsdtAddress(res.usdt_form.code);
                   setLoading(false);
               }else if (text == "wallet") {
                   setwalletmsg(res.wallet_form.message);
                   setwalletAmount(res.available)
                   setPackagePrice(res.package.price)
                   setLoading(false);
               }else if (text == "vreit") {
                   setVreitMsg(res.vreit.message);
                   setLoading(false);
               } else {
                   setLoading(false);
               }
            } else {

                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
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
                    let source = { uri: response.assets[0].uri };
                    var name = (response.assets[0].fileName).slice(25);
                    if (selectedValue=="bank" || "usdt"){
                    setFileName(name);
                    setImageSourceData(source);
                    }
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };
    const Submit=async () => {
            var validate = ShopValidation(fileName,imageSourceData)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            const body = new FormData();
            body.append('package_id', ids.id,);
            body.append("proceed_with", selectedValue);
            body.append("payment_details", detail);
            body.append("picture", { uri: imageSourceData.uri, name: "photo.jpg", type: `image/jpg`, });
            setLoading(true)
            let response = await sendShopSubmit(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.success, Toast.LONG);
                    await setSelectedValue("")
                    await setDetail("");
                    await setImageSourceData(null);
                    await setFileName("")
                    await setLoading(false);
                    await refRBSheet.current.close();
                }else if (response.data.status == false) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setDetail("");
                    await setImageSourceData(null);
                    await setFileName("")
                    setLoading(false);
                }
                else {
                    Toast.show("Something Went Wrong", Toast.LONG);
                    setLoading(false);
                }
            }else {
                alert(JSON.stringify(response))
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }
    const walletBuy = async () => {
        var validate = BuyValidation(walletAmount, packagePrice)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            setLoading(true)
            let body = {package_id: packageID, proceed_with: selectedValue,};
            let response = await sendShopSubmit(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.success, Toast.LONG);
                    await setLoading(false);
                    await setSelectedValue("");
                    await refRBSheet.current.close();
                } else {
                    Toast.show("Something Went Wrong !", Toast.LONG);
                    setLoading(false);
                }
            } else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }
    const renderItem = ({ item, index }) => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => { refRBSheet.current.open(); setIds(item);setPackageID(item.id) }} style={{ flex: 1, marginHorizontal: 5 }}>
                <LinearGradient colors={['#333232', '#a9a6a6']} style={{ paddingHorizontal: 15, borderRadius: 10, margin: 4, flex: 1 }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: "bold", color: Colors.white, fontSize: 18 }}>{item.title}</Text>
                        <Text style={{ color: Colors.white }}>{item.price}</Text>
                        <Text style={{ textAlign: "center", marginVertical: 40, padding: 7, borderRadius: 5, borderWidth: 1, borderColor: Colors.white, color: Colors.white, fontSize: 12 }}>Subscription $50</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.primary, borderRadius: 6, fontSize: 10, color: Colors.white }}>{item.extra_tokens}%</Text>
                            <Text style={{ color: Colors.white, fontSize: 11 }}>  VREIT Bonus Point</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
    const copyToClipboard = () => {
        Clipboard.setString(usdtAddress);
        Toast.show("Text Copied !", Toast.LONG);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", color: Colors.secondary }}>Buy Package</Text>
            <FlatList
                ItemSeparatorComponent={Platform.OS !== 'android' && (({ highlighted }) => (<View style={[highlighted && { marginLeft: 0 }]} />))}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={{ flex: 1 }}
            />
            <RBSheet
                ref={refRBSheet}
                height={480}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                dragFromTopOnly={true}
                customStyles={{ wrapper: { backgroundColor: "rgba(0,0,0,0.47)" }, draggableIcon: { backgroundColor: "#000" }, container: { borderTopLeftRadius: 30, borderTopRightRadius: 30 } }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 30 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary }}>{ids.title}</Text>
                    <AntDesign color={Colors.primary} size={20} name={"closecircle"} onPress={() => { refRBSheet.current.close() }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, }}>
                    {buttons.map((item, indexs) => (
                        <Btn onPress={() => {
                            setIndex(indexs);
                            // getData(indexs)
                        }} containerStyle={{ backgroundColor: index == indexs ? Colors.primary : Colors.white, paddingVertical: 10, paddingHorizontal: 10, flex: 1, borderRadius: 5, marginLeft: 3, borderWidth: 1, borderColor: Colors.primary }} text={item.name} text_style={{ color: index == indexs ? Colors.white : Colors.primary }} />
                    ))}
                </View>
                {index == 0 ?
                    <View style={{ justifyContent: "space-evenly" }}>
                        <DoubleText text1={"Price"} text2={"$"+ids.price} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                        <DoubleText text1={"Business Volume"} text2={ids.business_volume+" BV"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                        <DoubleText text1={"Escrow Time"} text2={ids.escroll_time+" Days"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                        <DoubleText text1={"Direct Commission"} text2={ids.direct_commission+"%"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                        <DoubleText text1={"Binary Commission"} text2={ids.binary_commission+"%"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                        <DoubleText text1={"Maxout Per Week"} text2={"$"+ids.maxout} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                        <DoubleText text1={"Extra Tokens"} text2={ids.extra_tokens+"%"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                    </View>
                    : <View style={{ marginHorizontal: 10, flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            <TouchableOpacity activeOpacity={1}>
                                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Proceed With</Text>
                                <View style={{borderBottomWidth: 1, borderColor: Colors.secondary, }}>
                                    <Dropdown onValueChange={(text)=>{gettingDetails({text}),setSelectedValue(text)}} PickerData={picker}/>
                                </View>
                                {selectedValue == "bank"?
                                    <View>
                                    <Loader animating={isloading}/>
                                    <DoubleText text1={"Account Name"} text2={accountName?accountName:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"Bank Name"} text2={bankName ? bankName:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <DoubleText text1={"Account Number"} text2={accountNumber ? accountNumber:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"IBAN"} text2={iban ? iban:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <DoubleText text1={"Swift Code"} text2={swiftCode ? swiftCode:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"CIF Number"} text2={cifNumber ? cifNumber:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <DoubleText text1={"Branch Name"} text2={branchName ? branchName:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"Branch Code"} text2={branchCode ? branchCode:"Not Available"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <Btn onPress={selectPhoto_gallery.bind(this)} image={require("../../../Assets/picture.png")} img_style={{height:20,width:20,marginHorizontal:5}} containerStyle={{flexDirection:"row", flex: 1, backgroundColor: Colors.primary, marginTop: 10, padding: 10, borderRadius: 5,marginHorizontal:20,justifyContent:"center",justifyItems:"center" }} text={"Choose File"} text_style={{ color: Colors.white,textAlign:"center" }} />
                                        {errors ==="Please Add Image First"?
                                          <Text style={{textAlign:"center",fontSize:11,fontWeight:"bold",color:"red"}}>{!fileName?"Please Add Image First":null}</Text>
                                          :<Text style={{textAlign:"center",fontSize:11,fontWeight:"bold"}}>{fileName?fileName:null}</Text>
                                        }
                                        <Notes/>
                                        <FormInput
                                            placeholder={"User Notes"}
                                            placeholderTextColor={Colors.lightgray}
                                            value={detail}
                                            color={Colors.primary}
                                            containerStyle={{ margin: 15, }}
                                            styleBorder={{borderWidth:1,borderColor:Colors.primary,borderRadius:5}}
                                            onChangeText={(text) => { setDetail(text),setErrors("") }}
                                            error={errors === "Please Enter Notes Details" ? "Please Enter Notes Details" : null }
                                        />
                                        <View style={{flexDirection:"row"}}>
                                        <CheckBox
                                            style={{marginHorizontal:15}}
                                            textStyle={{fontWeight:"bold"}}
                                            size={20}
                                            selected={checked}
                                            onPress={() => setChecked(!checked)}
                                            text={" I accept"}/>
                                            <Text onPress={()=>{refRBSheet.current.close();setSelectedValue("");navigation.navigate("TermsAndCondition")}} style={{right:15,color:"#53a0b7",fontWeight:"bold",textDecorationLine:"underline",fontSize:14,alignSelf:"center"}}>Terms & Conditions</Text>
                                        </View>
                                    <Btn disabled={checked == true ? false : true} onPress={()=>Submit()} text_style={{ color: Colors.white }} text={"Submit"} containerStyle={{ width: 100, borderRadius: 5, padding: 10, backgroundColor:checked ===true?Colors.primary:Colors.secondary, alignSelf: "center", bottom: 20, marginTop: 30, }} />
                                    </View>
                                    :selectedValue == "usdt"?
                                        <View>
                                            <Loader animating={isloading}/>
                                            <Text style={{top:25,width:58,padding:8,backgroundColor:"#2c754a",color:Colors.white,textAlign:"center",borderRadius:6}}>TRC20</Text>
                                            <Image source={{uri:imageUri }} style={{width: 160,height:155,alignSelf:"center"}}/>
                                        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', }} onPress={() => { copyToClipboard() }}>
                                            <Text>{usdtAddress}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                                                <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                                            </View>
                                        </TouchableOpacity>
                                            <View style={{borderWidth:1,borderColor:Colors.primary,borderRadius:10,padding:5,marginVertical:5}}>
                                                <Text style={{color:Colors.primary,fontWeight:"bold",fontSize:15}}>Importent Note</Text>
                                                <Text style={{color:Colors.primary,fontSize:13}}>Send only USDT to this deposit address.</Text>
                                                <Text style={{color:Colors.primary,fontSize:11}}>* Sending coins or tokens other than USDT to this address may result in the loss of your deposit.</Text>
                                                <Text style={{color:Colors.primary,fontSize:11}}>* Package will be update or upgrade after confirmation.</Text>
                                            </View>
                                            <Btn onPress={selectPhoto_gallery.bind(this)} containerStyle={{ flex: 1, backgroundColor: Colors.primary, marginTop:8, padding: 10, borderRadius: 5,marginHorizontal:20 }} text={"Choose File"} text_style={{ color: Colors.white }} />
                                            {errors ==="Please Add Image First"?
                                                <Text style={{textAlign:"center",fontSize:11,fontWeight:"bold",color:"red"}}>{!fileName?"Please Add Image First":null}</Text>
                                                :<Text style={{textAlign:"center",fontSize:11,fontWeight:"bold"}}>{fileName?fileName:null}</Text>
                                            }
                                            <Notes/>
                                            <View style={{flexDirection:"row"}}>
                                                <CheckBox
                                                    style={{marginHorizontal:15}}
                                                    textStyle={{fontWeight:"bold"}}
                                                    size={20}
                                                    selected={checked}
                                                    onPress={() => setChecked(!checked)}
                                                    text={" I accept"}/>
                                                <Text onPress={()=>{refRBSheet.current.close();setSelectedValue("");navigation.navigate("TermsAndCondition")}} style={{right:15,color:"#53a0b7",fontWeight:"bold",textDecorationLine:"underline",fontSize:14,alignSelf:"center"}}>Terms & Conditions</Text>
                                            </View>
                                            <Btn disabled={checked == true ? false : true} onPress={()=>Submit()} text_style={{ color: Colors.white }} text={"Submit"} containerStyle={{ width: 100, borderRadius: 5, padding: 10, backgroundColor:checked ===true?Colors.primary:Colors.secondary, alignSelf: "center", marginTop: 12, }} />
                                            <Text></Text>
                                        </View>
                                        :selectedValue == "wallet"?
                                            <View>
                                                <Loader animating={isloading}/>
                                                {walletmsg ?
                                                    <View>
                                                        <Text style={{ margin: 10 }}>{walletmsg}</Text>
                                                        <Btn onPress={()=>walletBuy()} text_style={{ color: Colors.white }} text={"Buy"} containerStyle={{ width: 100, borderRadius: 5, padding: 10, backgroundColor: Colors.primary, alignSelf: "center", marginTop: 12, }} />
                                                    </View>
                                                    :errors ==="insuffient Balance"
                                                        ? <Alert value={"Wallet"}/>
                                                        : null
                                                }
                                            </View>
                                            :selectedValue == "vreit"?
                                                <View>
                                                    <Loader animating={isloading}/>
                                                    {vreitMsg ?
                                                        <View>
                                                            <Text style={{ margin: 10 }}>{vreitMsg}</Text>
                                                            <Btn onPress={()=>walletBuy()} text_style={{ color: Colors.white }} text={"Buy"} containerStyle={{ width: 100, borderRadius: 5, padding: 10, backgroundColor: Colors.primary, alignSelf: "center", marginTop: 12, }} />
                                                        </View>
                                                        :<Alert value={"Vreit Wallet"}/>
                                                    }
                                                </View>: null
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                }
            </RBSheet>
        </SafeAreaView>
    )
}
export default Shop;
