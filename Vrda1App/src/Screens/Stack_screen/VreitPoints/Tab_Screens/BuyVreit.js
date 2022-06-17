import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, ScrollView,FlatList, TouchableOpacity, Image, RefreshControl, Platform } from "react-native";
import Entypo from "react-native-vector-icons/Ionicons";
import { List } from 'react-native-paper';
import { getVreitQuaterly, sendVreitShiftedBtn } from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Colors from "../../../../Style_Sheet/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";
import Dialogs from "../../../../utilis/Dialog";
import Loader from "../../../../utilis/Loader";
import { getBuyVreit,BuyVreitPost } from "../../../../utilis/Api/Api_controller";
import { Btn } from "../../../../utilis/Btn";
import { FormInput } from "../../../../utilis/Text_input";
import CheckBox from "../../../../utilis/Checkbox";
import Dropdown from "../../../../utilis/Picker/Picker";
import BuyVreitNotes from '../../../../Zextra/BuyVreitNote';
import Notes from "../../../../Zextra/Note";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Clipboard from "@react-native-community/clipboard";
import {NetworkInfo} from 'react-native-network-info';

const BuyVreit = ({ navigation }) => {
    const [detail, setDetail] = useState("");
    const [isloading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");
    const [amount, setAmount] = useState(0);
    const [index, setIndex] = useState(0);
    const [apiData, setApiData] = useState("");
    const [refreshing, setRefreshing] = useState(false)
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [serviceCharges, setServiceCharges] = useState("5");
    const [selectedValue, setSelectedValue] = useState("");
    const [view, setview] = useState(false);
    const [currentvrietrate,setCurrentvreitrate]=useState(0.15);
    const [currentdametarate,setCurrentdametarate]=useState(0.3102);
    const [coinconvert,setCoinconvert]=useState(0)
    const [errormsg,setErrormsg]=useState("");
    const [imageSourceData, setImageSourceData] = useState('');
    const [fileName, setFileName] = useState("");
    const [selectedvalueerror,setSelectedvalueerror]=useState("")
    const buttons = [{ name: 'Wallet Status', id: 0 }, { name: 'Buy Vreits', id: 1 },]
    const Item = [{ label: 'Bank', value: 'bank' }, { label: 'USDT', value: 'usdt' }, { label: 'Wallet', value: 'wallet' }]

    useEffect(async () => {
        await getData();
       
    }, []);

    const getData = async () => {
        setLoading(true)
        let response = await getBuyVreit();
        if (response !== "Error") {
            if (response.data.status == true && response.data.email_status == true) {
                setview(true)
                setApiData(response.data);
                setRefreshing(!refreshing)
                setLoading(false);
            }
            else if (response.data.status == true && response.data.email_status == false) {
                setview(false)
                const data = response.data.user;
                navigation.reset({ index: 0, routes: [{ name: "Bad Email", params: { data } }] });
                setLoading(false)
            }
            else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        } else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    const gettingDetails = async ({ text }) => {
        setLoading(true)
        let body = { payment_type: text, };
        let response = await sendWithdrawFunds_Charges(body);
        if (response !== "Error") {
            setServiceCharges(response.data.percentage);
            setLoading(false);
        } else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }

    const onRefresh = async () => {
        await getData();
    }
    const Submit = async () => {

        if(selectedValue==""){
            setSelectedvalueerror("Select the Payment Type")
        }
       else if (amount == "") {
            setErrormsg("Enter the Amount*")
        } else {
            setErrormsg("")
            let body = { payment_type:selectedValue, wallet_amount:amount, receipt_file:imageSourceData, vreit_points:coinconvert };
            setLoading(true)
            console.log("Body=======",imageSourceData)
            let response = await BuyVreitPost(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setLoading(false);
                    await setDetail("");
                    await setAmount("");
                    await setCoinconvert(0)
                    await setSelectedValue("")
                    await setChecked(false);
                    await onRefresh();
                } else if (response.data.status == false) {
                    Toast.show("Request " + response.data.data, Toast.LONG);
                    setLoading(false);
                }
                else {
                    Toast.show("Something Went Wrong ", Toast.LONG);
                    setLoading(false);
                }
            } else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }

    const conversion=async(text)=>{
        const regex=/[^0-9]/;
           if(regex.test(text)==true){
            setErrormsg("Note: Please add value in round figure (e.g: 100, 20)")
            setChecked(false)
           }
          else if(selectedValue=="wallet" && text > apiData.available_wallet){
            setErrormsg("Note: You can not buy vreits due to exceeded Wallet Amount.")
            setChecked(false)
           }
           else{
            setAmount(text);
            const a=text/currentdametarate;
            setErrormsg("")
            setCoinconvert(a)
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
                    setLoading(true);
                    let source = { uri: response.assets[0].uri };
                    var name = (response.assets[0].fileName).slice(25);
                    setFileName(name);
                    setImageSourceData(source);
                    console.log("source=======",source)
                    console.log("name======",name)
                    setLoading(false);
                    Toast.show("Succeed", Toast.LONG);
                } else {
                    Toast.show("File size is exceeded from 8 MB", Toast.LONG);
                }
            }
        });
    };
    
    const copyToClipboard = () => {
        Clipboard.setString("TMc8LNFKvP6spQqTkxsmiu5mqhAMKbEmSk");
        Toast.show("Text Copied !", Toast.LONG);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader animating={isloading} />
            {view == true ? <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />} >
                {/* <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",textDecorationLine:"underline",color:Colors.secondary,margin:10}}>Withdraw Funds</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15, }}>
                    {buttons.map((item, indexs) => (
                        <Btn onPress={() => {
                            setIndex(indexs);
                            // getData(indexs)
                        }} containerStyle={{ backgroundColor: index == indexs ? Colors.primary : Colors.white, paddingVertical: 10, paddingHorizontal: 10, flex: 1, borderRadius: 5, marginLeft: 3, borderWidth: 1, borderColor: Colors.primary }} text={item.name} text_style={{ color: index == indexs ? Colors.white : Colors.primary }} />
                    ))}
                </View>
                {index == 0 ?
                    <View style={{ marginVertical: 20, justifyContent: "space-evenly" }}>
                        <DoubleText text1={"Available Wallet Points"} text2={apiData.available_wallet ? parseFloat(apiData.available_wallet).toFixed(2) : "0"} textstyle={{ textAlign: "center" }} containerstyle={{ marginHorizontal: 15, padding: 6, backgroundColor: "rgba(152,148,148,0.63)" }} />
                        <DoubleText text1={"Current Vreit points"} text2={apiData.available_vreits ? "$" + parseFloat(apiData.available_vreits).toFixed(2) : "0"} textstyle={{ textAlign: "center" }} containerstyle={{ marginHorizontal: 15, padding: 6 }} />
                        <DoubleText text1={"Current Rate"} text2={apiData.vreit_rate ? "$" + parseFloat(apiData.vreit_rate).toFixed(2) : "$0"} textstyle={{ textAlign: "center" }} containerstyle={{ marginHorizontal: 15, padding: 6, backgroundColor: "rgba(152,148,148,0.63)" }} />
                    </View>
                    :
                    <View style={{ margin: 20 }}>
                        <View style={{ flex: 1, backgroundColor: "#d4d0d0", marginVertical: 10, borderRadius: 5,overflow: 'hidden', }}>
                            <Text style={{ backgroundColor: "black", color: "white", paddingLeft: 10, paddingVertical: 10, fontWeight: "bold", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>Buy Vreits</Text>
                            
                            <View style={{borderBottomWidth:1,borderColor:Colors.secondary,backgroundColor:"white",marginHorizontal:10,marginTop:10,borderTopLeftRadius: 5, borderTopRightRadius: 5,paddingBottom:(Platform.OS=="android"?0:10)}}>
                        <Dropdown onValueChange={(text)=>{setSelectedValue(text)}} PickerData={Item}/>
                    </View>
                    {errors === "Please Select Value" &&
                    <Text style={{ color: "red",fontSize:12 }}>{errors === "Please Select Value" ? "Please Select Value" : null}</Text>
                    }


                            <Text style={{ marginHorizontal: 10, fontWeight: "bold", marginVertical: 10 }}>Verit Points</Text>
                            <FormInput
                                containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                                placeholder="Enter amount to buy vreits"
                                keyboardType={"numeric"}
                                value={amount}
                                onChangeText={(text) => { conversion(text)}}
                            />
                            <Text style={{color:"red",marginHorizontal:10}}>{errormsg}</Text>
                            <View style={{ flex: 1, marginVertical: 10, borderWidth: 1, borderColor: "black", borderRadius: 5, marginHorizontal: 10 }}>
                                <Text style={{ flex: 1, backgroundColor: Colors.secondary, color: "white", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5,borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>DaMeta1 Coins Conversion </Text>
                                <Text style={{ flex: 1, backgroundColor: "transparent", color: "black", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5 }}> {amount!=0?amount:0} /  ${currentdametarate} = {parseFloat(coinconvert).toFixed(2)} (VREITs)</Text>
                            </View>

                            {selectedValue === "bank" ?
                                <View style={{marginHorizontal:10}}>
                                    <View style={{ backgroundColor: "white", borderWidth: 1,borderRadius:5 }}>
                                        <Text style={{ flex: 1, backgroundColor: Colors.secondary, color: "white", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5,borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>Please note that from today all funds should be deposited in our new bank.</Text>
                                        <DoubleText text1={"Account Name"} text2={"V1 CIRCLE İNŞAAT PAZARLAMA İTHALAT"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6, borderRadius: 5 }} />
                                        <DoubleText text1={"Bank Name"} text2={"Ziraat Bank"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                        <DoubleText text1={"IBAN"} text2={"TR460001000729967776865002"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6, borderRadius: 5 }} />
                                        <DoubleText text1={"Swift Code"} text2={"TCZBTR2A"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                        <DoubleText text1={"Bank Address"} text2={"269, R2 Brandium, Atasehir, Istanbul, Turkey."} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6, borderRadius: 5 }} />
                                    </View>
                                    <Btn onPress={selectPhoto_gallery.bind(this)} image={require("../../../../Assets/picture.png")} img_style={{ height: 20, width: 20, marginHorizontal: 5 }} containerStyle={{ flexDirection: "row", flex: 1, backgroundColor: Colors.primary, marginTop: 10, padding: 10, borderRadius: 5, marginHorizontal: 20, justifyContent: "center", justifyItems: "center" }} text={"Choose File"} text_style={{ color: Colors.white, textAlign: "center" }} />
                                            {errors === "Please Add Image First" ?
                                                <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold", color: "red" }}>{!fileName ? "Please Add Image First" : null}</Text>
                                                : <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold" }}>{fileName ? fileName : null}</Text>
                                            }
                             <Notes />
                                </View>
                                :
                                selectedValue === "usdt" ?
                                    <View style={{marginHorizontal:10}}> 
                                         <Text style={{   padding: 8, backgroundColor: "#2c754a", color: Colors.white, textAlign: "center", borderRadius: 6,marginVertical:10 }}>TRC20</Text>
                                                <Image source={{ uri: "https://staging.vrda1.net/assets/images/usdt-qr-code.jpeg" }} style={{ width: 160, height: 155, alignSelf: "center" }} />
                                                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }} onPress={() => { copyToClipboard() }}>
                                                    <Text style={{fontWeight:"bold"}}>TMc8LNFKvP6spQqTkxsmiu5mqhAMKbEmSk</Text>
                                                    <View style={{ flexDirection: 'row',backgroundColor: "#2c754a",padding: 8,borderRadius:10,marginTop:5 }}>
                                                        <Entypo color={'white'} size={20} name={"copy"} />
                                                        <Text style={{ color: "white" }}> Tap to Copy!</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{ borderWidth: 1, borderColor: Colors.primary, borderRadius: 10, padding: 5, marginVertical: 5 }}>
                                                    <Text style={{ color: Colors.primary, fontWeight: "bold", fontSize: 15 }}>Importent Note</Text>
                                                    <Text style={{ color: Colors.primary, fontSize: 13 }}>Send only USDT to this deposit address.</Text>
                                                    <Text style={{ color: Colors.primary, fontSize: 11 }}>* Sending coins or tokens other than USDT to this address may result in the loss of your deposit.</Text>
                                                    <Text style={{ color: Colors.primary, fontSize: 11 }}>* Package will be update or upgrade after confirmation.</Text>
                                                </View>
                                                <Btn onPress={selectPhoto_gallery.bind(this)} image={require("../../../../Assets/picture.png")} img_style={{ height: 20, width: 20, marginHorizontal: 5 }} containerStyle={{ flexDirection: "row", flex: 1, backgroundColor: Colors.primary, marginTop: 10, padding: 10, borderRadius: 5, marginHorizontal: 20, justifyContent: "center", justifyItems: "center" }} text={"Choose File"} text_style={{ color: Colors.white, textAlign: "center" }} />
                                            {errors === "Please Add Image First" ?
                                                <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold", color: "red" }}>{!fileName ? "Please Add Image First" : null}</Text>
                                                : <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "bold" }}>{fileName ? fileName : null}</Text>
                                            }
                                                <Notes />
                                    </View> :
                                    <View>
                                    </View>
                            }

                            <View style={{ flex: 1, margin: 10, borderWidth: 1, borderColor: Colors.primary, borderRadius: 5, padding: 5 }}>
                                <Text style={{ marginHorizontal: 10, fontWeight: "bold", marginVertical: 10 }}>Description</Text>

                                <FormInput
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "white", margin: 2, borderRadius: 5, marginVertical: 10 }}
                                    placeholder="Enter Description"
                                    value={detail}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => { setDetail(text), setErrors('') }}
                                />
                                  <View style={{ flexDirection: "row" }}>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <CheckBox
                                        style={{ margin: 10 }}
                                        textStyle={{ fontWeight: "bold" }}
                                        size={20}
                                        selected={checked}
                                        onPress={() => setChecked(!checked)}
                                        text={"I accept"} />
                                    <Text onPress={() => { setSelectedValue(""); navigation.navigate("TermsAndCondition") }} style={{ right: 10, color: "#53a0b7", fontWeight: "bold", textDecorationLine: "underline", fontSize: 12, alignSelf: "center" }}>Terms & Conditions</Text>
                                </View>
                                <BuyVreitNotes title={"All vriet bought through this button are:"}
                                inst1={"Not part of a package."}
                                inst2={"Not illegible for a bonus."}
                                inst3={"Not encashable through withdrawals."}
                                />
                                <Btn disabled={checked == true ? false : true} onPress={()=>{Submit()}} containerStyle={{ flex: 1, backgroundColor: "black", borderRadius: 5, marginHorizontal: 6 }} text_style={{ color: "white", paddingVertical: 10, fontWeight: "bold" }} text={"Buy VREITs"} />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
                : <View></View>}
        </SafeAreaView>
    )
}
export default BuyVreit;
