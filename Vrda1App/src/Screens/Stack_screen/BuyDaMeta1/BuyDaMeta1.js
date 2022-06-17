import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { Btn } from "../../../utilis/Btn";
import Colors from "../../../Style_Sheet/Colors";
import DoubleText from "../../../utilis/DoubleText";
import { FormInput } from "../../../utilis/Text_input";
import CheckBox from "../../../utilis/Checkbox";
import { getBuyDaMeta1, sendProcessWithdraw, BuyDaMeta1Post } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../utilis/Loader";
import Dropdown from "../../../utilis/Picker/Picker";
import { processWithdrawValidation } from "../../../utilis/validation";

const BuyDaMeta1 = ({ navigation }) => {
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
    const [transactiontype,setTransactiontype]=useState("");
    const buttons = [{ name: 'Wallet Status', id: 0 }, { name: 'Buy DaMeta1', id: 1 },]
    const Item = [{ label: 'Bank', value: 'bank' }, { label: 'USDT', value: 'usdt' }, { label: 'BTC', value: 'btc' }]

    useEffect(async () => {
        await getData();
    }, []);

    const getData = async () => {
        setLoading(true)
        let response = await getBuyDaMeta1();
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
        let response = await BuyDaMeta1Post(body);
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
         
        const withdrawal = apiData.remain.withdrawal;
        const received = apiData.remain.received;
        const seeded = apiData.remain.seeded;
        const merge = apiData.remain.merge;

       console.log("WITHDRAWL = ",withdrawal,"recieved =",received,"seeded=",seeded,"merge",merge)


        if (parseFloat(withdrawal) > 0 && parseFloat(amount) > parseFloat(withdrawal)) {
            setTransactiontype("merge")
            console.log('merge');
        } else if (parseFloat(received) > 0 && parseFloat(amount) > parseFloat(received)) {
            setTransactiontype("merge")
            console.log('merge');
        } else if (parseFloat(amount) <= parseFloat(withdrawal)) {
            setTransactiontype("withdrawal")
            console.log('withdrawal');
        } else if (parseFloat(amount) <= parseFloat(received)) {
            setTransactiontype("received")
            console.log('received');
            
        } else if (parseFloat(amount) <= parseFloat(seeded)) {
            setTransactiontype("seeded")
            console.log('seeded');
        }
        else {
           
            console.log('none');
        }

        if (amount == '') {
           setErrormsg("Required*")
        } else {
            let body = { vreit_points: amount, details: detail, total_coins: coinconvert, transaction_type: transactiontype,withdrawal:apiData.remain.withdrawal,received:apiData.remain.received,seeded:apiData.remain.seeded,merge:apiData.remain.merge };
            console.log("body====",body)
            setLoading(true)
            let response = await BuyDaMeta1Post(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setLoading(false);
                    await setDetail("");
                    await setAmount("");
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
           }
           else if(text > apiData.available_vreits){
            setErrormsg("Note: You can not buy coins due to exceeded Available Points.")
           }
           else{
            setAmount(text);
            const a=text/currentvrietrate*currentdametarate;
            setErrormsg("")
            setCoinconvert(a)
           }
    }

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
                        <DoubleText text1={"Available Vreit Points"} text2={apiData.available_vreits ? parseFloat(apiData.available_vreits).toFixed(2) : "0"} textstyle={{ textAlign: "center" }} containerstyle={{ marginHorizontal: 15, padding: 6, backgroundColor: "rgba(152,148,148,0.63)" }} />
                        <DoubleText text1={"Current Vreit Rate"} text2={apiData.vreit_rate ? "$" + parseFloat(apiData.vreit_rate).toFixed(3) : "$0"} textstyle={{ textAlign: "center" }} containerstyle={{ marginHorizontal: 15, padding: 6 }} />
                        <DoubleText text1={"DaMeta1 Rate"} text2={apiData.coin_rate ? "$" + parseFloat(apiData.coin_rate).toFixed(2) : "$0"} textstyle={{ textAlign: "center" }} containerstyle={{ marginHorizontal: 15, padding: 6, backgroundColor: "rgba(152,148,148,0.63)" }} />
                    </View>
                    :
                    <View style={{ margin: 20 }}>
                        <View style={{ flex: 1, backgroundColor: "#d4d0d0", marginVertical: 10, borderRadius: 5 }}>
                            <Text style={{ backgroundColor: "black", color: "white", paddingLeft: 10, paddingVertical: 10, fontWeight: "bold", borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>Buy DaMeta1</Text>
                            <Text style={{ marginHorizontal: 10, fontWeight: "bold", marginVertical: 10 }}>Verit Points</Text>
                            <FormInput
                                containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                                placeholder="Enter vreits points to buy coins"
                                keyboardType={"numeric"}
                                onChangeText={(text) => { conversion(text)}}
                            />
                            <Text style={{color:"red",marginHorizontal:10}}>{errormsg}</Text>
                            <View style={{ flex: 1, marginVertical: 10, borderWidth: 1, borderColor: "black", borderRadius: 5, marginHorizontal: 10 }}>
                                <Text style={{ flex: 1, backgroundColor: Colors.secondary, color: "white", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5 }}>DaMeta1 Coins Conversion </Text>
                                <Text style={{ flex: 1, backgroundColor: "transparent", color: "black", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5 }}> {amount!=0?amount:0} / ${currentvrietrate} x ${currentdametarate} = {coinconvert} (Coins)</Text>
                            </View>
                            <View style={{ flex: 1, margin: 10, borderWidth: 1, borderColor: Colors.primary, borderRadius: 5, padding: 5 }}>
                                <Text style={{ marginHorizontal: 10, fontWeight: "bold", marginVertical: 10 }}>Description</Text>

                                <FormInput
                                    containerStyle={{ marginHorizontal: 10, backgroundColor: "white", margin: 2, borderRadius: 5, marginVertical: 10 }}
                                    placeholder="Enter Description"
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => { setDetail(text), setErrors('') }}
                                />
                                  <View style={{ flexDirection: "row" }}>
                                    <CheckBox
                                        style={{ margin: 10 }}
                                        textStyle={{ fontWeight: "bold" }}
                                        size={20}
                                        selected={checked1}
                                        onPress={() => setChecked1(!checked1)}
                                        />
                                    <Text  style={{ right: 10, flexWrap:"wrap",fontWeight: "bold", fontSize: 12, alignSelf: "center" }}>I agree to Buying Da Mata1 under my full responsibility and complete understanding.</Text>
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
                                <Btn disabled={checked == true && checked1==true ? false : true} onPress={()=>{Submit()}} containerStyle={{ flex: 1, backgroundColor: "black", borderRadius: 5, marginHorizontal: 6 }} text_style={{ color: "white", paddingVertical: 10, fontWeight: "bold" }} text={"Buy Coin"} />
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
                : <View></View>}
        </SafeAreaView>
    )
}
export default BuyDaMeta1;
